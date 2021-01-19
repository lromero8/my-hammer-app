// User Schema
var mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

var User = new mongoose.Schema({ 
    name: {
        type: String
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String
    }
}, {
    collection: 'users'
});

User.plugin(uniqueValidator, { message: 'Email already in use.' });
module.exports = mongoose.model('User', User);