import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate instead of useHistory
import "./Navbar.css";
import ProfileIcon from "../../../src/assets/profile-icon.png"

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate(); // useNavigate hook for navigation

  // Handle login redirect
  const handleLoginRedirect = () => {
    navigate("/login");
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userId");
    setIsLoggedIn(false);
    navigate("/login", { replace: true }); // 🔥 Redirect to login page
  };
  


  // Handle dashboard redirect
  const handleDashboardRedirect = () => {
    navigate("/home"); // Redirect to dashboard or home page
  };

  return (
    <nav className="navbar">
      <h1 className="logo">JobStation</h1>
      <div className="nav-buttons">
        {isLoggedIn ? (
          <>
            <button className="logout-dashboard-btn" onClick={handleLogout}>Logout</button>
            <button className="logout-dashboard-btn" onClick={handleDashboardRedirect}>Dashboard</button>
            <img onClick={() => navigate("/profile")} className="profile-icon" src={ProfileIcon} alt="Profile" />
          </>
        ) : (
          <>
            <button className="login-btn" onClick={handleLoginRedirect}>Login</button>
            <button className="register-btn" onClick={() => navigate("/register")}>Register</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
