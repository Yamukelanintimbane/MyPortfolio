import Testimonial from '../models/Testimonial.js'

// @desc    Get all testimonials
// @route   GET /api/testimonials
// @access  Public
export const getAllTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find({ approved: true })
    res.json({
      success: true,
      count: testimonials.length,
      data: testimonials
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    })
  }
}

// @desc    Get all testimonials (Admin)
// @route   GET /api/admin/testimonials
// @access  Private
export const getAllTestimonialsAdmin = async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 })
    res.json({
      success: true,
      count: testimonials.length,
      data: testimonials
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    })
  }
}

// @desc    Get single testimonial
// @route   GET /api/admin/testimonials/:id
// @access  Private
export const getTestimonialById = async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id)
    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: 'Testimonial not found'
      })
    }
    res.json({
      success: true,
      data: testimonial
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    })
  }
}

// @desc    Create testimonial
// @route   POST /api/admin/testimonials
// @access  Private
export const createTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.create(req.body)
    res.status(201).json({
      success: true,
      data: testimonial
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creating testimonial',
      error: error.message
    })
  }
}

// @desc    Update testimonial
// @route   PUT /api/admin/testimonials/:id
// @access  Private
export const updateTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: 'Testimonial not found'
      })
    }
    res.json({
      success: true,
      data: testimonial
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating testimonial',
      error: error.message
    })
  }
}

// @desc    Delete testimonial
// @route   DELETE /api/admin/testimonials/:id
// @access  Private
export const deleteTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndDelete(req.params.id)
    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: 'Testimonial not found'
      })
    }
    res.json({
      success: true,
      message: 'Testimonial deleted successfully'
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    })
  }
}

// @desc    Approve testimonial
// @route   PUT /api/admin/testimonials/:id/approve
// @access  Private
export const approveTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndUpdate(
      req.params.id,
      { approved: true },
      { new: true }
    )
    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: 'Testimonial not found'
      })
    }
    res.json({
      success: true,
      data: testimonial
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    })
  }
}

// @desc    Toggle testimonial feature
// @route   PUT /api/admin/testimonials/:id/feature
// @access  Private
export const toggleTestimonialFeature = async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id)
    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: 'Testimonial not found'
      })
    }
    
    testimonial.featured = !testimonial.featured
    await testimonial.save()
    
    res.json({
      success: true,
      data: testimonial
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    })
  }
}