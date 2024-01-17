const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/dbConnection");
const GymProfile = require("./gymProfileModel");
const Service = require("./gymServicesModel");
const Status = require("./statusModel");
const User = require("./userModel");

// Gym Model is used as Partner model throughout the app
const Gym = sequelize.define("Gym", {
  gym_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  otp: {
    type: DataTypes.STRING(6),
  },
  password: {
    type: DataTypes.STRING(60),
    allowNull: false,
  },
  mobile: {
    type: DataTypes.STRING(15),
    allowNull: false,
  },
});

Gym.hasMany(GymProfile, { foreignKey: "gym_id" });
Gym.hasMany(Service, { foreignKey: "gym_id" });
Gym.hasMany(Status, { foreignKey: "gym_id" });
Gym.belongsToMany(User, { through: "GymUsers", foreignKey: "gym_id" });

module.exports = Gym;
