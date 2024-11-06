const express = require('express');
const { createOrder, getUserOrders } = require('../controllers/orderController');
const auth = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', auth, createOrder);
router.get('/', auth, getUserOrders);

module.exports = router;
