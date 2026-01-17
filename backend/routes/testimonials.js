import express from "express"
import { getAllTestimonials } from "../controllers/testimonialController.js"

const router = express.Router()

// Public routes
router.get("/", getAllTestimonials)

export default router