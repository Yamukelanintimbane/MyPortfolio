import Contact from '../models/Contact.js'

// @desc    Submit contact form
// @route   POST /api/contact
// @access  Public
export const submitContact = async (req, res) => {
  try {
    const { name, email, message } = req.body
    const contact = await Contact.create({ name, email, message })
    res.status(201).json({
      success: true,
      data: contact
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error submitting contact form',
      error: error.message
    })
  }
}

// @desc    Get all contacts (Admin)
// @route   GET /api/admin/contacts
// @access  Private
export const getAllContactsAdmin = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 })
    res.json({
      success: true,
      count: contacts.length,
      data: contacts
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    })
  }
}

// @desc    Get single contact
// @route   GET /api/admin/contacts/:id
// @access  Private
export const getContactById = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id)
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      })
    }
    res.json({
      success: true,
      data: contact
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    })
  }
}

// @desc    Update contact
// @route   PUT /api/admin/contacts/:id
// @access  Private
export const updateContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      })
    }
    res.json({
      success: true,
      data: contact
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating contact',
      error: error.message
    })
  }
}

// @desc    Delete contact
// @route   DELETE /api/admin/contacts/:id
// @access  Private
export const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id)
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      })
    }
    res.json({
      success: true,
      message: 'Contact deleted successfully'
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    })
  }
}

// @desc    Reply to contact
// @route   POST /api/admin/contacts/:id/reply
// @access  Private
export const replyToContact = async (req, res) => {
  try {
    const { replyMessage } = req.body
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status: 'replied', reply: replyMessage },
      { new: true }
    )
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      })
    }
    res.json({
      success: true,
      data: contact
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error replying to contact',
      error: error.message
    })
  }
}
