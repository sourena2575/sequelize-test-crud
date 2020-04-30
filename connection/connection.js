const Sequelize = require("sequelize");

const connection = new Sequelize("sourena", "root", "a-0012535540", {
  dialect: "mysql",
});

module.exports = connection;
