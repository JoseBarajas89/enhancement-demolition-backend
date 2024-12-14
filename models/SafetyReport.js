const mongoose = require('mongoose');

const SafetyReportSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  supervisorName: { type: String, required: true },
  projectName: { type: String, required: true },
  safetyConcerns: { type: String },
  complianceChecklist: {
    asbestos: { type: Boolean, default: false },
    lead: { type: Boolean, default: false },
    mold: { type: Boolean, default: false },
    demolition: { type: Boolean, default: false },
    sandblasting: { type: Boolean, default: false },
    floorGrinding: { type: Boolean, default: false },
  },
  correctiveActions: { type: String },
});

module.exports = mongoose.model('SafetyReport', SafetyReportSchema);