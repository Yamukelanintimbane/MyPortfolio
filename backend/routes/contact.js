import express from "express"
import { submitContact } from "../controllers/contactController.js"

const router = express.Router()

// Public routes
router.post("/", submitContact)

export default router