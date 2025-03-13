const express = require('express');
const { Job } = require('../models'); // Ensure Job model is correctly imported
const { jobValidation } = require('../middleware/validation');
const auth = require('../middleware/auth');
const { validationResult } = require('express-validator');
const router = express.Router();

// POST route to create a job
router.post('/jobs', [auth, jobValidation], async (req, res) => {
  console.log("Received Data:", JSON.stringify(req.body, null, 2));

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {
    companyName,
    companyLogo,        
    jobPosition,
    jobDescription,
    location,
    monthlySalary,
    jobType,
    remote_office,
    skillsRequired,
    aboutCompany,      // ✅ Required field
    hiringCount,       // ✅ Required field
    additionalInfo,    // ✅ Nullable but included
  } = req.body;

  try {
    const newJob = await Job.create({
      companyName,
      companyLogo,
      jobPosition,
      jobDescription,
      location,
      monthlySalary,
      jobType,
      remote_office,
      aboutCompany,
      skillsRequired: Array.isArray(skillsRequired) ? skillsRequired.join(', ') : skillsRequired, // Convert array to string
      additionalInfo,
      hiringCount,
      userId: req.user.id,  
    });
    

    res.json(newJob);
   } catch (err) {
      console.error("Error creating job:", err.message);
      res.status(500).json({ error: "Internal Server Error", message: err.message });
    }
});


// GET route to fetch all jobs
router.get('/jobs', async (req, res) => {
  try {
    console.log("Fetching jobs...");
    const jobs = await Job.findAll(); // Get all jobs from DB
    console.log("Jobs fetched:", jobs);
    res.json(jobs); // Ensure all the fields (including new ones) are returned
  } catch (err) {
    console.error("Error fetching jobs:", err.message);  // Log the error message
    res.status(500).send('Server error');
  }
});

// GET route to fetch a single job by ID
router.get('/jobs/:id', async (req, res) => {
  try {
    const job = await Job.findByPk(req.params.id); // Find job by ID
    if (!job) {
      return res.status(404).json({ msg: 'Job not found' }); // Handle case where job doesn't exist
    }
    res.json(job); // Return the full job object with all details
  } catch (err) {
    console.error("Error fetching job details:", err.message); // Log error details
    res.status(500).send('Server error');
  }
});

// PUT route to update a job listing
router.put('/jobs/:id', [auth, jobValidation], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {
    companyName,
    companyLogo,           // New field for logo
    jobPosition,
    jobDescription,
    location,
    monthlySalary,        // Updated field to monthlySalary
    jobType,
    remote_office,         // Updated field name
    skillsRequired,
  } = req.body;

  try {
    const job = await Job.findByPk(req.params.id); // Find job by ID
    if (!job || job.userId !== req.user.id) {
      return res.status(404).json({ msg: 'Job not found or unauthorized' }); // Unauthorized if user doesn't own the job
    }

    // Update the job with provided data (if any)
    job.companyName = companyName || job.companyName;
    job.companyLogo = companyLogo || job.companyLogo;  // Update company logo
    job.jobPosition = jobPosition || job.jobPosition;
    job.jobDescription = jobDescription || job.jobDescription;
    job.location = location || job.location;
    job.monthlySalary = monthlySalary || job.monthlySalary;  // Use monthlySalary here
    job.jobType = jobType || job.jobType;
    job.remote_office = remote_office || job.remote_office; // Update remote_office
    job.skillsRequired = skillsRequired || job.skillsRequired;

    await job.save(); // Save updated job data
    res.json(job);
  } catch (err) {
    console.error("Error updating job:", err.message); // Enhanced error message
    res.status(500).send('Server error');
  }
});

// DELETE route to delete a job
router.delete('/jobs/:id', auth, async (req, res) => {
  try {
    const job = await Job.findByPk(req.params.id); // Find job by ID
    if (!job || job.userId !== req.user.id) {
      return res.status(404).json({ msg: 'Job not found or unauthorized' }); // Unauthorized if user doesn't own the job
    }

    await job.destroy(); // Delete job from DB
    res.json({ msg: 'Job deleted' });
  } catch (err) {
    console.error("Error deleting job:", err.message); // Enhanced error message
    res.status(500).send('Server error');
  }
});

module.exports = router;
