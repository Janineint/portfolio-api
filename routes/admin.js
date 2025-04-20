const express = require('express');
const router = express.Router();
const Project = require('../models/project');
const Skill = require('../models/skill');

// Admin Home
router.get('/index', (req, res) => {
  res.render('admin/index');
});

// Add Project Form
router.get('/projects/new', (req, res) => {
  res.render('admin/addProject');
});

router.post('/projects', async (req, res) => {
  const { title, description, image, link } = req.body;
  await Project.create({ title, description, image, link });
  res.redirect('/');
});

// Add Skill Form
router.get('/skills/new', (req, res) => {
  res.render('admin/addSkill');
});

router.post('/skills', async (req, res) => {
  const { name, level } = req.body;
  await Skill.create({ name, level });
  res.redirect('/');
});
// GET route to display all projects and skills
router.get('/portfolio', async (req, res) => {
  try {
    const projects = await Project.find();
    const skills = await Skill.find();
    res.render('admin/portfolio', { projects, skills });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching portfolio data");
  }
});

// GET route for project delete confirmation page
router.get('/project/:id/delete', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).send('Project not found');
    }
    res.render('admin/delete-confirm', {
      itemType: 'Project',
      itemName: project.title,
      itemId: project._id,
      deleteUrl: `/admin/project/${project._id}/delete`
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error finding project for deletion");
  }
});

// POST route to delete a project
router.post('/project/:id/delete', async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.redirect('/admin/portfolio');
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting project");
  }
});

// GET route for skill delete confirmation page
router.get('/skill/:id/delete', async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);
    if (!skill) {
      return res.status(404).send('Skill not found');
    }
    res.render('admin/delete-confirm', {
      itemType: 'Skill',
      itemName: skill.name,
      itemId: skill._id,
      deleteUrl: `/admin/skill/${skill._id}/delete`
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error finding skill for deletion");
  }
});

// POST route to delete a skill
router.post('/skill/:id/delete', async (req, res) => {
  try {
    await Skill.findByIdAndDelete(req.params.id);
    res.redirect('/admin/portfolio');
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting skill");
  }
});


module.exports = router;