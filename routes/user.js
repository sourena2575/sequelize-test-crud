const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const Post = require("../models/Post");
const Profile = require("../models/Profile");
// signup
router.post("/", (req, res) => {
  User.create(req.body)
    .then((users) => res.json(users))
    .catch((er) => {
      res.status(400).send(er);
    });
});
//login
router.post("/auth", (req, res) => {
  const { email, password } = req.body;
  User.findOne({ where: { email: email } }).then((user) => {
    if (!user) {
      res.status(400).json({ msg: "این ایمیل ثبت نشده است" });
    }
    bcrypt.compare(password, user.password).then((match) => {
      if (!match) {
        res.status(400).json({ msg: "رمز وارد شده اشتباه است" });
      }
      res.json(user);
    });
  });
});
// delete
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
// association show all shits
router.get("/", (req, res) => {
  User.findAll({
    include: [Post, Profile],
  })
    .then((all) => {
      res.json(all);
    })
    .catch((er) => {
      console.log(er);
    });
});
//update password
router.put("/:id", (req, res) => {
  let { password } = req.body;
  User.findOne({ where: { id: req.params.id } }).then((user) => {
    user.password = password;
    user
      .save()
      .then((newUser) => {
        res.json(newUser);
      })
      .catch((er) => {
        res.json(er);
        console.log(er);
      });
  });
});
module.exports = router;
