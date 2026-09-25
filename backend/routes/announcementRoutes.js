const express = require('express');
const router = express.Router();
const Announcement = require('../models/Announcement');

// Get all announcements (GET)
router.get('/', async (req, res) => {
  try {
    const announcements = await Announcement.find().sort({ date: -1 });
    res.json(announcements);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Post a new announcement (POST)
router.post('/', async (req, res) => {
  try {
    const newAnnouncement = new Announcement(req.body);
    const saved = await newAnnouncement.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;