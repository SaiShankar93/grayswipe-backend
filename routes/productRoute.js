const express = require("express");
const storeImage = require("./multer");
const {newProduct, getProduct,allProducts,editProduct,deleteProduct} = require("../controllers/productController");

const router = express.Router();

const upload = storeImage();

router.post("/newproduct",upload.array('images',10), newProduct);
router.get("/getproduct", getProduct);
router.put("/editproduct",upload.array('images',10), editProduct);
router.get("/all", allProducts);
router.get("/delete",deleteProduct);


module.exports = router;