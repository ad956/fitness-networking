const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/dbConnection");
const Profile = sequelize.define(
  "Profile",
  {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    credit_balance: {
      type: DataTypes.DECIMAL(10, 2),
    },
    total_spent: {
      type: DataTypes.DECIMAL(10, 2),
    },
    current_gym_name: {
      type: DataTypes.STRING(50),
    },
    requested_gym_name: {
      type: DataTypes.STRING(50),
    },
  },
  {
    tableName: "profile",
    timestamps: false,
  }
);

module.exports = Profile;
