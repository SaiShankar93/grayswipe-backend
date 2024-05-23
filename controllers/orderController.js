const Store = require("../models/Store");
const Cartschema = require('../models/cartModel');
const userSchema = require('../models/userModel');
const Productschema = require('../models/productModel');

const placeOrder = async (req, res) => {
    const { storeName, userName } = req.body;
    console.log(storeName,userName)
    try {
        const store = await Store.findOne({ storeName });
        const cart = await Cartschema.findOne({ userName });
        const user = await userSchema.findOne({ userName });
        console.log(store,user,cart);
        if (!store) {
            return res.status(404).json({ message: 'Store not found' });
        }
        
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (!store.orders) {
            store.orders = [];
        }

        if (store.orders.length === 0) {
            store.orders[0] = cart;
        } else {
            store.orders.push(cart);
        }
        await store.save();
        console.log("storesaved")

        user.myOrders.push(...cart.cartItems);
        await user.save();
        console.log("user saved")
        
        cart.cartItems = [];
        await cart.save();
        console.log("cart saved")

        res.status(200).json({ store });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error placing order' });
    }
}

const allOrders = async (req, res) => {
    const {storeName} = req.query;
    console.log(storeName)
    try {
        const store = await Store.findOne({storeName:storeName});
        const orders = await Promise.all(store.orders.map(async (orderId) => {
            return await Cartschema.findById(orderId);
        }));
        console.log(orders)
        res.status(200).json({ orders });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error getting orders' });
    }
}
const orderProduct = async(req,res) => {
    const { _id,storeName } = req.body;
    console.log(storeName,_id)
    try {
        const store = await Store.findOne({ storeName });
        const product = await Productschema.findById({_id});
        console.log(product)
        if (!store) {
            return res.status(404).json({ message: 'Store not found' });
        }
        if (!store.orders) {
            store.orders = [];
        }

        if (store.orders.length === 0) {
            store.orders[0] = product;
        } else {
            store.orders.push(product);
        }
        await store.save();
        console.log("storesaved")
        
        res.status(200).json({ store });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error placing order' });
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
        const store = await Store.find({storeName:storeName}).populate('orders').exec();
        res.status(200).json({store});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error getting order' });
    }
}

module.exports = {placeOrder,allOrders,getOrder,myOrders,orderProduct}