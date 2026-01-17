/**
 * Utility functions for experience calculation
 */

/**
 * Calculate years of experience based on start date
 * @param {Date|string} startDate - The start date of professional experience
 * @param {Date} [endDate] - Optional end date (defaults to current date)
 * @returns {number} - Years of experience rounded to 1 decimal place
 */
function calculateExperienceYears(startDate, endDate = new Date()) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  // Ensure start date is not in the future
  if (start > end) {
    return 0;
  }
  
  // Calculate difference in milliseconds
  const diffTime = Math.abs(end - start);
  
  // Convert to years (accounting for leap years)
  const diffYears = diffTime / (1000 * 60 * 60 * 24 * 365.25);
  
  // Round to 1 decimal place
  return Math.round(diffYears * 10) / 10;
}

/**
 * Get experience level configuration with default values
 * @returns {Array} - Default experience level configuration
 */
function getDefaultExperienceLevels() {
  return [
    {
      level: 'Intern',
      minYears: 0,
      maxYears: 0.5,
      color: '#94a3b8',
      icon: 'User',
      description: 'Entry-level position with basic understanding of industry practices'
    },
    {
      level: 'Junior',
      minYears: 0.6,
      maxYears: 2,
      color: '#3b82f6',
      icon: 'User',
      description: 'Developing technical skills with guidance from senior team members'
    },
    {
      level: 'Mid-Level',
      minYears: 2.1,
      maxYears: 5,
      color: '#22c55e',
      icon: 'Briefcase',
      description: 'Independent contributor with solid technical expertise and problem-solving skills'
    },
    {
      level: 'Senior',
      minYears: 5.1,
      maxYears: 10,
      color: '#f59e0b',
      icon: 'Briefcase',
      description: 'Experienced professional who mentors others and drives technical decisions'
    },
    {
      level: 'Lead',
      minYears: 10.1,
      maxYears: 15,
      color: '#ef4444',
      icon: 'Shield',
      description: 'Technical leader who shapes architecture and guides team direction'
    },
    {
      level: 'Principal',
      minYears: 15.1,
      maxYears: 25,
      color: '#a855f7',
      icon: 'Crown',
      description: 'Industry expert who influences technology strategy and innovation'
    },
    {
      level: 'Architect',
      minYears: 25.1,
      maxYears: 999,
      color: '#06b6d4',
      icon: 'Building',
      description: 'Visionary leader who designs complex systems and drives organizational change'
    }
  ];
}

/**
 * Validate experience level configuration
 * @param {Array} levels - Array of experience level configurations
 * @returns {Object} - Validation result with isValid boolean and errors array
 */
function validateExperienceConfiguration(levels) {
  const errors = [];
  
  if (!Array.isArray(levels) || levels.length === 0) {
    errors.push('Experience levels must be a non-empty array');
    return { isValid: false, errors };
  }
  
  // Check for required fields
  levels.forEach((level, index) => {
    const requiredFields = ['level', 'minYears', 'maxYears', 'color', 'icon', 'description'];
    requiredFields.forEach(field => {
      if (!level[field]) {
        errors.push(`Level ${index + 1} is missing required field: ${field}`);
      }
    });
    
    // Validate numeric ranges
    if (typeof level.minYears !== 'number' || typeof level.maxYears !== 'number') {
      errors.push(`Level ${index + 1} has invalid numeric values for minYears or maxYears`);
    } else if (level.minYears < 0 || level.maxYears < 0) {
      errors.push(`Level ${index + 1} has negative values for minYears or maxYears`);
    } else if (level.minYears > level.maxYears) {
      errors.push(`Level ${index + 1} has minYears greater than maxYears`);
    }
  });
  
  // Check for overlapping ranges
  const sortedLevels = [...levels].sort((a, b) => a.minYears - b.minYears);
  for (let i = 0; i < sortedLevels.length - 1; i++) {
    const current = sortedLevels[i];
    const next = sortedLevels[i + 1];
    
    if (current.maxYears >= next.minYears) {
      errors.push(`Overlapping ranges: ${current.level} (${current.minYears}-${current.maxYears}) overlaps with ${next.level} (${next.minYears}-${next.maxYears})`);
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Get experience level progression data
 * @param {number} currentYears - Current years of experience
 * @param {Array} levels - Array of experience level configurations
 * @returns {Object} - Progression data including current level, next level, and progress
 */
function getExperienceProgression(currentYears, levels) {
  const sortedLevels = levels.sort((a, b) => a.minYears - b.minYears);
  let currentLevel = null;
  let nextLevel = null;
  let progress = 0;
  
  // Find current level
  for (let i = sortedLevels.length - 1; i >= 0; i--) {
    if (currentYears >= sortedLevels[i].minYears) {
      currentLevel = sortedLevels[i];
      break;
    }
  }
  
  // Find next level and calculate progress
  if (currentLevel) {
    const currentIndex = sortedLevels.findIndex(l => l.level === currentLevel.level);
    if (currentIndex < sortedLevels.length - 1) {
      nextLevel = sortedLevels[currentIndex + 1];
      
      // Calculate progress within current level
      const levelRange = nextLevel.minYears - currentLevel.minYears;
      const currentRange = currentYears - currentLevel.minYears;
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
    years: currentYears
  };
}

export {
  calculateExperienceYears,
  getDefaultExperienceLevels,
  validateExperienceConfiguration,
  getExperienceProgression
};