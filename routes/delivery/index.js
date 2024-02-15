const express = require("express");
const router = express.Router();
const Driver = require("../../models/driver");
const bcrypt = require("bcrypt");
const passport = require("passport");
const path = require("path");

const auth = require("../../middlewares/authenticator");

const initializePassport = require("../../passport-config");
initializePassport(passport);

const flash = require("express-flash");
const session = require("express-session");

router.use(
  flash({
    sessionKeyName: 'express-flash-message',
    // below are optional property you can pass in to track
    onAddFlash: (type, message) => {},
    onConsumeFlash: (type, messages) => {},
  })
);
router.use(
  session({
    secret: "Group 5 Secret",
    resave: false,
    saveUninitialized: false,
  })
);

router.use(passport.initialize());
router.use(passport.session());
router.use(express.static(path.join(__dirname, "../../public")));

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

router.get("/", auth, async (req, res) => {
  console.log(req.user);
  return res.render("delivery/delivery", { user: req.user });
});

router.get("/login", (req, res) => {
  return res.render("delivery/login");
});
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/delivery",
    failureRedirect: "/delivery/login",
    failureFlash: true,
  })
);

router.get("/register", (req, res) => {
  return res.render("delivery/register");
});

router.post("/register", async (req, res) => {
  const newDriver = new Driver({ ...req.body });

  const salt = bcrypt.genSaltSync(10);
  newDriver.password = bcrypt.hashSync(newDriver.password, salt);

  try {
    let driver = await Driver.findOne({ username: newDriver.username });

    if (driver) {
      return res.status(400).json("Username already exists");
    }

    driver = await newDriver.save();
    req.flash("success", "Account created successfully, Please Login !");
    return res.redirect("/delivery/login");
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Some server error occured");
  }
});

module.exports = router;
