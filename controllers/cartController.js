const Cartschema = require('../models/cartModel');
const Productschema = require('../models/productModel');

const addToCart = async (req, res) => {
    const { userName, storeName,productName,_id } = req.body;
    const product = await Productschema.findOne({ _id: _id})
    // console.log(product)
    try {
        let user = await Cartschema.findOne({ userName });

        if (!user) {
            user = await Cartschema.create({ userName, cartItems: [product] });
        } else {
            user.cartItems.push(product);
            await user.save();
        }
        res.status(201).json({ user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Cart not created" });
    }
}
const allCartItems = async (req, res) => {
    try {
        const cartItems = await Cartschema.find({});
        res.status(200).json({ cartItems });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error getting cart items' });
    }
}

module.exports = { addToCart ,allCartItems};