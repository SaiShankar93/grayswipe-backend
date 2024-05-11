const express  = require("express");
const {newClient,getAllClients,getClient} = require("../controllers/clientsController");

const router = express.Router();

router.post("/newclient",newClient);
router.get("/getallclients",getAllClients);
router.get("/getclient",getClient);

module.exports = router;