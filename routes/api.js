const express = require('express');
const router = express.Router();
const Project = require('../models/project'); //
const Skill = require('../models/skill');
const Contact = require('../models/contact') //
// Make sure body-parser middleware is configured in app.js to handle JSON request bodies
// Example: app.use(express.json()); or app.use(bodyParser.json());

// --- Project API Endpoints ---

// GET all projects
router.get('/projects', async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    console.error("Error fetching projects:", err);
    res.status(500).json({ message: "Error fetching projects", error: err.message });
  }
});

// POST (add) a new project
router.post('/projects', async (req, res) => {
  try {
    // Extract project details from request body
    const { title, description, image, link } = req.body;

    // Basic validation (you might want more robust validation)
    if (!title || !description) {
      return res.status(400).json({ message: 'Missing required fields: title and description' });
    }

    const newProject = new Project({
      title,
      description,
      image, // optional based on schema
      link   // optional based on schema
    });

    const savedProject = await newProject.save();
    res.status(201).json(savedProject); // 201 Created status

  } catch (err) {
    console.error("Error adding project:", err);
    res.status(500).json({ message: "Error adding project", error: err.message });
  }
});

// DELETE a project by ID
router.delete('/projects/:id', async (req, res) => {
  try {
    const projectId = req.params.id;
    const deletedProject = await Project.findByIdAndDelete(projectId);

    if (!deletedProject) {
      return res.status(404).json({ message: 'Project not found with that ID' });
    }

    // Successfully deleted
    res.status(200).json({ message: 'Project deleted successfully', deletedProject });
    // Alternatively, send a 204 No Content status without a body:
    // res.status(204).send();

  } catch (err) {
    console.error("Error deleting project:", err);
    // Handle potential invalid ObjectId format errors
    if (err.name === 'CastError') {
        return res.status(400).json({ message: 'Invalid Project ID format' });
    }
    res.status(500).json({ message: "Error deleting project", error: err.message });
  }
});


// --- Skill API Endpoints ---

// GET all skills
router.get('/skills', async (req, res) => {
  try {
    const skills = await Skill.find();
    res.json(skills);
  } catch (err) {
    console.error("Error fetching skills:", err);
    res.status(500).json({ message: "Error fetching skills", error: err.message });
  }
});

// POST (add) a new skill
router.post('/skills', async (req, res) => {
  try {
    // Extract skill details from request body
    const { name, level } = req.body;

    // Basic validation
    if (!name || !level) {
      return res.status(400).json({ message: 'Missing required fields: name and level' });
    }

    const newSkill = new Skill({
      name,
      level
    }); //

    const savedSkill = await newSkill.save();
    res.status(201).json(savedSkill); // 201 Created status

  } catch (err) {
    console.error("Error adding skill:", err);
    res.status(500).json({ message: "Error adding skill", error: err.message });
  }
});

// DELETE a skill by ID
router.delete('/skills/:id', async (req, res) => {
  try {
    const skillId = req.params.id;
    const deletedSkill = await Skill.findByIdAndDelete(skillId);

    if (!deletedSkill) {
      return res.status(404).json({ message: 'Skill not found with that ID' });
    }

    // Successfully deleted
    res.status(200).json({ message: 'Skill deleted successfully', deletedSkill });
    // Alternatively, send a 204 No Content status without a body:
    // res.status(204).send();

  } catch (err) {
    console.error("Error deleting skill:", err);
    // Handle potential invalid ObjectId format errors
    if (err.name === 'CastError') {
        return res.status(400).json({ message: 'Invalid Skill ID format' });
    }
    res.status(500).json({ message: "Error deleting skill", error: err.message });
  }
});

router.post('/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Basic validation (Mongoose schema validation also applies)
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Missing required fields: name, email, and message' });
    }

    const newContactMessage = new Contact({
      name,
      email,
      message
    });

    await newContactMessage.save();
    res.status(201).json({ message: 'Message received successfully!' });

  } catch (err) {
    console.error("Error saving contact message:", err);
    // Handle Mongoose validation errors specifically
    if (err.name === 'ValidationError') {
        return res.status(400).json({ message: 'Validation failed', errors: err.errors });
    }
    res.status(500).json({ message: 'Failed to save message.', error: err.message });
  }
});

module.exports = router;