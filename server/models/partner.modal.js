const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db.config");

const GymProfile = require("./gym-profile.modal");
const GymUsers = require("./gym-users.modal");
const Service = require("./gym-services.modal");
const Status = require("./status.modal");
const User = require("./user.modal");

// Gym Model is used as Partner model throughout the app
const Partner = sequelize.define(
  "Partner",
  {
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
  },
  {
    tableName: "gym",
    timestamps: false,
  }
);

Partner.hasMany(GymProfile, { foreignKey: "gym_id" });
Partner.hasMany(Service, { foreignKey: "gym_id" });
Partner.hasMany(Status, { foreignKey: "gym_id" });

// circular dependency issue
// Partner.belongsToMany(User, { through: GymUsers, foreignKey: "gym_id" });

module.exports = Partner;
