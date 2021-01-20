// Item Schema
var mongoose = require('mongoose');

var Item = new mongoose.Schema({ 
    category: {
        type: String
    },
    item: {
        type: String
    },
    price: {
        type: Number
    }
}, {
    collection: 'item'
});

module.exports = mongoose.model('Item', Item);