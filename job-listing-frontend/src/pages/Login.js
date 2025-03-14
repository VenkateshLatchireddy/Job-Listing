import React, { useState } from "react";
import "../styles/Login.css"; // Import external CSS file
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import JobListingimg from "../assets/job-listing.jpg";

const Login = ({ setIsLoggedIn, fetchJobs }) => {
    const navigate = useNavigate();

    useEffect(() => {
        // Prevent back navigation to logged-in session
        window.history.pushState(null, "", window.location.href);
        window.onpopstate = () => {
            navigate("/", { replace: true }); // Redirect to home when back button is pressed
        };
    }, []);

    // State for form inputs and error message
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    // Handle input change
    const handleChange = (e) => {
        if (e.target.name === "email") {
            setEmail(e.target.value);
        } else if (e.target.name === "password") {
            setPassword(e.target.value);
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
    
        try {
            const response = await fetch("http://localhost:5000/api/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });
    
            const data = await response.json();
            console.log("API Response Data:", data); // Log entire response
    
            if (response.ok) {
                const token = data.token; // Get token from API response
                const userId = data.userId; // Get userId from API response
    
                if (!userId) {
                    console.error("User ID is undefined in the response!");
                    return;
                }
    
                console.log("Token received:", token);
                console.log("User ID received:", userId);
    
                // Store the token and userId in localStorage
                localStorage.setItem("accessToken", token);
                localStorage.setItem("userId", userId); // Store userId
    
                console.log("Stored Token:", localStorage.getItem("accessToken"));
                console.log("Stored User ID:", localStorage.getItem("userId"));
    
                // Fetch protected data after login
                fetchProtectedData(token);
    
                // Update login state in App.js
                setIsLoggedIn(true);
                navigate("/"); // Redirect to home or dashboard
                
                // Call fetchJobs to update job listing after login
                fetchJobs();  // This will fetch jobs after successful login
            } else {
                setError(data.message || "Invalid credentials");
            }
        } catch (err) {
            setError("Server error. Please try again.");
            console.error(err);
        }
    };

    // Fetch data from a protected route after login
    const fetchProtectedData = (token) => {
        fetch("http://localhost:5000/api/protected-route", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        })
        .then(response => response.json())
        .then(data => console.log("Protected Route Data:", data))
        .catch(error => console.error("Error fetching protected data:", error));
    };

    const handleSignupRedirect = () => {
        navigate("/register");
    };

    return (
        <div className="login-container">
            {/* Left Column - Login Form */}
            <div className="login-form">
                <h2>Already Have An Account?</h2>
                <p>Your Personal Job Finder</p>

                {error && <p className="error-message">{error}</p>}

                <div className="form-group">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={password}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button className="sign-in-btn" onClick={handleSubmit}>
                    Sign In
                </button>

                <p className="signup-text">
                    Don't have an account?{" "}
                    <span onClick={handleSignupRedirect} className="signup-link">Sign Up</span>
                </p>

            </div>

            {/* Right Column - Image */}
            <div className="login-image">
                <img src={JobListingimg} alt="Login Visual" />
            </div>
        </div>
    );
};

export default Login;
