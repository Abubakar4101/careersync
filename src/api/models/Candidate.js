const mongoose = require('mongoose'); 

var candidateScheme = new mongoose.Schema({
    candidate_ID:{
        type:String,
        required:true,
        unique:true,
        index:true,
    },
    candidate_email:{
        type:String,
        required:true,
        unique:true,
    },
    candidate_name:{
        type:String,
        required:true,
    },
    candidate_location:{
        type:String
    },
});

const Candidate =  mongoose.model('Candidate', candidateScheme);
module.exports = Candidate;