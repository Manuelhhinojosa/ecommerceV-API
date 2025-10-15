// dependencies
const express = require("express");

// router
const router = express.Router();

// middleware functions
const { protect } = require("../middleware/authMiddleware");

// controllers
// User cotrollers functions
const userControllers = require("../controllers/userControllers");

// routes
//
// user registration route
router.post("/register", userControllers.registerUser);
// user login route
router.post("/login", userControllers.userLogin);
// get one user || profile route
router.get("/profile", protect, userControllers.getOneUser);

module.exports = router;
