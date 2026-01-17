import express from "express"
import { 
  getDashboardStats, 
  getProjectAnalytics, 
  getTrafficAnalytics, 
  getGeoAnalytics, 
  getTimelineAnalytics 
} from "../controllers/adminController.js"
import { 
  getAllProjects, 
  getProjectById, 
  createProject, 
  updateProject, 
  deleteProject,
  uploadProjectImage
} from "../controllers/projectController.js"
import { 
  getAllHireRequests, 
  getHireRequestById, 
  updateHireRequest, 
  deleteHireRequest,
  respondToHireRequest
} from "../controllers/hireMeController.js"
import {
  getContactById,
  updateContact,
  deleteContact,
  replyToContact,
  getAllContactsAdmin
} from "../controllers/contactController.js"
import {
  getAllTestimonials,
  getTestimonialById,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
  approveTestimonial,
  toggleTestimonialFeature,
  getAllTestimonialsAdmin
} from "../controllers/testimonialController.js"
import { 
  getExperienceLevels, 
  getLevelByYears, 
  getCurrentExperience, 
  getExperienceTimeline,
  updateExperienceLevels
} from "../controllers/experienceController.js"
import { getSettings, updateSettings, uploadLogo, getSettingsAdmin } from "../controllers/settingsController.js"
import authMiddleware from "../middleware/authMiddleware.js"
import upload from "../middleware/multer.js"

const router = express.Router()

// Protected routes
router.use(authMiddleware)

// Dashboard
router.get("/dashboard", getDashboardStats)

// Analytics
router.get("/analytics/projects", getProjectAnalytics)
router.get("/analytics/traffic", getTrafficAnalytics)
router.get("/analytics/geo", getGeoAnalytics)
router.get("/analytics/timeline", getTimelineAnalytics)

// Projects (Admin)
router.get("/projects", getAllProjects)
router.get("/projects/:id", getProjectById)
router.post("/projects", createProject)
router.put("/projects/:id", updateProject)
router.delete("/projects/:id", deleteProject)
router.post("/projects/:id/upload", upload.single('image'), uploadProjectImage)

// Hire Requests (Admin)
router.get("/hire-requests", getAllHireRequests)
router.get("/hire-requests/:id", getHireRequestById)
router.put("/hire-requests/:id", updateHireRequest)
router.delete("/hire-requests/:id", deleteHireRequest)
router.post("/hire-requests/:id/respond", respondToHireRequest)

// Contacts (Admin)
router.get("/contacts", getAllContactsAdmin)
router.get("/contacts/:id", getContactById)
router.put("/contacts/:id", updateContact)
router.delete("/contacts/:id", deleteContact)
router.post("/contacts/:id/reply", replyToContact)

// Testimonials (Admin)
router.get("/testimonials", getAllTestimonialsAdmin)
router.get("/testimonials/:id", getTestimonialById)
router.post("/testimonials", createTestimonial)
router.put("/testimonials/:id", updateTestimonial)
router.delete("/testimonials/:id", deleteTestimonial)
router.put("/testimonials/:id/approve", approveTestimonial)
router.put("/testimonials/:id/feature", toggleTestimonialFeature)

// Experience (Admin)
router.get("/experience/levels", getExperienceLevels)
router.get("/experience/levels/:years", getLevelByYears)
router.get("/experience/current", getCurrentExperience)
router.get("/experience/timeline", getExperienceTimeline)
router.put("/experience/levels", updateExperienceLevels)

// Settings (Admin)
router.get("/settings", getSettingsAdmin)
router.put("/settings", updateSettings)
router.post("/settings/upload-logo", upload.single('logo'), uploadLogo)

export default router