const Products = require('../models/productModel');

const newProduct = async (req, res) => {
    const files = req.files;

    const imageUrls = files && files.map(file => file.location);

    console.log(imageUrls);

    const { storeName, productName, description, styles } = req.body;

    try {
        const parsedStyles = JSON.parse(styles);
        const product = await Products.create({
            storeName,
            productName,
            description,
            styles: parsedStyles,
            images: imageUrls
        });
        res.status(200).json({ product });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Product not created" });
    }
};


const getProduct = async(req, res) => {
    const {_id} = req.body;
    try {
        const product = await Products.findById({_id});
        res.status(200).json({ product });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error getting products' });
    }
}

const allProducts =async (req, res) => {
    try {
        const allProducts = await Products.find({});
        res.status(200).json({ allProducts });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error getting products' });
    }
}
const editProduct = async (req, res) => {
    const {_id} = req.body;
    try {
        const product = await Products.findOneAndUpdate({ _id}, { $set: req.body }, { new: true }); 
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
        const product = await Products.findOneAndDelete({ _id });
        res.status(200).json({ product });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting product' });
    }
}

module.exports = {newProduct, getProduct,allProducts,editProduct,deleteProduct}