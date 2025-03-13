import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Clock, MapPin, IndianRupee, Calendar, Building2 } from 'lucide-react';
import './JobDetails.css';

const SkillBadge = ({ skill }) => (
  <span className="jobdetails-skill-badge">{skill}</span> // Make sure to match the class name
);

function JobDetails() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/jobs/${id}`)
      .then(response => {
        setJob(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching job details:", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!job) return <div>Job not found</div>;

  return (
    <div className="jobdetails-wrapper">
      <div className="jobdetails-container">
        <div className="jobdetails-card">
          <div className="jobdetails-header">
            <div className="jobdetails-meta">
              <Clock className="jobdetails-icon" />
              <span>Posted {new Date(job.createdAt).toLocaleDateString()}</span>
              <span className="jobdetails-separator">•</span>
              <span>{job.jobType}</span>
            </div>
            <h1 className="jobdetails-title">{job.jobPosition}</h1>
            <div className="jobdetails-location">
              <MapPin className="jobdetails-icon" />
              <span>{job.location}</span>
            </div>
          </div>

          <div className="jobdetails-section">
            <div className="jobdetails-grid">
              <div className="jobdetails-detail">
                <p className="jobdetails-detail-label">Monthly Salary:</p>
                <p className="jobdetails-detail-text">₹{job.monthlySalary}</p>
              </div>
              <div className="jobdetails-detail">
                <p className="jobdetails-detail-label">Duration:</p>
                <p className="jobdetails-detail-text">6 Months</p>
              </div>
            </div>
          </div>

          <div className="company-info">
            <h2>About the company</h2>
            <p>{job.aboutCompany}</p>
          </div>

          <div className="jobdetails-description">
            <h2>About the job/internship</h2>
            <p>{job.jobDescription}</p>
            <h3>Responsibilities:</h3>
            <ul className="jobdetails-list">
              <li>Work on the development of theme customization</li>
              <li>Implement system integrations</li>
              <li>Contribute to the development of HTML5/CSS/JavaScript</li>
              <li>Optimize for mobile-friendly websites</li>
            </ul>
          </div>

          <div className="skills-required">
            <h2>Skills Required</h2>
            <div className="jobdetails-skills-container">
              {job.skillsRequired.split(',').map((skill, index) => (
                <SkillBadge key={index} skill={skill} />
              ))}
            </div>
          </div>

          <div className="additional-info">
            <h2>Additional Information</h2>
            <p>{job.additionalInfo}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobDetails;
