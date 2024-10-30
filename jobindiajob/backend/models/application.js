const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true
  },
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'JobPost', // Reference to the JobPost model
    required: true
  },
  resume: {
    type: String, // URL or path to the uploaded resume file
    required: true
  },
  coverLetter: {
    type: String, // Text of the cover letter or path to a file
    required: false
  },
  applicationDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['Pending', 'Reviewed', 'Interview', 'Accepted', 'Rejected'],
    default: 'Pending'
  },
  feedback: {
    type: String, // Feedback from the employer
    required: false
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});
applicationSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});
module.exports = mongoose.model('Application', applicationSchema);