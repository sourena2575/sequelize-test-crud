const Sequelize = require("sequelize");
const connection = require("../connection/connection");

//post model

const Post = connection.define("posts", {
  name: Sequelize.STRING,
  text: Sequelize.TEXT,
});

module.exports = Post;
