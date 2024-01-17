class GymUsers extends Model {
  static associate(models) {
    this.belongsTo(models.Gym, { foreignKey: "gym_id" });
    this.belongsTo(models.User, { foreignKey: "user_id" });
  }
}

GymUsers.init(
  {
    gym_id: {
      type: DataTypes.INTEGER,
    },
    user_id: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize,
    modelName: "GymUsers",
    tableName: "gym_users",
    timestamps: false,
  }
);

module.exports = GymUsers;
