const express = require("express");
const router = express.Router();
const Profile = require("../models/Profile");

router.post("/", (req, res) => {
  Profile.create(req.body).then((prof) => {
    res.json(prof);
  });
});
module.exports = router;
