const StoreSchema = require('../models/Store')
const Cartschema = require('../models/cartModel');
const userSchema = require('../models/userModel');

const placeOrder = async (req, res) => {
    const { storeName, userName } = req.body;
    try {
        const store = await StoreSchema.findOne({ storeName });
        const cart = await Cartschema.findOne({ userName });
        const user = await userSchema.findOne({ userName });
        
        store.orders.push(cart);
        await store.save();

        user.myOrders.push(...cart.cartItems);
        await user.save();
        
        cart.cartItems = [];
        await cart.save();
        
        res.status(201).json({ store });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error placing order' });
    }
}


const allOrders = async (req, res) => {
    const {storeName} = req.body;
    try {
        const store = await StoreSchema.findOne({storeName:storeName});
        const orders = store.orders;
        res.status(200).json({ orders });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error getting orders' });
    }
}

const myOrders = async (req, res) => {
    const {userName} = req.body;
    // console.log(userName);
    try {
        const user = await userSchema.findOne({userName:userName});
        const orders = user.myOrders;
        res.status(200).json({ orders });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error getting orders' });
    }
}

const getOrder = async(req,res) => {
    const {_id,storeName} = req.body;
    try{
        const store = await StoreSchema.find({storeName:storeName}).populate('orders').exec();
        res.status(200).json({store});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error getting order' });
    }
}

module.exports = {placeOrder,allOrders,getOrder,myOrders}