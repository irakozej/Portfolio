// controllers/projectController.js
const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const Project = require("../models/Project");
const auth = require("../middleware/auth");

// GET /api/projects
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// POST /api/projects (protected)
router.post(
  "/",
  auth,
  [
    body("title").notEmpty().withMessage("title is required"),
    body("short").optional().isString(),
    body("long").optional().isString(),
    body("tech").optional().isArray()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const data = {
        title: req.body.title,
        short: req.body.short || "",
        long: req.body.long || "",
        tech: req.body.tech || [],
        image: req.body.image || "",
        repo: req.body.repo || ""
      };
      const project = new Project(data);
      await project.save();
      res.status(201).json(project);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  }
);

// DELETE /api/projects/:id (protected)
router.delete("/:id", auth, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });
    await project.deleteOne();
    res.json({ message: "Project deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
