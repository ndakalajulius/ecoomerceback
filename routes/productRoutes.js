// productRoutes.js
const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/authMiddleware'); // Destructuring to get `auth`
const { createProduct, getAllProducts } = require('../controllers/productController');

// GET all products
router.get("/", getAllProducts);

// POST to create a product (requires auth)
router.post("/", auth, createProduct);

module.exports = router;
