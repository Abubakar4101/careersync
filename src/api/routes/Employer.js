const express = require('express');
const router = express.Router();
const Employer = require('../models/Employer');

router.post('/', async (req, res) => {
  console.log('In server: ', req.body);
  const employer = new Employer({
    employer_ID: req.body.employer_ID,
    employer_email: req.body.employer_email,
    employer_companyName: req.body.employer_companyName,
    employer_industry: req.body.employer_industry,
    employer_description: req.body.employer_description,
    employer_contactInformation: req.body.employer_contactInformation,
  });
  try {
    const newEmployer = await employer.save();
    res.status(201).json(newEmployer);
  } catch (err) {
    res.status(400).json({message: err.message});
  }
});

router.get('/', async (req, res) => {
  try {
    const employers = await Employer.find();
    res.json(employers);
  } catch (err) {
    res.status(500).json({message: err.message});
  }
});

module.exports = router;