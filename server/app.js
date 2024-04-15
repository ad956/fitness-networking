require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 3000;

const initialRoute = require("./routes");
const errorHandler = require("./middleware/errorHandler");
const { connectDB } = require("./config/dbConnection");

app.use(cors());
connectDB();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api", initialRoute);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
