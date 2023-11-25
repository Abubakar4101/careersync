const mongoose = require('mongoose');

var employerScheme = new mongoose.Schema({
  employer_ID: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  employer_email: {
    type: String,
    required: true,
    unique: true,
  },
  employer_companyName: {
    type: String,
    required: true,
  },
  employer_industry: {
    type: String,
    required: true,
  },
  employer_description: {
    type: String,
    required: true,
  },
  employer_contactInformation: {
    type: String,
    required: true,
  },
});

const Employer = mongoose.model('Employer', employerScheme);
module.exports = Employer;