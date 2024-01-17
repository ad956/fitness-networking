const { Model } = require("sequelize");
const Profile = require("./userProfileModel");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      this.hasOne(models.Profile, { foreignKey: "user_id" });
      this.belongsToMany(models.Partner, {
        through: "GymUsers",
        foreignKey: "user_id",
      });
      this.hasMany(models.Status, { foreignKey: "user_id" });
      this.hasMany(models.Transactions, { foreignKey: "user_id" });
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
      tableName: "user",
      timestamps: false,
    }
  );
  return User;
};
