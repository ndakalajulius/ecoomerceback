const Product = require('../models/Product');

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).send('Server error');
  }
};

exports.createProduct = async (req, res) => {
  const { name, description, price, stock } = req.body;
  try {
    const product = new Product({ name, description, price, stock });
    await product.save();
    res.json(product);
  } catch (error) {
    res.status(500).send('Server error');
  }
};
