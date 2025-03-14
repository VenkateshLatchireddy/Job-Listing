import React from 'react';
import JobCard from '../JobCard/JobCard';

const JobListing = ({ jobs }) => {
  return (
    <div>
      {jobs.length > 0 ? (
        jobs.map((job) => <JobCard key={job.id} {...job} />)
      ) : (
        <p>No jobs found.</p>
      )}
    </div>
  );
};

export default JobListing;
