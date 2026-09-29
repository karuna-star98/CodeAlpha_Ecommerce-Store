const mongoose = require('mongoose');
const Product = require('../models/Product');

async function listProducts(req, res) {
  const { search, category } = req.query;
  const filter = {};

  if (search) filter.name = { $regex: search.trim(), $options: 'i' };
  if (category && category !== 'All') filter.category = category;

  const products = await Product.find(filter).sort({ createdAt: -1 });
  res.json(products);
}

async function getProduct(req, res) {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(404).json({ message: 'Product not found' });
  }
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json(product);
}

module.exports = { listProducts, getProduct };
