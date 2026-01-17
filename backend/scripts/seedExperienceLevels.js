import mongoose from 'mongoose';
import ExperienceLevel from '../models/ExperienceLevel.js';

// Default experience level configuration
const defaultLevels = [
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

async function seedExperienceLevels() {
  try {
    // Connect to database
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio');
    console.log('✅ Connected to MongoDB');

    // Clear existing levels
    await ExperienceLevel.deleteMany({});
    console.log('🗑️  Cleared existing experience levels');

    // Insert default levels
    const createdLevels = await ExperienceLevel.insertMany(defaultLevels);
    console.log(`✅ Created ${createdLevels.length} experience levels`);

    // Validate configuration
    const validation = ExperienceLevel.validateConfiguration(defaultLevels);
    if (!validation.isValid) {
      console.error('❌ Configuration validation failed:', validation.errors);
      process.exit(1);
    }

    console.log('✅ Experience levels seeded successfully');
    console.log('📋 Available levels:');
    createdLevels.forEach(level => {
      console.log(`  - ${level.level}: ${level.minYears} - ${level.maxYears} years`);
    });

    mongoose.connection.close();
  } catch (error) {
    console.error('❌ Error seeding experience levels:', error);
    mongoose.connection.close();
    process.exit(1);
  }
}

// Run the script
if (import.meta.url === `file://${process.argv[1]}`) {
  seedExperienceLevels();
}

export default seedExperienceLevels;