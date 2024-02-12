const express = require("express");
const router = express.Router();
const restaurantRouter = require("./restaurant/index.js");
const orderRouter = require("./order/index.js");
const deliveryRouter = require("./delivery/index.js");

router.use("/", restaurantRouter);
router.use("/order", orderRouter);
router.use("/delivery", deliveryRouter);

module.exports = router;
