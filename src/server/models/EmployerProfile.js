const mongoose = require("mongoose");

const employerProfileSchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  industry: String,
  address: String,
  contact: String,
  companyDescription: String,
  websiteURL: String,
  facebookURL: String,
  instagramURL: String,
  twitterURL: String,
  profilePictureUrl: String,
});

module.exports = mongoose.model("EmployerProfile", employerProfileSchema);