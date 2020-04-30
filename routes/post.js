const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
router.post("/", (req, res) => {
  Post.create(req.body)
    .then((users) => res.json(users))
    .catch((er) => {
      console.log(er);
    });
});
router.put("/:id", (req, res) => {
  Post.findOne({ where: { id: req.params.id } }).then((post) => {
    post.UserId = "1";
    post
      .save()
      .then((pos) => res.json(pos))
      .catch((er) => {
        console.log(er);
      });
  });
});
router.get("/:id", (req, res) => {
  Post.findOne({ where: { id: req.params.id } }).then((post) => {
    res.json(post);
  });
});
router.get("/user/:id", (req, res) => {
  Post.findAll({
    where: { UserId: req.params.id },
  })
    .then((p) => {
      res.json(p);
    })
    .catch((er) => {
      console.log(er);
    });
});

module.exports = router;
