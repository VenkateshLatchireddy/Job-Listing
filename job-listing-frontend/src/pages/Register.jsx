import React, { useState } from "react";
import "../styles/Register.css"; // Import external CSS file
import { useNavigate } from "react-router-dom";
import JobListingimg from "../assets/job-listing.jpg";

const Register = () => {
  const navigate = useNavigate();

  // State for form inputs
  const [formData, setFormData] = useState({
    name: "",  // Change 'username' to 'name'
    email: "",
    password: "",
    mobile: "",
    role: "user",
  });
  

  const [error, setError] = useState("");
  const [isChecked, setIsChecked] = useState(false); // ✅ Checkbox state

  // Handle input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setIsChecked(checked); // ✅ Handle checkbox separately
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Form validation
  const validateForm = () => {
    const { name, email, password, mobile } = formData; // Use 'name' instead of 'username'
  
    if (!name || !email || !password || !mobile) {
      return "All fields are required.";
    }
  
    if (!/\S+@\S+\.\S+/.test(email)) {
      return "Please enter a valid email address.";
    }
  
    if (password.length < 6) {
      return "Password must be at least 6 characters.";
    }
  
    if (!/^\d{10}$/.test(mobile)) {
      return "Please enter a valid 10-digit mobile number.";
    }
  
    if (!isChecked) {
      return "You must agree to the Terms of Use and Privacy Policy.";
    }
  
    return "";
  };
  

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset previous errors

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Account created successfully! You can now log in.");
        navigate("/login");
      } else {
        setError(data.message || "Something went wrong.");
      }
    } catch (err) {
      setError("Server error. Please try again.");
    }
  };

  return (
    <div className="register-page-container">
      <div className="registration-form-container">
        <h2>Create An Account</h2>
        <p>Your Personal Job Finder Is Here</p>

        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleSubmit}>
        <div className="input-group">
  <input
    type="text"
    name="name"  // Use 'name' here to match with backend
    placeholder="Username"
    value={formData.name}  // 'name' in the state
    onChange={handleChange}
    required
  />
</div>


          <div className="input-group">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <input
              type="tel"
              name="mobile"
              placeholder="Mobile"
              value={formData.mobile}
              onChange={handleChange}
              required
            />
          </div>

          <div className="terms-container">
            <input
              type="checkbox"
              id="terms"
              checked={isChecked}
              onChange={handleChange}
              className="checkbox"
            />
            <label htmlFor="terms" className="terms-text">
              By creating an account, I agree to our Terms of Use and privacy Policy
            </label>
          </div>

          <button className="create-account-button" type="submit">
            Create Account
          </button>
        </form>

        <p className="signin-text" onClick={() => navigate("/login")}>
          Already have an account? <a href="#">Sign In</a>
        </p>
      </div>

      <div className="registration-image">
        <img src={JobListingimg} alt="Login Visual" />
      </div>
    </div>
  );
};

export default Register;
