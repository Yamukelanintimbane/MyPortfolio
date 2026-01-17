import HireRequest from '../models/HireRequest.js'

// @desc    Submit hire request
// @route   POST /api/hire
// @access  Public
export const submitHireRequest = async (req, res) => {
  try {
    const { name, email, message, budget, timeline } = req.body
    
    // Always use the real database - remove fallback
    const hireRequest = await HireRequest.create({ name, email, message, budget, timeline })
    res.status(201).json({
      success: true,
      data: hireRequest
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error submitting hire request',
      error: error.message
    })
  }
}

// @desc    Get all hire requests
// @route   GET /api/admin/hire-requests
// @access  Private/Admin
export const getAllHireRequests = async (req, res) => {
  try {
    const hireRequests = await HireRequest.find().sort({ createdAt: -1 })
    res.json({
      success: true,
      data: hireRequests
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching hire requests',
      error: error.message
    })
  }
}

// @desc    Get single hire request
// @route   GET /api/admin/hire-requests/:id
// @access  Private/Admin
export const getHireRequestById = async (req, res) => {
  try {
    const hireRequest = await HireRequest.findById(req.params.id)
    if (!hireRequest) {
      return res.status(404).json({
        success: false,
        message: 'Hire request not found'
      })
    }
    res.json({
      success: true,
      data: hireRequest
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching hire request',
      error: error.message
    })
  }
}

// @desc    Update hire request
// @route   PUT /api/admin/hire-requests/:id
// @access  Private/Admin
export const updateHireRequest = async (req, res) => {
  try {
    const hireRequest = await HireRequest.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
    if (!hireRequest) {
      return res.status(404).json({
        success: false,
        message: 'Hire request not found'
      })
    }
    res.json({
      success: true,
      data: hireRequest
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating hire request',
      error: error.message
    })
  }
}

// @desc    Delete hire request
// @route   DELETE /api/admin/hire-requests/:id
// @access  Private/Admin
export const deleteHireRequest = async (req, res) => {
  try {
    const hireRequest = await HireRequest.findByIdAndDelete(req.params.id)
    if (!hireRequest) {
      return res.status(404).json({
        success: false,
        message: 'Hire request not found'
      })
    }
    res.json({
      success: true,
      message: 'Hire request deleted successfully'
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting hire request',
      error: error.message
    })
  }
}

// @desc    Respond to hire request
// @route   POST /api/admin/hire-requests/:id/respond
// @access  Private/Admin
export const respondToHireRequest = async (req, res) => {
  try {
    const { responseMessage } = req.body
    const hireRequest = await HireRequest.findByIdAndUpdate(
      req.params.id,
      { status: 'responded', response: responseMessage },
      { new: true }
    )
    if (!hireRequest) {
      return res.status(404).json({
        success: false,
        message: 'Hire request not found'
      })
    }
    res.json({
      success: true,
      data: hireRequest
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error responding to hire request',
      error: error.message
    })
  }
}
