const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");



// Define a schema
const Schema = mongoose.Schema;

const ordersSchema = new Schema({
  custName: String,
  deliveryAddr: String,
  itemsOrdered: Array,
  orderTime: Date,
  orderStatus: String,
});

const menuItemsSchema = new Schema({
  name: String,
  imgURI: String,
  description: String,
  price: Number,
});

// Compile model from schema
const orderData = mongoose.model("order_collection", ordersSchema);
const menuItem = mongoose.model("menu_item_collection", menuItemsSchema);


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

 const itemsOrdered = Array.isArray(req.body.orderItem)
 ? req.body.orderItem
 : [req.body.orderItem];

 const menuItems = [];

// Use for...of to iterate through the array of menu item IDs
try {
  for (const id of itemsOrdered) {
    const menu = await menuItem.findById(id).exec();
    
    // Push an object with desired properties (name, price, id) to the array
    menuItems.push({
      id: menu._id,
      name: menu.name,
      price: menu.price,
    });
  }
} catch (error) {
  console.error("Error fetching Menu Items:", error);
  res.status(500).json({ error: "Error fetching Menu Items" });
}

const orderDetails = {
 custName: req.body.customerName,
 deliveryAddr: req.body.customerAddress,
 itemsOrdered: menuItems,
 orderTime: time,
 orderStatus: "RECEIVED",
};

try {
  console.log("In /order try block")
  const createOrder = new orderData(orderDetails);
  await createOrder.save();
  return res.send(JSON.stringify(createOrder));
  //return res.redirect("/check")
} catch (error) {
  console.log("In /order catch block")
  res.status(500).json({ error: "Error Saving order!" });
}
});

router.post("/check-status", async (req, res) => {
  const id = req.body.orderId;
  console.log(id);
  try {
    const orderDetails = await orderData.findById(id).exec();
    if (orderDetails) {
      res.render("order-status", { orderStatus: orderDetails, error: null });
    } else {
      res.render("order-status", {
        orderStatus: null,
        error: `Sorry! No such order with ID : "${id}" found!`,
      });
    }
  } catch (error) {
    res.render("order-status", {
      orderStatus: null,
      error: `Sorry! No such order with ID : "${id}" found!`,
    });
  }
});

module.exports =  router;
