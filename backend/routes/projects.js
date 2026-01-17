import express from "express"
import { 
  getAllProjects, 
  getProjectById, 
  trackProjectView, 
  getProjectImage 
} from "../controllers/projectController.js"

const router = express.Router()

// Public routes
router.get("/", getAllProjects)
router.get("/:id", getProjectById)
router.post("/:id/view", trackProjectView)
router.get("/:id/image", getProjectImage)

export default router