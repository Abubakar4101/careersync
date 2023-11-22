const express = require('express');
const router = express.Router();
const Candidate = require('../models/Candidate');



// Create a candidate
router.post('/', async (req, res) => {
    console.log(req.body);
    const candidate = new Candidate({
        candidate_ID: req.body.candidate_ID,
        candidate_email: req.body.candidate_email,
        candidate_name: req.body.candidate_name,
        candidate_location: req.body.candidate_location,
    });
    try {
        const newCandidate = await candidate.save();
        res.status(201).json(newCandidate);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


router.get('/', async (req, res) => {
    try {
        const candidates = await Candidate.find();
        res.json(candidates);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;