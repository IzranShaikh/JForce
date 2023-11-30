const mongoose = require('mongoose');

const AuthSchema = new mongoose.Schema({

    username: { type: String },
    password: { type: String },
    admin: { type: Boolean },
    voted: { type: Boolean },
    phone: { type: String },
    email: { type: String }
    
});

module.exports = mongoose.model("users", AuthSchema);