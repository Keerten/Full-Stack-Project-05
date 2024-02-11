const express = require("express");
const app = express();
const path = require("path");

// Setting up .env
require("dotenv").config();
const PORT = process.env.PORT || 3000;

//View Engine Setup
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

// Connecting to MongoDB
const mongoose = require("mongoose");
mongoose.connect(
  `mongodb+srv://root:root@mndp.ygn8ieu.mongodb.net/?retryWrites=true&w=majority`
);
const db = mongoose.connection;

db.on("error", (error) => console.error(error));
db.once("open", () => console.log(`Connected to the database`));

//Multer Setup
var multer = require("multer");

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

const router = require("./routes/index.js");
const restaurantRouter = require("./routes/restaurant");
const orderRouter = require("./routes/order");
const deliveryRouter = require("./routes/delivery");

// app.use(router.routes());

app.use(router);

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://127.0.0.1:${PORT}`);
});
