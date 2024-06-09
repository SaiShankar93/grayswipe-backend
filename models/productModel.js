const mongoose = require("mongoose");

const styleSchema = new mongoose.Schema({
    id : {
        type : Number,
    },
    colors: {
        type: [String]
    },
    sizes: {
        type: []
    },
    minOrder: {
        type: String
    },
    price: {
        type: []
    },
    artNo: {
        type: Number
    }
});

const Productschema = new mongoose.Schema({ 
    storeName: {
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
    images: {
        type: [String]
    },
    styles: [styleSchema]
});

module.exports = mongoose.model("Product", Productschema);
