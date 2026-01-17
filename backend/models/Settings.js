import mongoose from 'mongoose';

const settingsSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
    unique: true
  },
  value: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['string', 'number', 'boolean', 'object'],
    default: 'string'
  },
  description: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

// Static method to get setting by key
settingsSchema.statics.getSetting = async function(key) {
  const setting = await this.findOne({ key });
  return setting ? setting.value : null;
};

// Static method to set setting
settingsSchema.statics.setSetting = async function(key, value, type = 'string', description = '') {
  const setting = await this.findOneAndUpdate(
    { key },
    { value, type, description },
    { upsert: true, new: true }
  );
  return setting;
};

export default mongoose.model('Settings', settingsSchema);