const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db.config");
const User = require("./user.modal");

const Disease = sequelize.define(
  "Disease",
  {
    disease_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
    },
    disease_name: {
      type: DataTypes.STRING(100),
    },
    treatments: {
      type: DataTypes.TEXT,
    },
    status: {
      type: DataTypes.STRING(20),
    },
  },
  {
    tableName: "disease",
    timestamps: false,
  }
);

Disease.belongsTo(User, { foreignKey: "user_id" });
module.exports = Disease;
