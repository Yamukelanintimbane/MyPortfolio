import Analytics from '../models/Analytics.js'

// @desc    Track analytics
// @route   POST /api/analytics/track
// @access  Public
export const trackAnalytics = async (req, res) => {
  try {
    const { page, event, data } = req.body
    const analytics = await Analytics.create({ page, event, data })
    res.status(201).json({
      success: true,
      data: analytics
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error tracking analytics',
      error: error.message
    })
  }
}

// @desc    Track events
// @route   POST /api/analytics/events
// @access  Public
export const trackEvents = async (req, res) => {
  try {
    const { eventName, data, timestamp, userAgent, url } = req.body
    const analytics = await Analytics.create({
      page: url,
      event: eventName,
      data: {
        ...data,
        timestamp,
        userAgent,
        url
      }
    })
    res.status(201).json({
      success: true,
      data: analytics
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error tracking event',
      error: error.message
    })
  }
}

// @desc    Track performance metrics
// @route   POST /api/analytics/performance
// @access  Public
export const trackPerformance = async (req, res) => {
  try {
    const { data, timestamp, userAgent, url } = req.body
    const analytics = await Analytics.create({
      page: url,
      event: 'performance',
      data: {
        ...data,
        timestamp,
        userAgent,
        url
      }
    })
    res.status(201).json({
      success: true,
      data: analytics
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error tracking performance',
      error: error.message
    })
  }
}
