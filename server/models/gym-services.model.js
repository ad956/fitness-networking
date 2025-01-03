module.exports = (sequelize, DataTypes) => {
  const Service = sequelize.define(
    "Service",
    {
      service_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      gym_id: {
        type: DataTypes.INTEGER,
      },
      service_name: {
        type: DataTypes.STRING(50),
      },
      description: {
        type: DataTypes.TEXT,
      },
      service_img: {
        type: DataTypes.STRING(255),
      },
    },
    {
      tableName: "service",
      timestamps: false,
    }
  );
  return Service;
};
