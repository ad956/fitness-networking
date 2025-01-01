module.exports = (sequelize, DataTypes) => {
  const GymProfile = sequelize.define(
    "GymProfile",
    {
      gym_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      total_credits: {
        type: DataTypes.DECIMAL(10, 2),
      },
      upi_id: {
        type: DataTypes.STRING(50),
      },
      credit_charge: {
        type: DataTypes.DECIMAL(5, 2),
      },
      todays_credit: {
        type: DataTypes.DECIMAL(10, 2),
      },
      profile_pic: {
        type: DataTypes.STRING(255),
      },
      city: {
        type: DataTypes.STRING(50),
      },
      pin_code: {
        type: DataTypes.STRING(10),
      },
      state: {
        type: DataTypes.STRING(50),
      },
      address: {
        type: DataTypes.STRING(255),
      },
    },
    {
      tableName: "gym_profile",
      timestamps: false,
    }
  );
  return GymProfile;
};
