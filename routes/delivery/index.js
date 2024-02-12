const express = require("express");
const router = express.Router();
const Driver = require("../../models/driver");

const asdf = {
  username: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  vehicle_model: {
    type: String,
    required: true,
  },
  vehicle_color: {
    type: String,
    required: true,
  },
  license_plate: {
    type: String,
    default: false,
  },
};

router.get("/registration", (req, res) => {
  return res.send("Driver Registration Page");
});
router.post("/registration", async (req, res) => {
  const driverDetails = {
    username: req.body.username,
    name: req.body.name,
    password: req.body.password,
    vehicle_model: req.body.vehicle_model,
    vehicle_color: req.body.vehicle_color,
    license_plate: req.body.license_plate || null,
  };

  try {
    const driver = await new Driver(driverDetails).save();
    if (!driver) throw new Error("Failed to create new driver");
    return res.redirect("/");
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "Registration failed" });
  }
});

module.exports = router;
