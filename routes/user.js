const express = require("express");
const router = express.Router();
const User = require("../models/User");
router.post("/", (req, res) => {
  User.create(req.body)
    .then((users) => res.json(users))
    .catch((er) => {
      console.log(er);
      res.status(400).json(er);
    });
});

router.delete("/:id", (req, res) => {
  User.findOne({ where: { id: req.params.id } }).then((user) => {
    user
      .destroy()
      .then(() => res.json("deleted"))
      .catch((er) => {
        console.log(er);
      });
  });
});

module.exports = router;
