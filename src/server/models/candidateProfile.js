const mongoose = require("mongoose");

const candidateProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Candidate",
  },
  fullName: {
    type: String,
    required: [true, "Full name is required"],
  },
  email: String,
  phone: String,
  preferredJobLocation: String,
  skills: [String],
  workExperiences: [
    {
      title: String,
      companyName: String,
      location: String,
      duration: String,
      description: String,
    },
  ],
  education: [
    {
      degree: String,
      universityName: String,
      location: String,
      duration: String,
      description: String,
    },
  ],
  profilePictureUrl: String,
});

module.exports = mongoose.model("CandidateProfile", candidateProfileSchema);