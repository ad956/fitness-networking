const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db.config");

const DemoUser = sequelize.define(
  "DemoUser",
  {
    demo_user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    role: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    ref_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "demo_users",
    timestamps: false,
    indexes: [
      {
        name: "role_index",
        fields: ["role"],
      },
    ],
  }
);

module.exports = DemoUser;
