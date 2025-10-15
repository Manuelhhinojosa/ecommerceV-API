// dependencies
const express = require("express");

// router
const router = express.Router();

// middleware functions
const { protect } = require("../middleware/authMiddleware");

// controllers
// User cotrollers functions
const userControllers = require("../controllers/userControllers");

// registration route
router.post("/register", userControllers.registerUser);
// login route
router.post("/login", userControllers.userLogin);
// get one user
router.get("/profile", protect, userControllers.getOneUser);

module.exports = router;
