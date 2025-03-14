import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbar/Navbar';
import SearchAndSort from './components/SearchAndSort/SearchAndSort';
import JobListing from './components/JobListing/JobListing';
import AddJobDetails from './components/AddJobDescription/AddJobDescription';
import JobDetails from './components/JobDetails/JobDetails';
import Profile from './components/Profile/Profile';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [jobs, setJobs] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('accessToken'); // Change to 'accessToken'
    if (token) setIsLoggedIn(true);
    fetchJobs(); // Fetch jobs on mount
  }, []);

  // 🔥 Fetch jobs with filters
  const fetchJobs = async (searchTerm = "", skills = []) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/jobs`, {
        params: { searchTerm, skills: skills.join(",") },
      });
      setJobs(response.data.jobs); // 🔥 Update job list
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  const hideNavbarOnPages = ["/login", "/register", "/add-job"];
  const hideSearchAndJobsOnPages = ["/add-job", "/login", "/register", "/profile"];
  const isJobDetailsPage = location.pathname.startsWith("/job/");

  return (
    <>
      <ToastContainer />
      {!hideNavbarOnPages.includes(location.pathname) && (
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      )}

      <div className="app-main-content">
        <Routes>
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} fetchJobs={fetchJobs} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/add-job" element={isLoggedIn ? <AddJobDetails /> : <Navigate to="/login" />} />
          <Route path="/job/:id" element={<JobDetails />} />
          <Route path="/profile" element={isLoggedIn ? <Profile /> : <Navigate to="/login" />} />
        </Routes>

        {!isJobDetailsPage && !hideSearchAndJobsOnPages.includes(location.pathname) && (
          <div className="job-listing-container">
            <SearchAndSort isLoggedIn={isLoggedIn} onFilter={fetchJobs} />
            <JobListing jobs={jobs} />
          </div>
        )}
      </div>
    </>
  );
}

export default App;
