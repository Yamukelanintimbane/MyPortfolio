import { useState, useEffect } from 'react';
import { experienceAPI } from '../utils/api';

export const useExperience = () => {
  const [experienceData, setExperienceData] = useState(null);
  const [levels, setLevels] = useState([]);
  const [timeline, setTimeline] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch current experience data
  const fetchExperienceData = async () => {
    try {
      setLoading(true);
      const [currentData, levelData, timelineData] = await Promise.all([
        experienceAPI.getCurrent(),
        experienceAPI.getLevels(),
        experienceAPI.getTimeline()
      ]);

      setExperienceData(currentData.data);
      setLevels(levelData.data);
      setTimeline(timelineData.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching experience data:', err);
      setError(err.message || 'Failed to fetch experience data');
    } finally {
      setLoading(false);
    }
  };

  // Calculate experience progression
  const getExperienceProgression = () => {
    if (!experienceData || !levels.length) return null;

    const sortedLevels = [...levels].sort((a, b) => a.minYears - b.minYears);
    let currentLevel = null;
    let nextLevel = null;
    let progress = 0;

    // Find current level
    for (let i = sortedLevels.length - 1; i >= 0; i--) {
      if (experienceData.years >= sortedLevels[i].minYears) {
        currentLevel = sortedLevels[i];
        break;
      }
    }

    // Find next level and calculate progress
    if (currentLevel) {
      const currentIndex = sortedLevels.findIndex(l => l._id === currentLevel._id);
      if (currentIndex < sortedLevels.length - 1) {
        nextLevel = sortedLevels[currentIndex + 1];
        
        // Calculate progress within current level
        const levelRange = nextLevel.minYears - currentLevel.minYears;
        const currentRange = experienceData.years - currentLevel.minYears;
        progress = Math.min(100, Math.round((currentRange / levelRange) * 100));
      } else {
        // At the highest level
        progress = 100;
      }
    }

    return {
      currentLevel,
      nextLevel,
      progress,
      years: experienceData.years
    };
  };

  // Get experience level by years
  const getLevelByYears = (years) => {
    if (!levels.length) return null;
    
    const sortedLevels = [...levels].sort((a, b) => a.minYears - b.minYears);
    for (let i = sortedLevels.length - 1; i >= 0; i--) {
      if (years >= sortedLevels[i].minYears) {
        return sortedLevels[i];
      }
    }
    return null;
  };

  // Update experience configuration (admin only)
  const updateExperienceLevels = async (newLevels) => {
    try {
      const response = await experienceAPI.updateLevels(newLevels);
      await fetchExperienceData(); // Refresh data
      return response.data;
    } catch (err) {
      console.error('Error updating experience levels:', err);
      throw err;
    }
  };

  useEffect(() => {
    fetchExperienceData();
    
    // Refresh data every 5 minutes
    const interval = setInterval(fetchExperienceData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return {
    experienceData,
    levels,
    timeline,
    loading,
    error,
    fetchExperienceData,
    getExperienceProgression,
    getLevelByYears,
    updateExperienceLevels
  };
};