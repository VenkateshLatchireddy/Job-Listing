const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const auth = require("../middleware/auth");  // Import your authentication middleware

const router = express.Router();

// Register route (handle POST requests)
router.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashedPassword });
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Login route (handle POST requests)
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
  
        // Include the userId in the response
        res.json({ token, userId: user.id });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
  });
  

// Get user profile (Authenticated route)
router.get("/profile", auth, async (req, res) => {
    try {
        // Use the user ID from the decoded token
        const user = await User.findByPk(req.user.id);  // Assuming user ID is stored in the token

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Return user details
        res.json({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
