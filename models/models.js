const Sequelize = require("sequelize");
const { sequelize } = require("../services/DB/db");

const User = sequelize.define("users", {
  email: {
    type: Sequelize.DataTypes.STRING,
    primaryKey: true,
    allowNull: {
      args: false,
      msg: "Email Please enter your email",
    },
    unique: true,
    validate: {
      isEmail: {
        args: true,
        msg: "Please enter valid email",
      },
      len: {
        args: [5, 40],
        msg: "Email must be atleast 5 characters long and can be 64 characters long",
      },
    },
  },
  name: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [3, 40],
        msg: "Name must be atleast 3 character long and can be 40 character long",
      },
    },
  },
  password: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [8, 128],
        msg: "Password must be atleast 8 character long and can be 64 character long",
      },
    },
  },
});

module.exports = { User };
