import express from 'express';
import multer from 'multer';
import path from 'path';
import * as settingsController from '../controllers/settingsController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../uploads/temp'));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

// Public routes
router.get('/home-image', settingsController.getHomeImage);

// Protected routes (require authentication)
router.use(authMiddleware);

// Settings management
router.get('/', settingsController.getSettings);
router.get('/:key', settingsController.getSetting);
router.put('/:key', settingsController.updateSetting);

// Image upload
router.post('/upload/home-image', upload.single('image'), settingsController.uploadHomeImage);

export default router;