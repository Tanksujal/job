// models/Profile.js
const mongoose = require('mongoose');

const ExperienceSchema = new mongoose.Schema({
  company: String,
  position: String,
  startDate: Date,
  endDate: Date,
  description: String
});

const EducationSchema = new mongoose.Schema({
  education:String,
  institution: String,
  course:String,
  degree: String,
  fieldOfStudy: String,
  startDate: Date,
  endDate: Date
});

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  resumeHeadline: {
    type: String,
    trim: true,
    maxlength: 300 // Adjust as needed
  },
  resume: {
    type: String, // URL or path to the resume file
    default: ''
  },
  bio: String,
  skills: [String],
  experience: [ExperienceSchema],
  education: [EducationSchema],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Profile', ProfileSchema);
