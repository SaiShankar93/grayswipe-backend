const mongoose = require("mongoose")

const bankDetailsSchema = new mongoose.Schema({
    bankName: {
        type: String,
    },
    accountNumber: {
        type: Number,
        unique:true,
    },
    IFSC : {
        type: String,
    },
})

module.exports = mongoose.model("bankDetailsSchema", bankDetailsSchema)