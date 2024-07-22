if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const http = require("http"); // Import the http module
const cors = require("cors");
const cookieParser = require("cookie-parser");
const port = process.env.PORT || 3000;

const initialRoute = require("./routes");
const errorHandler = require("./middleware/errorHandler");
const { connectDB } = require("./config/dbConnection");

const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: [
      "http://localhost:5173",
      "https://fitness-networking.onrender.com",
    ],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://fitness-networking.onrender.com",
    ],
    credentials: true,
  })
);

connectDB();
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.set("io", io);
app.use("/api", initialRoute);

app.use(errorHandler);

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
