const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/dbConnection");

const GymUsers = sequelize.define("GymUsers", {
  gym_id: {
    type: DataTypes.INTEGER,
  },
  user_id: {
    type: DataTypes.INTEGER,
  },
});

module.exports = GymUsers;
