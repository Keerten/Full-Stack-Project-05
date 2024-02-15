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

const Order = mongoose.model("order_collection", ordersSchema);

module.exports = Order;
