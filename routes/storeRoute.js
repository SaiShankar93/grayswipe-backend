const express = require("express");
const {getStore, createStore,updateStore,addBankDetails} = require("../controllers/storeController");
const storeImage = require("./multer");

const router = express.Router();

const upload = storeImage();
router.post("/createstore",upload.array('images',10), createStore);
router.post("/addbankdetails", addBankDetails);
router.post("/updatestore",upload.array('images',10), updateStore);
router.get("/getstore", getStore);

module.exports = router;