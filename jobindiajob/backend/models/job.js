const mongoose = require('mongoose');

const jobPostSchema = new mongoose.Schema({
  position: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  numberOfVacancies: {
    type: Number,
    required: true,
    default: 1
  },
  salaryFrom: {
    type: Number,
    required: false
  },
  salaryTo: {
    type: Number,
    required: false
  },
  employmentType: {
    type: String,
    enum: ['Full-time', 'Part-time', 'Contract', 'Internship', 'Freelance'],
    required: true
  },
  postedDate: {
    type: Date,
    default: Date.now
  },
  lastDate: {
    type: Date,
    required: true,
    validate: {
      validator: function (value) {
        // Ensure lastDate is after postedDate
        return value > this.postedDate;
      },
      message: 'Last date must be after the posted date',
    },
  },
  closedDate: {
    type: Date,
    required: true,
    validate: {
      validator: function (value) {
        // Ensure closedDate is after postedDate and lastDate
        return value > this.postedDate && value > this.lastDate;
      },
      message: 'Closed date must be after both posted date and last date',
    },
  },
  applicationDeadline: {
    type: Date,
    required: false
  },
  experienceLevel: {
    type: Number,
    required: true
  },
  status : {
    type: String,
    enum: ['Active','InActive'],
    required: true,
    default:'Active'
  },
  skillsRequired: [{
    type: String
  }],
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports  = mongoose.model('JobPost', jobPostSchema);
