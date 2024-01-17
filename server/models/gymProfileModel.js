const { Model, DataTypes } = require("sequelize");

class GymProfile extends Model {
  static associate(models) {
    this.belongsTo(models.Partner, { foreignKey: "gym_id" });
  }
}

GymProfile.init(
  {
    gym_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    total_credits: DataTypes.DECIMAL(10, 2),
    upi_id: DataTypes.STRING,
    credit_charge: DataTypes.DECIMAL(5, 2),
    todays_credit: DataTypes.DECIMAL(10, 2),
    profile_pic: DataTypes.STRING,
    city: DataTypes.STRING,
    pin_code: DataTypes.STRING,
    state: DataTypes.STRING,
    address: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: "GymProfile",
    tableName: "gym_profile",
    timestamps: false,
  }
);

module.exports = GymProfile;
