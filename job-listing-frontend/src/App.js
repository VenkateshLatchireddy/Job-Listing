import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbar/Navbar';
import SearchAndSort from './components/SearchAndSort/SearchAndSort';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import JobListing from './components/JobListing/JobListing';
import AddJobDetails from './components/AddJobDescription/AddJobDescription';
import JobDetails from './components/JobDetails/JobDetails';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation(); // Get current route

  // Check if user is logged in when the app loads
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  // Hide Navbar on specific pages
  const hideNavbarOnPages = ["/login", "/register", "/add-job"];

  // Hide SearchAndSort and JobListing on JobDetails page
  const hideSearchAndJobsOnPages = ["/add-job","/login", "/register"];
  
  // We check for '/job/' in the location.pathname, which means the user is on a JobDetails page
  const isJobDetailsPage = location.pathname.startsWith("/job/");

  return (
    <>
      <ToastContainer />

      {/* Show Navbar only if not on login, register, or add-job page */}
      {!hideNavbarOnPages.includes(location.pathname) && (
        <div className="navbar-container">
          <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        </div>
      )}

      <div className="app-main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/add-job" element={<AddJobDetails />} />
          <Route path="/job/:id" element={<JobDetails />} />  {/* JobDetails route */}
        </Routes>

        {/* Show SearchAndSort and JobListing only if NOT on JobDetails page */}
        {!isJobDetailsPage && !hideSearchAndJobsOnPages.includes(location.pathname) && (
          <div className="job-listing-container">
            <SearchAndSort isLoggedIn={isLoggedIn} />
            <JobListing />
          </div>
        )}
      </div>
    </>
  );
}

export default App;
