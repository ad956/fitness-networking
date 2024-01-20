const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/dbConnection");

const GymUsers = sequelize.define(
  "GymUsers",
  {
    gym_id: {
      type: DataTypes.INTEGER,
    },
    user_id: {
      type: DataTypes.INTEGER,
    },
  },
  {
    tableName: "gym_users",
    timestamps: false,
  }
);

module.exports = GymUsers;
