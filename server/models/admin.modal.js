const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db.config");
const Status = require("./status.modal");

const Admin = sequelize.define(
  "Admin",
  {
    admin_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    mobile: {
      type: DataTypes.STRING(15),
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },
    profilephoto: {
      type: DataTypes.STRING(255),
    },
    otp: {
      type: DataTypes.STRING(6),
    },
  },
  {
    tableName: "admin",
    timestamps: false,
  }
);

Admin.hasMany(Status, { foreignKey: "admin_id" });

module.exports = Admin;
