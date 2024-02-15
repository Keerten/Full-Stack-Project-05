const express = require("express");
const router = express.Router();
const orderData = require("../../models/order");
const menuItem = require("../../models/menu");

// Create home route
router.get("/", async (req, res) => {
  try {
    const menu = await menuItem.find().exec();
    return res.render("restaurant", { menuItems: menu });
  } catch (error) {
    console.error("Error fetching Menu Items:", error);
    res.status(500).json({ error: "Error fetching Menu Items" });
  }
});

// Create order route
router.post("/order", async (req, res) => {
  const time = new Date();
  const orderItem = {
    custName: req.body.customerName,
    deliveryAddr: req.body.customerAddress,
    itemsOrdered: [req.body.orderItem],
    orderTime: time,
    orderStatus: "RECEIVED",
  };
  res.send(JSON.stringify(orderItem));
});

router.post("/check-status", async (req, res) => {
  const id = req.body.orderId;
  console.log(id);
  try {
    console.log("In Try block");
    const orderDetails = await orderData.findById(id).exec();
    console.log("order details", orderDetails);
    if (orderDetails) {
      res.render("order-status", { orderStatus: orderDetails, error: null });
    } else {
      res.render("order-status", {
        orderStatus: null,
        error: `Sorry! No such order with ID : "${id}" found!`,
      });
    }
  } catch (error) {
    console.log("In catch block");
    res.render("order-status", {
      orderStatus: null,
      error: `Sorry! No such order with ID : "${id}" found!`,
    });
  }
});

module.exports = router;
