const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // Define associations here if needed
    }
  }
  User.init(
    {
      user_id: {
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
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      mobile: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      profile_photo: DataTypes.STRING,
      otp: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
      tableName: "user", // Make sure this matches your table name
      timestamps: false, // If you don't want timestamps (createdAt, updatedAt)
    }
  );
  return User;
};
