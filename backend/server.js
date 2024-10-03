// server.js
const dotenv = require("dotenv");
const express = require("express");
const connectDB = require("./config/db.js");
const categoryRoutes = require("./routes/categoryRoutes.js");
const foodRoutes = require("./routes/foodRoutes.js");
const orderRoutes = require("./routes/orderRoutes.js");

dotenv.config({ path: ".env" });

const cors = require("cors");

const app = express();

// Middleware

app.use(cors());
app.use(express.json());
app.use("/api", categoryRoutes);
app.use("/api", foodRoutes);
app.use("/api", orderRoutes);

// Connect to database
connectDB();

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT);
