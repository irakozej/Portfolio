// models/Project.js
const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  short: { type: String, default: "" },
  long: { type: String, default: "" },
  tech: { type: [String], default: [] },
  image: { type: String, default: "" },
  repo: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Project", ProjectSchema);
