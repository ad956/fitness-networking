const { Sequelize } = require("sequelize");

let sequelize;

const isProduction = process.env.NODE_ENV === "production";

if (isProduction && process.env.DB_URL) {
  sequelize = new Sequelize(process.env.DB_URL, {
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  });
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME || "fitness",
    process.env.DB_USER || "root",
    process.env.DB_PASS || "1245",
    {
      host: process.env.DB_HOST || "127.0.0.1",
      dialect: "mysql",
    }
  );
}

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connection established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

module.exports = { connectDB, sequelize };
