import express from "express"
import { trackAnalytics, trackEvents, trackPerformance } from "../controllers/analyticsController.js"

const router = express.Router()

// Public routes
router.post("/track", trackAnalytics)
router.post("/events", trackEvents)
router.post("/performance", trackPerformance)

export default router