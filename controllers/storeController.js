const bankDetailsModel = require("../models/bankDetailsModel");
const Store = require("../models/Store");

const createStore = async (req, res) => {
    try {
        const imageNames = req.files && req.files.map((file) => file.filename);
        console.log(imageNames);
        const { storeName, description, storeLocation, storeOwner, storeMobile } = req.body;
        const store = await Store.create({
            storeName,
            storeMobile,
            description,
            storeLocation,
            storeOwner,
            imageNames,
        });
        store.bankDetails = []
        store.clients = []
        store.orders = []
        await store.save()
        console.log("store created successfully");
        res.status(200).json({ store });
    } catch (error) {
        console.error(error);
        if (error.code === 11000) { // Check if it's a duplicate key error
            res.status(409).json({ message: "Duplicate store name. Please choose a different store name." });
        }else {
            res.status(500).json({ message: "Error creating store" });
        }
    }
};

const getStore = async (req, res) => {
    // console.log(req.body);
    const { storeName } = req.body;
    // console.log(storeName)
    try {
        const store = await Store.findOne({ storeName: storeName });
        // console.log('getting store details',store)
        res.status(200).json({ store });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error getting stores" });
    }
};
const updateStore = async (req, res) => {
    const prevstoreName  = req.body.prevStoreName;
    // console.log(prevstoreName);
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