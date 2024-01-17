const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Admin extends Model {
    static associate(models) {}
  }

  Admin.init(
    {
      admin_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      mobile: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      otp: DataTypes.STRING,
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      profilephoto: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Admin",
      tableName: "admin",
      timestamps: false,
    }
  );

  return Admin;
};
