const StoreSchema = require('../models/Store');
const userSchema = require('../models/userModel');


const newClient = async (req, res) => {
    const {storeName,userName} = req.body;

    try {
        const store = await StoreSchema.findOne({ storeName: storeName});
        const client = await userSchema.findOne({ userName: userName });
        if (!store) {
            return res.status(404).json({ message: "Store not found" });
        }
        store.clients.push(client);
        await store.save();
        res.status(201).json({ message: "Client added to store" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getAllClients = async (req, res) => {
    const {storeName} = req.body;
    try {
        const store = await StoreSchema.findOne({ storeName: storeName});
        if (!store) {
            return res.status(404).json({ message: "Store not found" });
        }
        res.status(200).json({ clients: store.clients });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const getClient = async (req, res) => {
    const { userName, storeName } = req.body;
    try {
        const store = await StoreSchema.findOne({ storeName: storeName }).populate('clients').exec();
        
        if (!store) {
            return res.status(404).json({ message: 'Store not found' });
        }
        const client = store.clients.find(client => client.userName === userName);
        
        if (!client) {
            return res.status(404).json({ message: 'Client not found in the store' });
        }
        
        res.status(200).json({ client });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error getting client' });
    }
}


module.exports = {newClient,getAllClients,getClient};