const Order = require('../models/Order');
const Product = require('../models/Product');

exports.createOrder = async (req, res) => {
  const { items } = req.body;
  try {
    // Calculate total
    let totalAmount = 0;
    for (const item of items) {
      const product = await Product.findById(item.product);
      if (product && product.stock >= item.quantity) {
        totalAmount += product.price * item.quantity;
      } else {
        return res.status(400).json({ message: 'Invalid product or insufficient stock' });
      }
    }

    const order = new Order({
      user: req.user,
      items,
      totalAmount
    });

    await order.save();
    res.json(order);
  } catch (error) {
    res.status(500).send('Server error');
  }
};

exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user }).populate('items.product');
    res.json(orders);
  } catch (error) {
    res.status(500).send('Server error');
  }
};

exports.updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    order.status = status;
    await order.save();
    res.json(order);
  } catch (error) {
    res.status(500).send('Server error');
  }
};
