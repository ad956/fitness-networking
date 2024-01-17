const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class GymUsers extends Model {
    static associate(models) {
      this.belongsTo(models.Partner, { foreignKey: "gym_id" });
      this.belongsTo(models.User, { foreignKey: "user_id" });
    }
  }

  GymUsers.init(
    {
      gym_id: {
        type: DataTypes.INTEGER,
      },
      user_id: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "GymUsers",
      tableName: "gym_users",
      timestamps: false,
    }
  );

  return GymUsers;
};
