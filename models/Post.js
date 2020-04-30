const Sequelize = require("sequelize");
const connection = require("../connection/connection");
//post model
const Post = connection.define("posts", {
  name: Sequelize.STRING,
  description: Sequelize.STRING,
});
module.exports = Post;
