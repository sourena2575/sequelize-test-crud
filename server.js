const express = require("express");
const cors = require("cors");
const connection = require("./connection/connection");
const User = require("./models/User");
const Post = require("./models/Post");
const port = process.env.PORT || 4000;
const app = express();

// create relationship
User.hasMany(Post);
// sync
connection
  .sync({
    logging: console.log,
    force: true,
  })
  .then(() => {
    User.create(
      {
        name: "Aaaamir",
        email: "aaaa@gmail.com",
        password: "12345a65",
      },
      { fields: ["name", "email", "password"] }
    )
      .then((user) => {
        console.log(user.dataValues);
      })
      .catch((e) => {
        console.log(e);
      });
  });

//middleware
app.use(express.json());
app.use(cors());
app.listen(port, () => {
  console.log(`Server is on port ${port}`);
});
