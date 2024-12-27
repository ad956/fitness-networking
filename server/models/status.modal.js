const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db.config");

const Status = sequelize.define(
  "Status",
  {
    status_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
    },
    gym_id: {
      type: DataTypes.INTEGER,
    },
    admin_id: {
      type: DataTypes.INTEGER,
    },
    status: {
      type: DataTypes.ENUM("Active", "Inactive"),
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("User", "Admin", "Gym"),
      allowNull: false,
    },
  },
  {
    tableName: "status",
    timestamps: false,
  }
);

module.exports = Status;
