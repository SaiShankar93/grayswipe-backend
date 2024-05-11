const mongoose = require('mongoose');
const Productschema = require('./productModel'); 


const Cartschema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    cartItems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProductSchema'
    }]
});
module.exports = mongoose.model('Cartschema', Cartschema);
