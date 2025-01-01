module.exports = (sequelize, DataTypes) => {
  const Admin = sequelize.define(
    "Admin",
    {
      admin_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      email: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      mobile: {
        type: DataTypes.STRING(15),
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING(60),
        allowNull: false,
      },
      profilephoto: {
        type: DataTypes.STRING(255),
      },
      otp: {
        type: DataTypes.STRING(6),
      },
    },
    {
      tableName: "admin",
      timestamps: false,
    }
  );

  Admin.associate = function (models) {
    Admin.hasMany(models.Status, { foreignKey: "admin_id" });
  };

  return Admin;
};
