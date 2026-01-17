import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import path from "path"

// Import routes
import projectRoutes from "./routes/projects.js"
import contactRoutes from "./routes/contact.js"
import analyticsRoutes from "./routes/analytics.js"
import authRoutes from "./routes/auth.js"
import hireRoutes from "./routes/hire.js"
import testimonialRoutes from "./routes/testimonials.js"
import adminRoutes from "./routes/admin.js"
import settingsRoutes from "./routes/settings.js"
import experienceRoutes from "./routes/experience.js"

// Import middleware
import errorHandler from "./middleware/errorHandler.js"
import rateLimit, { analyticsLimiter, authLimiter } from "./middleware/rateLimit.js"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'https://yamukelanintimbane.onrender.com',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}))
app.use(express.json())
app.use(rateLimit)

// Routes
app.use("/api/projects", projectRoutes)
app.use("/api/contact", contactRoutes)
app.use("/api/analytics", analyticsLimiter, analyticsRoutes)
app.use("/api/auth", authLimiter, authRoutes)
app.use("/api/hire", hireRoutes)
app.use("/api/testimonials", testimonialRoutes)
app.use("/api/admin", adminRoutes)
app.use("/api/settings", settingsRoutes)
app.use("/api/experience", experienceRoutes)

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "Portfolio API is running" })
})

// Error handling middleware
app.use(errorHandler)

// Database connection
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/portfolio")
  .then(() => {
    console.log("✅ Connected to MongoDB")
    console.log("📊 MongoDB URI:", process.env.MONGODB_URI || "mongodb://localhost:27017/portfolio")
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`)
      console.log(`🌐 API available at http://localhost:${PORT}/api`)
    })
  })
  .catch((error) => {
    console.error("❌ MongoDB connection error:", error)
    console.log("⚠️  Database connection failed - API will not work properly")
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT} but database is not connected`)
    })
  })

export default app
