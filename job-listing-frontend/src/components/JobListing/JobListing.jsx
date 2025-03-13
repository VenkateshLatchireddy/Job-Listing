import React, { useEffect, useState } from 'react';
import JobCard from '../JobCard/JobCard'; // Import JobCard component
import axios from 'axios'; // Import axios to make API calls

const JobListing = () => {
  const [jobs, setJobs] = useState([]); // State to store jobs

  useEffect(() => {
    // Fetch job listings from backend when the component mounts
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/jobs'); // Make GET request to fetch jobs
        console.log(response.data); // Log the response to see if the id is there
        setJobs(response.data); // Store the fetched job data in state
      } catch (error) {
        console.error("Error fetching jobs:", error); // Handle any errors during the fetch
      }
    };

    fetchJobs(); // Call the fetch function
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  return (
    <div>
      {jobs.length > 0 ? (
        // Map over the jobs array and display each job using the JobCard component
        jobs.map((job) => (
          <JobCard
            key={job.id}
            id={job.id}  // Make sure the id is being passed correctly
            companyName={job.companyName}
            companyLogo={job.companyLogo}
            jobPosition={job.jobPosition}
            hiringCount={job.hiringCount}
            monthlySalary={job.monthlySalary}
            jobType={job.jobType}
            workType={job.remote_office === 'remote' ? 'Remote' : 'On-Site'}
            location={job.location}
            skillsRequired={job.skillsRequired}
          />
        ))
      ) : (
        <p>No jobs available.</p>
      )}
    </div>
  );
};

export default JobListing;
