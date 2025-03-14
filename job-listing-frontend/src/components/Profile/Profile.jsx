import React, { useState, useEffect } from 'react';
import './Profile.css';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken"); // Retrieve token from localStorage
  
    if (!token) {
      setError("No token found, please log in");
      return; // Exit if no token found
    }
  
    // Fetch user data from the backend
    fetch('http://localhost:5000/api/users/profile', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,  // Send token in the Authorization header
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to fetch profile");
        }
      })
      .then(data => {
        setUser(data);  // Set the user data to the state
      })
      .catch((err) => {
        setError(err.message); // Set error message if any error occurs
      });
  }, []);
  

  return (
    <div className="profile-container">
      {error && <p>{error}</p>}
      {user ? (
        <div className="profile-card">
          <div className="profile-header">
            <h2>{user.name}</h2>
          </div>
          <div className="profile-details">
            <div className="detail">
              <label>Email:</label>
              <span>{user.email}</span>
            </div>
            <div className="detail">
              <label>Created At:</label>
              <span>{new Date(user.createdAt).toLocaleString()}</span>
            </div>
            <div className="detail">
              <label>Updated At:</label>
              <span>{new Date(user.updatedAt).toLocaleString()}</span>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Profile;
