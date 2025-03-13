const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes"); // Correct the path if needed
const jobRoutes = require("./routes/jobRoutes"); // Import the jobRoutes
const app = express();

// Middleware
app.use(cors());
app.use(express.json());  // For parsing JSON data

// Use routes
app.use("/api/users", userRoutes); // Users routes
app.use("/api", jobRoutes); // Job routes

// Sync and start server
app.listen(5000, () => console.log("🚀 Server running on port 5000"));
