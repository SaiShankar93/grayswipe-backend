const mongoose = require("mongoose");
const Cart = require("./cartModel");
const User = require("./userModel");
const bankDetailsSchema = require("./bankDetailsModel");

const StoreSchema = new mongoose.Schema({
    storeName: {
        type: String,
        unique : true
    },
    description: {
        type: String,
    },
    storeLocation: {
        type: String,
    },
    storeOwner: {
        type: String,
    },
    storeMobile: {
        type: Number,
    },
    imageNames: {
        type: [String],
        default: []
    },
    orders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cart' 
    }],
    clients: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    bankDetails: [{
        bankName: String,
        accountNumber: Number,
        IFSC: String
    }]
});

module.exports = mongoose.model("Store", StoreSchema);
