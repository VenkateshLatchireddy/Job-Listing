import React, { useState } from "react";
import "../styles/Login.css"; // Import external CSS file
import { useNavigate } from "react-router-dom";
import JobListingimg from "../assets/job-listing.jpg";

const Login = ({ setIsLoggedIn }) => {
    const navigate = useNavigate();

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

            if (response.ok) {
                const token = data.token; // Get token from API response
                console.log("Token received:", token);

                // Store the token in localStorage
                localStorage.setItem("accessToken", token);

                console.log("Stored Token:", localStorage.getItem("accessToken"));

                // Fetch protected data after login
                fetchProtectedData(token);

                // Update login state in App.js
                setIsLoggedIn(true);
                navigate("/"); // Redirect to home or dashboard
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

                <p className="signup-text" onClick={handleSignupRedirect}>
                    Don't have an account? <a href="#">Sign Up</a>
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
