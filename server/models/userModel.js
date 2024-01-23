const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/dbConnection");
const Profile = require("./userProfileModel");
const Partner = require("./partnerModel");
const GymUsers = require("./gymUsersModel");

const User = sequelize.define(
  "User",
  {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(30),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },
    mobile: {
      type: DataTypes.STRING(15),
      allowNull: false,
    },
    profile_photo: {
      type: DataTypes.STRING(255),
    },
    otp: {
      type: DataTypes.STRING(6),
    },
    gender: {
      type: DataTypes.ENUM("Male", "Female", "Other"),
      allowNull: false,
    },
  },
  {
    tableName: "user",
    timestamps: false,
  }
);
User.hasOne(Profile, { foreignKey: "user_id", primaryKey: "user_id" });
// circular dependency issues
// User.belongsToMany(Partner, { through: GymUsers, foreignKey: "user_id" });

module.exports = User;
