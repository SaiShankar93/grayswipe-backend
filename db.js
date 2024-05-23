const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

// console.log(process.env.MONGO_URL);
const connectToMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connection to MongoDB successfull")
    }
    catch (error) {
        console.error("Error while connecting to MongoDB:", error.message);
    }
};

module.exports = connectToMongoDB;