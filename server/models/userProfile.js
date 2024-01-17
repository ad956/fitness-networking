class Profile extends Model {
  static associate(models) {
    this.belongsTo(models.User, { foreignKey: "user_id" });
  }
}

Profile.init(
  {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    credit_balance: DataTypes.DECIMAL(10, 2),
    total_spent: DataTypes.DECIMAL(10, 2),
    current_gym_name: DataTypes.STRING,
    requested_gym_name: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: "Profile",
    tableName: "profile",
    timestamps: false,
  }
);

module.exports = Profile;
