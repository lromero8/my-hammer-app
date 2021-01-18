// User Schema
var mongoose = require('mongoose');

var User = new mongoose.Schema({ 
    firstName: String,
    lastName: String,
    username: String,
    password: String,
    birthdate: Date,
    role: String,
    contact: {
        phone: String,
        email: String
    }
});

module.exports = mongoose.model('User', User);