// server.js
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const projectController = require("./controllers/projectController");
const authController = require("./controllers/authController");

const app = express();
const port = process.env.PORT || 4000;

app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN || "*" // restrict in production
}));
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api/auth", authController);
app.use("/api/projects", projectController);

// Basic home route
app.get("/", (req, res) => res.send("Portfolio API is running"));

// Connect to MongoDB and start server
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("✅ Connected to MongoDB");
  app.listen(port, () => console.log(`🚀 Server listening on port ${port}`));
}).catch(err => {
  console.error("MongoDB connection error:", err);
  process.exit(1);
});
