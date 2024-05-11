const express  = require("express");
const {addToCart,allCartItems} = require("../controllers/cartController");

const router = express.Router();

router.post("/addtocart",addToCart);
router.get("/all",allCartItems);

module.exports = router;