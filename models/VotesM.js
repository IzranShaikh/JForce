const mongoose = require('mongoose');

const VoteSchema = new mongoose.Schema({

    candidate1: { type: Number },
    candidate2: { type: Number },
    candidate3: { type: Number },
    candidate4: { type: Number }
    
});

module.exports = mongoose.model("votes", VoteSchema);