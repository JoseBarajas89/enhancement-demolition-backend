// Import required modules
const express = require('express');
const mongoose = require('mongoose');

// Initialize the app
const app = express();

// Middleware to parse JSON
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb+srv://enhancementdemolition:Bravo1726@cluster1.fhe3a.mongodb.net/enhancementdemolition?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Define Job schema and model
const jobSchema = new mongoose.Schema({
  jobName: { type: String, required: true },
  location: { type: String, required: true },
  status: { type: String, required: true, default: 'Pending' },
  createdAt: { type: Date, default: Date.now },
});

const Job = mongoose.model('Job', jobSchema);

// Routes
// Default route
app.get('/', (req, res) => {
  res.send('Welcome to Enhancement Demolition App!');
});

// Route to create a new job
app.post('/jobs', async (req, res) => {
  try {
    console.log('Received data:', req.body); // Debugging log

    // Create a new job from the request body
    const job = new Job(req.body);

    // Save the job to the database
    await job.save();

    // Respond with the created job
    res.status(201).json({
      message: 'Job created successfully!',
      job,
    });
  } catch (err) {
    console.error('Error creating job:', err); // Debugging log
    res.status(400).json({
      error: err.message,
    });
  }
});

// Route to get all jobs
app.get('/jobs', async (req, res) => {
  try {
    const jobs = await Job.find();
    res.status(200).json(jobs);
  } catch (err) {
    console.error('Error fetching jobs:', err);
    res.status(500).json({
      error: err.message,
    });
  }
});

// Route to update a job by ID
app.put('/jobs/:id', async (req, res) => {
  try {
    const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedJob) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.status(200).json({
      message: 'Job updated successfully!',
      updatedJob,
    });
  } catch (err) {
    console.error('Error updating job:', err);
    res.status(400).json({
      error: err.message,
    });
  }
});

// Route to delete a job by ID
app.delete('/jobs/:id', async (req, res) => {
  try {
    const deletedJob = await Job.findByIdAndDelete(req.params.id);
    if (!deletedJob) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.status(200).json({
      message: 'Job deleted successfully!',
      deletedJob,
    });
  } catch (err) {
    console.error('Error deleting job:', err);
    res.status(400).json({
      error: err.message,
    });
  }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});