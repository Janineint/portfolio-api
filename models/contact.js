const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    // Basic email validation regex (consider a more robust library for production)
    match: [/.+@.+\..+/, 'Please fill a valid email address']
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
    trim: true
  },
  receivedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Contact', contactSchema);