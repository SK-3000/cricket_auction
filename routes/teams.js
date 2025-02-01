// routes/teams.js
const express = require('express');
const router = express.Router();
const Team = require('../models/Team');
const authMiddleware = require('../middleware/authMiddleware');

// Update team profile
router.put('/:id', authMiddleware, async (req, res) => {
  const { name, logo } = req.body;

  try {
    const team = await Team.findById(req.params.id);
    if (!team) return res.status(404).json({ message: 'Team not found.' });

    team.name = name || team.name;
    team.logo = logo || team.logo;
    await team.save();

    res.json(team);
  } catch (error) {
    res.status(500).json({ message: 'Server error.' });
  }
});

module.exports = router;