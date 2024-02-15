// const express = require("express");
// const router = express.Router();
// const mongoose = require("mongoose");

// const orderSchema = new mongoose.Schema({
//   // customer_name: String,
//   // customer_address: String,
//   // order_date: Date,
//   // items_ordered: Array,
//   // order_total: Number,
//   // driver_name: String,
//   // driver_license_plate: String,
//   // delivery_photo: String,
//   // order_status: String,
//   custName: String,
//   deliveryAddr: String,
//   itemsOrdered: Array,
//   orderTime: Date,
//   orderStatus: String,
// });

// const Order = mongoose.model("order", orderSchema);

// router.get("/", async (req, res) => {
//   const orders = await Order.find();
//   return res.render("home", { orders });
// });

// router.post("/search", async (req, res) => {
//   const orders = await Order.find({ customer_name: req.body.customer_name });
//   res.render("search", { orders });
// });

// router.post("/update_status/:order_id", async (req, res) => {
//   await Order.findByIdAndUpdate(req.params.order_id, {
//     order_status: req.body.order_status,
//   });
//   res.redirect("/");
// });

// router.get("/completed_orders", async (req, res) => {
//   const orders = await Order.find({ order_status: "completed" });
//   res.render("completed_orders", { orders });
// });

// module.exports = router;
