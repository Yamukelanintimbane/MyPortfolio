import ExperienceLevel from '../models/ExperienceLevel.js';
import Analytics from '../models/Analytics.js';
import Settings from '../models/Settings.js';
import { calculateExperienceYears } from '../utils/experienceUtils.js';

// Get all experience levels
export const getExperienceLevels = async (req, res) => {
  try {
    const levels = await ExperienceLevel.getActiveLevels();
    res.json(levels);
  } catch (error) {
    console.error('Error fetching experience levels:', error);
    res.status(500).json({ message: 'Error fetching experience levels' });
  }
};

// Get experience level by years
export const getLevelByYears = async (req, res) => {
  try {
    const { years } = req.params;
    const numericYears = parseInt(years, 10);
    
    if (isNaN(numericYears) || numericYears < 0) {
      return res.status(400).json({ message: 'Invalid years parameter' });
    }

    const level = await ExperienceLevel.getLevelByYears(numericYears);
    
    if (!level) {
      return res.status(404).json({ message: 'No experience level found for the given years' });
    }

    res.json(level);
  } catch (error) {
    console.error('Error fetching experience level:', error);
    res.status(500).json({ message: 'Error fetching experience level' });
  }
};

// Get current experience calculation
export const getCurrentExperience = async (req, res) => {
  try {
    // Get start date from settings or default to 5 years ago
    const config = await Settings.findOne();
    const startDate = config?.experienceStartDate || new Date('2019-01-01');
    
    const years = calculateExperienceYears(startDate);
    const level = await ExperienceLevel.getLevelByYears(years);
    
    // Track analytics
    await Analytics.create({
      page: 'experience',
      event: 'experience_view',
      data: {
        years: years,
        level: level?.level || 'Unknown',
        timestamp: new Date()
      }
    });

    res.json({
      years,
      level: level || null,
      startDate: startDate,
      nextLevel: level ? await getNextLevel(level, years) : null
    });
  } catch (error) {
    console.error('Error calculating experience:', error);
    res.status(500).json({ message: 'Error calculating experience' });
  }
};

// Update experience level configuration
export const updateExperienceLevels = async (req, res) => {
  try {
    const { levels } = req.body;
    
    if (!Array.isArray(levels)) {
      return res.status(400).json({ message: 'Levels must be an array' });
    }

    // Validate configuration
    ExperienceLevel.validateConfiguration(levels);

    // Update or create levels
    for (const levelData of levels) {
      await ExperienceLevel.findOneAndUpdate(
        { level: levelData.level },
        levelData,
        { upsert: true, new: true }
      );
    }

    // Track analytics
    await Analytics.create({
      page: 'admin',
      event: 'experience_config_update',
      data: {
        updatedLevels: levels.length,
        updatedBy: req.user?.username || 'system'
      }
    });

    res.json({ message: 'Experience levels updated successfully' });
  } catch (error) {
    console.error('Error updating experience levels:', error);
    res.status(500).json({ message: 'Error updating experience levels', error: error.message });
  }
};

// Get experience timeline
export const getExperienceTimeline = async (req, res) => {
  try {
    const config = await Settings.findOne();
    const startDate = config?.experienceStartDate || new Date('2019-01-01');
    
    const levels = await ExperienceLevel.getActiveLevels();
    const timeline = [];
    
    const currentDate = new Date();
    const startYear = startDate.getFullYear();
    const currentYear = currentDate.getFullYear();
    
    for (let year = startYear; year <= currentYear; year++) {
      const checkDate = new Date(year, 0, 1); // January 1st of the year
      const years = calculateExperienceYears(startDate, checkDate);
      const level = await ExperienceLevel.getLevelByYears(years);
      
      timeline.push({
        year,
        years,
        level: level || null,
        date: checkDate
      });
    }

    res.json(timeline);
  } catch (error) {
    console.error('Error generating timeline:', error);
    res.status(500).json({ message: 'Error generating timeline' });
  }
};

// Helper function to get next level
async function getNextLevel(currentLevel, currentYears) {
  const levels = await ExperienceLevel.getActiveLevels();
  const currentIndex = levels.findIndex(l => l._id.toString() === currentLevel._id.toString());
  
  if (currentIndex >= 0 && currentIndex < levels.length - 1) {
    const nextLevel = levels[currentIndex + 1];
    return {
      level: nextLevel.level,
      yearsNeeded: nextLevel.minYears,
      yearsRemaining: nextLevel.minYears - currentYears
    };
  }
  
  return null;
}