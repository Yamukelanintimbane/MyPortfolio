import Project from '../models/Project.js'
import Analytics from '../models/Analytics.js'

// @desc    Get dashboard stats
// @route   GET /api/admin/dashboard
// @access  Private
export const getDashboardStats = async (req, res) => {
  try {
    const totalProjects = await Project.countDocuments()
    const totalViews = await Project.aggregate([
      { $group: { _id: null, total: { $sum: '$views' } } }
    ])
    
    res.json({
      success: true,
      data: {
        totalProjects,
        totalViews: totalViews[0]?.total || 0,
        recentProjects: await Project.find().sort({ createdAt: -1 }).limit(5)
      }
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    })
  }
}

// @desc    Get project analytics
// @route   GET /api/admin/analytics/projects
// @access  Private
export const getProjectAnalytics = async (req, res) => {
  try {
    const projects = await Project.find().sort({ views: -1 })
    res.json({
      success: true,
      data: projects
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    })
  }
}

// @desc    Get traffic analytics
// @route   GET /api/admin/analytics/traffic
// @access  Private
export const getTrafficAnalytics = async (req, res) => {
  try {
    const analytics = await Analytics.find({ event: 'page_view' })
      .sort({ createdAt: -1 })
      .limit(100)
    
    res.json({
      success: true,
      data: analytics
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    })
  }
}

// @desc    Get geo analytics
// @route   GET /api/admin/analytics/geo
// @access  Private
export const getGeoAnalytics = async (req, res) => {
  try {
    const geoData = await Analytics.aggregate([
      { $group: { _id: '$data.location', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ])
    
    res.json({
      success: true,
      data: geoData
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    })
  }
}

// @desc    Get timeline analytics
// @route   GET /api/admin/analytics/timeline
// @access  Private
export const getTimelineAnalytics = async (req, res) => {
  try {
    const timeline = await Analytics.aggregate([
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' },
            day: { $dayOfMonth: '$createdAt' }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1, '_id.day': 1 } }
    ])
    
    res.json({
      success: true,
      data: timeline
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    })
  }
}