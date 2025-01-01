if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const port = process.env.PORT || 3000;

const initialRoute = require("./routes");
const errorHandler = require("./middleware/error-handler.middleware");
const { db } = require("./models");

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://fitness-networking.onrender.com",
    ],
    credentials: true,
  })
);

db.sequelize
  .authenticate()
  .then(() => console.log("Database connection established successfully."))
  .catch((error) => console.error("Unable to connect to the database:", error));

app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// for cron-job
app.get("/ping", (req, res) => {
  res.status(200).send("Active");
});

app.use("/api", initialRoute);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
