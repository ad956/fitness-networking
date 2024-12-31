const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db.config");

const User = require("./user.modal");
const Gym = require("./partner.modal");

const Transactions = sequelize.define(
  "Transactions",
  {
    transaction_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    gym_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    transaction_type: {
      type: DataTypes.ENUM("Purchase", "Usage", "Received", "Redeemed"),
      allowNull: false,
    },
    transaction_amount: {
      type: DataTypes.DECIMAL(7, 2),
      allowNull: true,
    },
    credits: {
      type: DataTypes.DECIMAL(7, 2),
      allowNull: true,
    },
    transaction_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "transactions",
    timestamps: false,
  }
);

Transactions.belongsTo(User, { foreignKey: "user_id" });
Transactions.belongsTo(Gym, { foreignKey: "gym_id" });

module.exports = Transactions;
