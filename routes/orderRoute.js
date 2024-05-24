const express = require("express");
const {placeOrder,allOrders, getOrder,myOrders,orderProduct} = require("../controllers/orderController");


const router = express.Router();

router.post("/placeorder",placeOrder);
router.get("/allorders",allOrders);
router.get("/getorder",getOrder);
router.post("/myorders",myOrders);
router.post('/orderproduct',orderProduct)

module.exports = router;