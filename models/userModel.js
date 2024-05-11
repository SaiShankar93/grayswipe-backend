const mongoose = require("mongoose");
const Products = require('./productModel'); 

const userSchema = new mongoose.Schema({
    ownerName: {
        type: String,
    },
    storeName: {
        type: String,
        unique: true,
    },
    userName: {
        type: String,
        required:true,
        unique: true,
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    mobile:{
        type:Number,
        required:true,
        unique:true
    } ,
    myOrders : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Products'
    }]
})
module.exports = mongoose.model("userSchema",userSchema);