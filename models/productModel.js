const mongoose = require("mongoose");


const Productschema = new mongoose.Schema({
    storeName:{
        type: String,
        required: true,
    },
    productName: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    imageNames: {
        type: [String], 
        default: []
    },
    styles: {
        type: [{
            id: Number,
            value: String
        }]
    }    
});

module.exports = mongoose.model("Productschema", Productschema)