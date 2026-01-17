import mongoose from 'mongoose'

const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  technologies: {
    type: [String],
    required: true
  },
  githubUrl: {
    type: String
  },
  liveUrl: {
    type: String
  },
  views: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
})

export default mongoose.model('Project', ProjectSchema)
