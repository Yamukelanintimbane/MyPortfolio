import Settings from '../models/Settings.js';
import path from 'path';
import fs from 'fs';

// Get all settings
const getSettings = async (req, res) => {
  try {
    const settings = await Settings.find({});
    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get setting by key
const getSetting = async (req, res) => {
  try {
    const { key } = req.params;
    const setting = await Settings.findOne({ key });

    if (!setting) {
      return res.status(404).json({ message: 'Setting not found' });
    }

    res.json(setting);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update setting
const updateSetting = async (req, res) => {
  try {
    const { key } = req.params;
    const { value, type, description } = req.body;

    const setting = await Settings.findOneAndUpdate(
      { key },
      { value, type, description },
      { upsert: true, new: true }
    );

    res.json(setting);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Upload home image
const uploadHomeImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
    if (!allowedTypes.includes(req.file.mimetype)) {
      return res.status(400).json({ message: 'Invalid file type. Only JPEG, PNG, and GIF are allowed.' });
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (req.file.size > maxSize) {
      return res.status(400).json({ message: 'File too large. Maximum size is 5MB.' });
    }

    // Generate unique filename
    const timestamp = Date.now();
    const extension = path.extname(req.file.originalname);
    const filename = `home-image-${timestamp}${extension}`;

    // Move file to public/images/profile directory
    const uploadPath = path.join(__dirname, '../../frontend/public/images/profile', filename);
    const directory = path.dirname(uploadPath);

    // Ensure directory exists
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory, { recursive: true });
    }

    // Move the uploaded file
    fs.renameSync(req.file.path, uploadPath);

    // Update setting in database
    const imagePath = `/images/profile/${filename}`;
    await Settings.setSetting('homeImage', imagePath, 'string', 'Home page profile image');

    res.json({
      message: 'Image uploaded successfully',
      imagePath: imagePath
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get home image
const getHomeImage = async (req, res) => {
  try {
    const imagePath = await Settings.getSetting('homeImage');
    const defaultImage = '/images/profile/Yamdev.jpg';

    res.json({
      imagePath: imagePath || defaultImage
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all settings (Admin)
// @route   GET /api/admin/settings
// @access  Private
const getSettingsAdmin = async (req, res) => {
  try {
    const settings = await Settings.find({});
    res.json({
      success: true,
      data: settings
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update settings (Admin)
// @route   PUT /api/admin/settings
// @access  Private
const updateSettings = async (req, res) => {
  try {
    const updates = req.body;
    const results = [];
    
    for (const [key, value] of Object.entries(updates)) {
      const setting = await Settings.findOneAndUpdate(
        { key },
        { value, updatedAt: new Date() },
        { upsert: true, new: true }
      );
      results.push(setting);
    }
    
    res.json({
      success: true,
      data: results
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Upload logo (Admin)
// @route   POST /api/admin/settings/upload-logo
// @access  Private
const uploadLogo = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
      });
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
    if (!allowedTypes.includes(req.file.mimetype)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid file type. Only JPEG, PNG, and GIF are allowed.'
      });
    }

    // Validate file size (max 2MB)
    const maxSize = 2 * 1024 * 1024; // 2MB
    if (req.file.size > maxSize) {
      return res.status(400).json({
        success: false,
        message: 'File too large. Maximum size is 2MB.'
      });
    }

    // Generate unique filename
    const timestamp = Date.now();
    const extension = path.extname(req.file.originalname);
    const filename = `logo-${timestamp}${extension}`;

    // Move file to public/images directory
    const uploadPath = path.join(__dirname, '../../frontend/public/images', filename);
    const directory = path.dirname(uploadPath);

    // Ensure directory exists
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory, { recursive: true });
    }

    // Move the uploaded file
    fs.renameSync(req.file.path, uploadPath);

    // Update setting in database
    const logoPath = `/images/${filename}`;
    await Settings.findOneAndUpdate(
      { key: 'logo' },
      { value: logoPath, type: 'string', description: 'Site logo' },
      { upsert: true, new: true }
    );

    res.json({
      success: true,
      message: 'Logo uploaded successfully',
      data: { logoPath: logoPath }
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export {
  getSettings,
  getSetting,
  updateSetting,
  uploadHomeImage,
  getHomeImage,
  getSettingsAdmin,
  updateSettings,
  uploadLogo
};