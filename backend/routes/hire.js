import express from "express"
import { submitHireRequest } from "../controllers/hireMeController.js"

const router = express.Router()

// Public routes
router.post("/", submitHireRequest)

export default router