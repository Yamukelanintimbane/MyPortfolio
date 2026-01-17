import express from 'express';
import * as experienceController from '../controllers/experienceController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.get('/levels', experienceController.getExperienceLevels);
router.get('/levels/:years', experienceController.getLevelByYears);
router.get('/current', experienceController.getCurrentExperience);
router.get('/timeline', experienceController.getExperienceTimeline);

// Protected routes (admin only)
router.put('/levels', authMiddleware, experienceController.updateExperienceLevels);

export default router;