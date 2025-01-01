module.exports = (sequelize, DataTypes) => {
  const Disease = sequelize.define(
    "Disease",
    {
      disease_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
      },
      disease_name: {
        type: DataTypes.STRING(100),
      },
      treatments: {
        type: DataTypes.TEXT,
      },
      status: {
        type: DataTypes.STRING(20),
      },
    },
    {
      tableName: "disease",
      timestamps: false,
    }
  );

  Disease.associate = function (models) {
    Disease.belongsTo(models.User, { foreignKey: "user_id" });
  };

  return Disease;
};
