const express = require("express");
const User = require("../models/User");
const router = express.Router();

router.get("/", (req, res) => {
  User.findAll()
    .then((users) => {
      res.json(users);
    })
    .catch((e) => {
      console.log(e);
      res.status(400).send(error);
    });
});

module.exports = router;
