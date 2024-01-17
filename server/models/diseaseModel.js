const { Model, DataTypes } = require("sequelize");

class Disease extends Model {
  static associate(models) {
    this.belongsTo(models.User, { foreignKey: "user_id" });
  }
}

Disease.init(
  {
    disease_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
    },
    disease_name: DataTypes.STRING(100),
    treatments: DataTypes.TEXT,
    status: DataTypes.STRING(20),
  },
  {
    sequelize,
    modelName: "Disease",
    tableName: "disease",
    timestamps: false,
  }
);

module.exports = Disease;
