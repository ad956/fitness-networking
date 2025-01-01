module.exports = (sequelize, DataTypes) => {
  const GymUsers = sequelize.define(
    "GymUsers",
    {
      gym_id: {
        type: DataTypes.INTEGER,
      },
      user_id: {
        type: DataTypes.INTEGER,
      },
    },
    {
      tableName: "gym_users",
      timestamps: false,
    }
  );
  return GymUsers;
};
