const express = require("express");
const router = express.Router();
const controller = require("../controllers/blockchain");

router.get("/status/:userAddress", controller.checkStatus);

module.exports = router;
