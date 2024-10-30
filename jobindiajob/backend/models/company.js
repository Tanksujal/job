const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
    trim: true,
  },
  companyEmail: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  companyPhone: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  industryType: {
    type: String,
    required: true,
    enum: ['IT', 'Finance', 'Healthcare', 'Education', 'Manufacturing', 'Other'],
  },
  companyWebsite: {
    type: String,
    trim: true,
  },
  address: {
    street: { type: String,  },
    city: { type: String, },
    state: { type: String, },
    postalCode: { type: String,  },
    country: { type: String,  },
  },
  registrationNumber: {
    type: String,
    unique: true,
    trim: true,
    required: true,
  },
  establishedYear: {
    type: Number,
  },
  numberOfEmployees: {
    type: String,
    enum: ["1-10", "11-50", "51-200", "201-500", "500"],
  },
  companyDescription: {
    type: String,
    trim: true,
  },
  contactPerson: {
    name: { type: String,  },
    designation: { type: String, },
    email: { type: String,  lowercase: true, trim: true },
    phone: { type: String, },
  },
  logo: {
    type: String, // Path to the logo file
  },
  documents: [
    {
      docType: { type: String,  },
      docUrl: { type: String, },
    }
  ],
  gstNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Company', companySchema);