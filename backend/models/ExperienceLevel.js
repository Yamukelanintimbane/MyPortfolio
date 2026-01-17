import mongoose from 'mongoose';

const experienceLevelSchema = new mongoose.Schema({
  level: {
    type: String,
    required: true,
    enum: ['Intern', 'Junior', 'Mid-Level', 'Senior', 'Lead', 'Principal', 'Architect']
  },
  minYears: {
    type: Number,
    required: true,
    min: 0
  },
  maxYears: {
    type: Number,
    required: true,
    min: 0
  },
  color: {
    type: String,
    required: true,
    default: '#667eea'
  },
  icon: {
    type: String,
    required: true,
    default: 'Briefcase'
  },
  description: {
    type: String,
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index for efficient querying
experienceLevelSchema.index({ minYears: 1, maxYears: 1 });

// Static method to get experience level by years
experienceLevelSchema.statics.getLevelByYears = function(years) {
  return this.findOne({
    minYears: { $lte: years },
    maxYears: { $gte: years },
    isActive: true
  }).sort({ minYears: -1 });
};

// Static method to get all active levels
experienceLevelSchema.statics.getActiveLevels = function() {
  return this.find({ isActive: true }).sort({ minYears: 1 });
};

// Static method to validate level configuration
experienceLevelSchema.statics.validateConfiguration = function(levels) {
  // Sort by minYears
  const sortedLevels = levels.sort((a, b) => a.minYears - b.minYears);
  
  // Check for overlapping ranges
  for (let i = 0; i < sortedLevels.length - 1; i++) {
    const current = sortedLevels[i];
    const next = sortedLevels[i + 1];
    
    if (current.maxYears >= next.minYears) {
      throw new Error(`Overlapping experience ranges: ${current.level} (${current.minYears}-${current.maxYears}) overlaps with ${next.level} (${next.minYears}-${next.maxYears})`);
    }
  }
  
  return true;
};

export default mongoose.model('ExperienceLevel', experienceLevelSchema);