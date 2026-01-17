import mongoose from 'mongoose'

const AnalyticsSchema = new mongoose.Schema({
  page: {
    type: String,
    required: true
  },
  event: {
    type: String,
    required: true
  },
  data: {
    type: Object,
    default: {}
  }
}, {
  timestamps: true
})

export default mongoose.model('Analytics', AnalyticsSchema)
