const Sequelize = require("sequelize");

const connection = new Sequelize("sql12336848", "sql12336848", "E5L9fWfrUS", {
  host: "sql12.freemysqlhosting.net",
  dialect: "mysql",
});

module.exports = connection;
