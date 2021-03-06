const Sequelize = require("sequelize");
const connection = require("../connection/connection");
const bcrypt = require("bcryptjs");
const Post = require("./Post");
const Profile = require("./Profile");
// user model
const User = connection.define(
  "User",
  {
    name: {
      type: Sequelize.STRING,
      defaultValue: "Amir",
      allowNull: false,
      // validate: {
      //  startWithUpper: (val) => {
      //   let first = val.charAt(0);
      //  let startWithUpper = first === first.toUpperCase();
      //  if (!startWithUpper) {
      //     throw new Error("first letter must be upper case");
      //   } else {
      //...
      //  }
      //  },
      //},
    },
    email: {
      type: Sequelize.STRING,
      unique: true,
      validate: { isEmail: true },
    },
    password: {
      type: Sequelize.STRING,
      defaultValue: "12345",
      validate: {
        len: {
          args: [6, 100],
          msg: "Length Of Password must be atleast 6",
        },
      },
    },
  },
  {
    hooks: {
      beforeValidate: () => {
        //...
      },
      afterValidate: (user) => {
        user.password = bcrypt.hashSync(user.password, 8);
      },
      beforeUpdate: (user) => {
        user.password = bcrypt.hashSync(user.password, 8);
      },
    },
  }
);
User.hasMany(Post, {
  onDelete: "cascade",
});
User.hasOne(Profile, {
  onDelete: "cascade",
});
module.exports = User;
