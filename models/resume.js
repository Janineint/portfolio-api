const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
  // You might add a name or identifier if you plan to store multiple versions
  // name: { type: String, required: true, unique: true },
  data: { type: Buffer, required: true }, // Stores the PDF file content
  contentType: { type: String, required: true, default: 'application/pdf' }, // MIME type
  uploadedAt: { type: Date, default: Date.now }
});

// Ensure only one resume document exists if that's your requirement
// resumeSchema.index({ name: 1 }, { unique: true }); // Example if using a name field

module.exports = mongoose.model('Resume', resumeSchema);