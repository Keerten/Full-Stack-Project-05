const mongoose = require("mongoose");

// Define a schema
const Schema = mongoose.Schema;

const menuItemsSchema = new Schema({
  name: String,
  imgURI: String,
  description: String,
  price: Number,
  driver: { type: mongoose.Schema.Types.ObjectId, ref: "Driver" },
});

const Menu = mongoose.model("menu_item_collection", menuItemsSchema);

module.exports = Menu;
