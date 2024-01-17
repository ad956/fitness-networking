const { Model, DataTypes } = require("sequelize");

class Transactions extends Model {
  static associate(models) {
    this.belongsTo(models.User, { foreignKey: "user_id" });
    this.belongsTo(models.Partner, { foreignKey: "gym_id" });
  }
}

Transactions.init(
  {
    transaction_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
    },
    gym_id: {
      type: DataTypes.INTEGER,
    },
    transaction_type: DataTypes.ENUM("Purchase", "Usage"),
    transaction_amount: DataTypes.DECIMAL(5, 2),
    credit_purchased: DataTypes.DECIMAL(5, 2),
    transaction_date: DataTypes.DATE,
  },
  {
    sequelize,
    modelName: "Transactions",
    tableName: "transactions",
    timestamps: false,
  }
);

module.exports = Transactions;
