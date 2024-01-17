class Service extends Model {
  static associate(models) {
    this.belongsTo(models.Partner, { foreignKey: "gym_id" });
  }
}

Service.init(
  {
    service_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    gym_id: {
      type: DataTypes.INTEGER,
    },
    service_name: DataTypes.STRING,
    description: DataTypes.TEXT,
    service_img: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: "Service",
    tableName: "service",
    timestamps: false,
  }
);

module.exports = Service;
