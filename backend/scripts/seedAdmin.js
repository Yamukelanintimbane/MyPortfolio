import mongoose from 'mongoose'
import User from '../models/User.js'
import dotenv from 'dotenv'

dotenv.config()

const seedAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio')
    console.log('Connected to MongoDB')

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: 'admin@portfolio.com' })
    
    if (existingAdmin) {
      console.log('Admin user already exists')
      return
    }

    // Create admin user
    const adminUser = new User({
      name: 'Admin User',
      email: 'admin@portfolio.com',
      password: 'admin123' // This will be hashed by the pre-save hook
    })

    await adminUser.save()
    console.log('Admin user created successfully')
    console.log('Email: admin@portfolio.com')
    console.log('Password: admin123')
    
  } catch (error) {
    console.error('Error seeding admin user:', error)
  } finally {
    // Close the connection
    await mongoose.connection.close()
    console.log('Database connection closed')
  }
}

seedAdmin()