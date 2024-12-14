const express = require('express');
const router = express.Router();
const SafetyReport = require('../models/SafetyReport');

// Create a new safety report
router.post('/', async (req, res) => {
  try {
    const safetyReport = new SafetyReport(req.body);
    await safetyReport.save();
    res.status(201).json(safetyReport);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all safety reports
router.get('/', async (req, res) => {
  try {
    const safetyReports = await SafetyReport.find();
    res.json(safetyReports);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a specific safety report
router.get('/:id', async (req, res) => {
  try {
    const safetyReport = await SafetyReport.findById(req.params.id);
    if (!safetyReport) return res.status(404).json({ message: 'Report not found' });

    res.json(safetyReport);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;