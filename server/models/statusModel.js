const { Model, DataTypes } = require("sequelize");

class Status extends Model {
  static associate(models) {
    this.belongsTo(models.User, { foreignKey: "user_id" });
    this.belongsTo(models.Partner, { foreignKey: "gym_id" });
    this.belongsTo(models.User, { foreignKey: "admin_id" });
  }
}

Status.init(
  {
    status_id: {
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
    admin_id: {
      type: DataTypes.INTEGER,
    },
    status: DataTypes.ENUM("Active", "Inactive"),
    role: DataTypes.ENUM("User", "Admin", "Gym"),
  },
  {
    sequelize,
    modelName: "Status",
    tableName: "status",
    timestamps: false,
  }
);

module.exports = Status;
