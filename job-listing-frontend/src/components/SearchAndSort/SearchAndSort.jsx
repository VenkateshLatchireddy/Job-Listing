import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SearchAndSort.css";

const skillsOptions = [
  "HTML", "CSS", "React.js", "JavaScript", "Node.js", "MySQL", "Express.js",
  "REST APIs", "Figma", "Adobe XD", "Wireframing", "Prototyping", "MongoDB",
  "TypeScript", "Redux", "GraphQL", "Bootstrap", "Tailwind CSS", "Material UI",
  "Git", "GitHub", "Docker", "Kubernetes", "AWS", "Firebase", "PostgreSQL",
  "Jest", "Cypress", "CI/CD", "WebSockets", "Next.js", "Flutter", "React Native",
  "Android Development", "iOS Development", "UI/UX Design", "Agile Methodology",
  "Scrum", "JIRA", "Trello", "Web Performance Optimization", "SEO", "Linux",
  "Python", "Django", "Flask", "PHP", "Laravel", "C++", "C#", ".NET", "Java",
  "Spring Boot", "Go", "Rust", "Cybersecurity", "Penetration Testing",
  "Blockchain", "Solidity", "Machine Learning", "Data Science", "TensorFlow",
  "PyTorch", "NLP", "Big Data", "Hadoop", "Power BI", "Tableau"
];

const SearchAndSort = ({ isLoggedIn, onFilter }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSkills, setSelectedSkills] = useState([]);
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    onFilter(newSearchTerm, selectedSkills); // 🔥 Call `onFilter` after updating search term
  };

  const handleSkillChange = (e) => {
    const selectedSkill = e.target.value;
    if (selectedSkill && !selectedSkills.includes(selectedSkill)) {
      const updatedSkills = [...selectedSkills, selectedSkill];
      setSelectedSkills(updatedSkills);
      onFilter(searchTerm, updatedSkills); // 🔥 Call `onFilter` after updating skills
    }
    e.target.value = "";
  };

  const removeSkill = (skillIndex) => {
    const updatedSkills = selectedSkills.filter((_, index) => index !== skillIndex);
    setSelectedSkills(updatedSkills);
    onFilter(searchTerm, updatedSkills); // 🔥 Call `onFilter` after removing a skill
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedSkills([]);
    onFilter("", []); // 🔥 Call `onFilter` with empty values
  };

  return (
    <div className="search-filter-container">
      <input
        type="text"
        placeholder="Search jobs..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="search-input"
      />

      <div className="filter-row">
        <select className="skills-dropdown" onChange={handleSkillChange}>
          <option value="">Select Skills</option>
          {skillsOptions.map((skill, index) => (
            <option key={index} value={skill}>{skill}</option>
          ))}
        </select>

        <div className="selected-skills">
          {selectedSkills.map((skill, index) => (
            <button class="custom-button-">
            <span key={index} class="skill-chip">{skill}</span>
            <span class="remove-skill" onClick={() => removeSkill(index)} >&#10005;</span>
          </button>
          ))}
        </div>

        <div className="buttons-container">
          {isLoggedIn ? (
            <button className="add-job-btn" onClick={() => navigate("/add-job")}>
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
