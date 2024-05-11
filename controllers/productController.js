const Productschema = require('../models/productModel');

const newProduct = async (req, res) => {
    const imageNames = req.files && req.files.map(file => file.filename);
    // console.log(req.file.filename);
    const {storeName, productName, description ,styles} = req.body;
    const parsedStyles = JSON.parse(styles);
    try {
        const product = await Productschema.create({storeName, productName, description, styles:parsedStyles,imageNames:imageNames });
        res.status(200).json({ product });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Product not created" });
    }
}

const getProduct = async(req, res) => {
    const {_id} = req.body;
    try {
        const product = await Productschema.findById({_id});
        res.status(200).json({ product });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error getting products' });
    }
}

const allProducts =async (req, res) => {
    try {
        const allProducts = await Productschema.find({});
        res.status(200).json({ allProducts });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error getting products' });
    }
}
const editProduct = async (req, res) => {
    const {_id} = req.body;
    try {
        const product = await Productschema.findOneAndUpdate({ _id}, { $set: req.body }, { new: true }); 
        res.status(200).json({ product });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error getting products' });
    }
}
const deleteProduct = async(req, res) => {
    const { _id } = req.body;
    try {
        const product = await Productschema.findOneAndDelete({ _id });
        res.status(200).json({ product });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting product' });
    }
}

module.exports = {newProduct, getProduct,allProducts,editProduct,deleteProduct}