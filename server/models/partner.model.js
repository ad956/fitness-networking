module.exports = (sequelize, DataTypes) => {
  const Partner = sequelize.define(
    "Partner",
    {
      gym_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
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
      tableName: "gym",
      timestamps: false,
    }
  );

  Partner.associate = function (models) {
    Partner.hasMany(models.GymProfile, { foreignKey: "gym_id" });
    Partner.hasMany(models.Service, { foreignKey: "gym_id" });
    Partner.hasMany(models.Status, { foreignKey: "gym_id" });
    Partner.belongsToMany(models.User, {
      through: models.GymUsers,
      foreignKey: "gym_id",
    });
  };

  return Partner;
};
