const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("<h1>This is Restaurant Page</h1>");
});

module.exports =  router;
