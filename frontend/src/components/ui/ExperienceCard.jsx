import React from 'react';
import { motion } from 'framer-motion';
import { useExperience } from '../../hooks/UseExperience';

const ExperienceCard = ({ years, showProgress = true, showNextLevel = true }) => {
  const { getExperienceProgression, getLevelByYears, loading } = useExperience();
  
  // Get current progression data
  const progression = getExperienceProgression();
  const currentLevel = progression?.currentLevel || getLevelByYears(years);
  
  if (loading || !currentLevel) {
    return (
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 animate-pulse">
        <div className="h-4 bg-gray-600 rounded w-3/4 mb-2"></div>
        <div className="h-8 bg-gray-600 rounded w-1/4 mb-4"></div>
        <div className="h-3 bg-gray-600 rounded w-full"></div>
      </div>
    );
  }

  const getLevelIcon = (levelName) => {
    switch (levelName) {
      case 'Intern': return 'User';
      case 'Junior': return 'User';
      case 'Mid-Level': return 'Briefcase';
      case 'Senior': return 'Briefcase';
      case 'Lead': return 'Shield';
      case 'Principal': return 'Crown';
      case 'Architect': return 'Building';
      default: return 'Briefcase';
    }
  };

  const getLevelGradient = (color) => {
    return `linear-gradient(135deg, ${color} 0%, ${color}cc 100%)`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300"
      style={{
        background: getLevelGradient(currentLevel.color),
        boxShadow: `0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)`
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div 
            className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg"
            style={{ backgroundColor: currentLevel.color }}
          >
            {getLevelIcon(currentLevel.level)}
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">{currentLevel.level}</h3>
            <p className="text-sm text-white/80">{years.toFixed(1)} years of experience</p>
          </div>
        </div>
        <div className="text-right">
          <span 
            className="px-3 py-1 rounded-full text-sm font-medium text-white"
            style={{ backgroundColor: currentLevel.color + '80' }}
          >
            Professional
          </span>
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-200 text-sm mb-4 leading-relaxed">
        {currentLevel.description}
      </p>

      {/* Progress Bar */}
      {showProgress && progression && (
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-300">
            <span>Progress to Next Level</span>
            <span>{progression.progress}%</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progression.progress}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-2 rounded-full"
              style={{ backgroundColor: currentLevel.color }}
            />
          </div>
          {progression.nextLevel && (
            <p className="text-xs text-gray-400">
              Next: {progression.nextLevel.level} in ~{Math.ceil(progression.nextLevel.yearsRemaining)} years
            </p>
          )}
        </div>
      )}

      {/* Years Range */}
      <div className="mt-4 flex justify-between text-sm text-gray-300 border-t border-white/20 pt-3">
        <span>Range: {currentLevel.minYears} - {currentLevel.maxYears} years</span>
        <span className="text-accent-purple">Auto-calculated</span>
      </div>
    </motion.div>
  );
};

export default ExperienceCard;