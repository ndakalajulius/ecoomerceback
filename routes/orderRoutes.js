const express = require('express');
const { createOrder, getUserOrders, updateOrderStatus } = require('../controllers/orderController');
const { auth, admin } = require('../middleware/authMiddleware'); // Import both auth and admin
const router = express.Router();

// Routes
router.post('/', auth, createOrder);
router.get('/', auth, getUserOrders);
router.put('/:id/status', auth, admin, updateOrderStatus); // Place this line before module.exports

module.exports = router;
