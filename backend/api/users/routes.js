const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("./models");

router.post("/register", async (req, res) => {
    try {
        const { username, password } = req.body;
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ data: "User already exists" });
        }
        const user = new User({ username, password });
        await user.save();
        res.status(201).json({ data: "User registered successfully" });
    } catch (err) {
        res.status(500).json({ data: err.message });
    }
});

router.post("/login", passport.authenticate("local"), (req, res) => {
    res.json({ data: "Login successful", user: req.user.username });
});

router.post("/logout", (req, res) => {
    req.logout((err) => {
        if (err) {
            return res.status(500).json({ data: err.message });
        }
        res.json({ data: "Logout successful" });
    });
});

router.get("/profile", (req, res) => {
    if (!req.isAuthenticated()) {
        return res.status(401).json({ data: "Not authenticated" });
    }
    res.json({ data: req.user });
});

module.exports = router;
