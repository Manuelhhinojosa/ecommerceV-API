// dependencies
const express = require("express");

// middleware functions
const { protect, admin } = require("../middleware/authMiddleware");

// router
const router = express.Router();

// controllers
// Product cotrollers functions
const productControllers = require("../controllers/productControllers");

// routes
//
// create a new product route
router.post(
  "/createproduct",
  protect,
  admin,
  productControllers.createOneProduct
);

module.exports = router;
