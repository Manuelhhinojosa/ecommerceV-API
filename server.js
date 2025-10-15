// express
const express = require("express");
// cors for communication with front-end
const cors = require("cors");
// to store sensitive data
const dotenv = require("dotenv");
// DB connection
const connectDB = require("./config/db");
//
// routes import
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");

// app creation and configuration
const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();

// for dev
const PORT = process.env.PORT || 3000;

// DB connection
connectDB();

// API routes
// test
app.get("/", (req, res) => {
  res.send("Welcome to EcommerceV2API");
});
// routes
// user routes
app.use("/api/users", userRoutes);
// product routes
app.use("/api/products", productRoutes);

// server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
