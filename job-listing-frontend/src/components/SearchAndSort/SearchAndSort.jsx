import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SearchAndSort.css";

const skillsOptions = ["HTML", "CSS", "SQLite", "Python", "JavaScript", "Node Js", "React Js", "Express Js"];

const SearchAndSort = ({ isLoggedIn, onFilter }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSkills, setSelectedSkills] = useState([]);
  const navigate = useNavigate();

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle skill selection
  const handleSkillChange = (e) => {
    const selectedSkill = e.target.value;
    if (selectedSkill && !selectedSkills.includes(selectedSkill)) {
      setSelectedSkills([...selectedSkills, selectedSkill]);
    }
    e.target.value = "";
  };

  // Remove a skill
  const removeSkill = (skillIndex) => {
    setSelectedSkills(selectedSkills.filter((_, index) => index !== skillIndex));
  };

  // Clear selected skills
  const clearSkills = () => {
    setSelectedSkills([]);
  };

  // Clear filters
  const clearFilters = () => {
    setSearchTerm("");
    setSelectedSkills([]);
  };

  // Redirect to Add Job Page
  const handleAddJob = () => {
    navigate("/add-job"); // Make sure your route for AddJobDetails is '/add-job'
  };

  return (
    <div className="search-filter-container">
      <input
        type="text"
        placeholder="Search jobs by title, company, or keywords..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="search-input"
      />

      <div className="filter-row">
        <select className="skills-dropdown" onChange={handleSkillChange}>
          <option value="">Select Skills</option>
          {skillsOptions.map((skill, index) => (
            <option key={index} value={skill}>
              {skill}
            </option>
          ))}
        </select>

        <div className="selected-skills">
          {selectedSkills.map((skill, index) => (
            <span key={index} className="skill-chip-container">
              <span className="skill-chip">
                {skill} <span className="remove-skill" onClick={() => removeSkill(index)}>✖</span>
              </span>
            </span>
          ))}
          {isLoggedIn && selectedSkills.length > 0 && (
            <button className="clear-skills-btn" onClick={clearSkills}>
              Clear Skills
            </button>
          )}
        </div>

        <div className="buttons-container">
          {isLoggedIn ? (
            <button className="add-job-btn" onClick={handleAddJob}>
              + Add Job
            </button>
          ) : (
            <>
              <button className="apply-filter-btn" onClick={() => onFilter(searchTerm, selectedSkills)}>
                Apply Filter
              </button>
              <button className="clear-filters" onClick={clearFilters}>
                Clear Filters
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchAndSort;
