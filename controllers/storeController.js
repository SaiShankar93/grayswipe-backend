const bankDetailsModel = require("../models/bankDetailsModel");
const Store = require("../models/Store");
const userSchema = require('../models/userModel')
const createStore = async (req, res) => {
    try {
        const files = req.files;

        const imageUrls = files && files.map(file => (
            file.location
        ));
        
        console.log(imageUrls)
        const { storeName, description, storeLocation, storeOwner, storeMobile,userName} = req.body;
        const store = await Store.create({
            storeName,
            storeMobile,
            description,
            storeLocation,
            storeOwner,
            images:imageUrls,
        });
        const user = await userSchema.findOne({userName});
        user.storeName = storeName;
        await user.save();
        store.bankDetails = []
        store.clients = []
        store.orders = []
        await store.save()
        console.log("store created successfully");
        res.status(200).json({ store });
    } catch (error) {
        console.error(error);
        if (error.code === 11000) { 
            res.status(409).json({ message: "Duplicate store name. Please choose a different store name." });
        }else {
            res.status(500).json({ message: "Error creating store" });
        }
    }
};

const getStore = async (req, res) => {
    // console.log(req.body);
    const { storeName } = req.query;
    console.log(storeName)
    try {
        const store = await Store.findOne({ storeName: storeName });
        console.log('getting store details',store)
        res.status(200).json({ store });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error getting stores" });
    }
};
const updateStore = async (req, res) => {
    const prevstoreName  = req.body.prevStoreName;
    console.log(prevstoreName);
    try {
        const store = await Store.findOneAndUpdate(
            { storeName:prevstoreName },
            { $set: req.body },
            { new: true }
        );
        res.status(200).json({ store });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating store" });
    }
}
const addBankDetails = async (req, res) => {
    const { storeName, bankName, accountNumber, IFSC } = req.body;
    try {
        const store = await Store.findOne({ storeName });
            store.bankDetails.push({ bankName, accountNumber, IFSC });
        
        await store.save();
        res.status(200).json({ store });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error adding bank details" });
    }
}

module.exports = { createStore, getStore, updateStore ,addBankDetails};