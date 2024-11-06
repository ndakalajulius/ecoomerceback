const express = require('express');
const { getAllProducts, createProduct } = require('../controllers/productController');
const auth = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', getAllProducts);
router.post('/', auth, createProduct);

module.exports = router;
