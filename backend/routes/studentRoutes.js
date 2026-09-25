const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

// Register a new student (POST)
router.post('/register', async (req, res) => {
  try {
    const newStudent = new Student(req.body);
    const savedStudent = await newStudent.save();
    res.status(201).json(savedStudent);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Fetch student profile by KU ID (GET)
router.get('/:kuId', async (req, res) => {
  try {
    const student = await Student.findOne({ kuId: req.params.kuId });
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update student profile (PUT)
router.put('/:kuId', async (req, res) => {
  try {
    const updatedStudent = await Student.findOneAndUpdate(
      { kuId: req.params.kuId },
      req.body,
      { new: true }
    );
    res.json(updatedStudent);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;