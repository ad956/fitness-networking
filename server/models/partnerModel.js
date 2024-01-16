const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Gym extends Model {
    static associate(models) {
      // Define associations here if needed
    }
  }

  Gym.init(
    {
      gym_id: {
        type: DataTypes.INTEGER,
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
      sequelize,
      modelName: "Partner",
      tableName: "gym",
      timestamps: false,
    }
  );

  return Gym;
};
