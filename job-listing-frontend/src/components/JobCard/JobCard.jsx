import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, Users, IndianRupee, Flag, Clock, Briefcase } from 'lucide-react';
import './JobCard.css';
import indianflag from "../../assets/indian-flag.avif";

const JobCard = ({

  id,
  companyName,
  companyLogo,
  jobPosition,
  hiringCount,
  monthlySalary,
  jobType,
  workType,
  location,
  skillsRequired,
  remote_office, // Updated to reflect the new column name
}) => {
  const navigate = useNavigate();
  console.log("Job ID:", id);

  // Assuming skills are comma-separated
  const skills = skillsRequired.split(',');
  console.log("JobType in JobCard:", jobType);

  
  return (
    <div className="jobstation-job-card">
      <div className="jobstation-job-card-container">
        <div className="jobstation-company-logo-container">
          <img src={companyLogo} alt={companyName} className="jobstation-company-logo" />
        </div>

        <div className="jobstation-job-details-container">
          <div className="jobstation-job-header">
            <div>
              <h2 className="jobstation-job-title">{jobPosition}</h2>
              <div className="jobstation-job-info">
                <div className="jobstation-detail-item">
                  <Users className="jobstation-detail-icon" />
                  <span className="jobstation-detail-text">{hiringCount}</span>
                </div>
                <div className="jobstation-detail-item">
                  <IndianRupee className="jobstation-detail-icon" />
                  <span className="jobstation-detail-text">₹{monthlySalary || 'N/A'}</span>
                </div>
              </div>
              <div className="jobstation-job-info-bottom">
                <div className="jobstation-work-info">
                  <div className="jobstation-detail-item">
                    <Briefcase className="jobstation-detail-icon" />
                    <span className="jobstation-detail-text">{remote_office}</span>
                  </div>
                  <div className="jobstation-detail-item">
                    <Clock className="jobstation-detail-icon" />
                    <span className="jobstation-detail-text">{jobType || 'Not Available'}</span>
                    </div>
                </div>
              </div>
            </div>
          </div>
          <div className="jobstation-location-info">
            <img 
              src={indianflag} 
              alt="Indian Flag" 
              className="jobstation-detail-icon"
              width="20"
              height="15"
            />
            <span className="jobstation-detail-text">{location}</span>
          </div>
        </div>

        <div className="jobstation-skills-container">
          <div className="jobstation-skills-list">
            {skills.map((skill, index) => (
              <span key={index} className="jobstation-skill-tag">{skill}</span>
            ))}
          </div>
          {/* Redirect to JobDetails page when clicked */}
          <button className="jobstation-view-details-btn" onClick={() => navigate(`/job/${id}`)}>
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
