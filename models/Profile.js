const Sequelize = require("sequelize");
const connection = require("../connection/connection");

//post model

const Profile = connection.define("profile", {
  name: Sequelize.STRING,
  image: Sequelize.STRING,
});

module.exports = Profile;
