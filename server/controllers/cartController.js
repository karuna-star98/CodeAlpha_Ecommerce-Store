const mongoose = require('mongoose');
const Cart = require('../models/Cart');
const Product = require('../models/Product');

function calculateTotal(items) {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

async function getCart(req, res) {
  const cart = await Cart.findOne({ userId: req.user.id }).populate('items.productId');
  if (!cart) return res.json({ items: [], total: 0 });

  const items = cart.items
    .filter((item) => item.productId)
    .map((item) => ({
      product: item.productId,
      quantity: item.quantity,
      lineTotal: item.productId.price * item.quantity
    }));

  res.json({ items, total: calculateTotal(items.map((item) => ({ price: item.product.price, quantity: item.quantity }))) });
}

async function addItem(req, res) {
  const { productId, quantity = 1 } = req.body;
  if (!mongoose.isValidObjectId(productId)) {
    return res.status(400).json({ message: 'Invalid product reference' });
  }
  const parsedQuantity = Number(quantity);

  if (!productId || !Number.isInteger(parsedQuantity) || parsedQuantity < 1) {
    return res.status(400).json({ message: 'productId and a positive integer quantity are required' });
  }

  const product = await Product.findById(productId);
  if (!product) return res.status(404).json({ message: 'Product not found' });
  if (product.stock < parsedQuantity) {
    return res.status(400).json({ message: 'Requested quantity is not available in stock' });
  }

  let cart = await Cart.findOne({ userId: req.user.id });
  if (!cart) cart = await Cart.create({ userId: req.user.id, items: [] });

  const existing = cart.items.find((item) => item.productId.toString() === productId);
  const newQuantity = existing ? existing.quantity + parsedQuantity : parsedQuantity;

  if (newQuantity > product.stock) {
    return res.status(400).json({ message: `Only ${product.stock} item(s) available` });
  }

  if (existing) existing.quantity = newQuantity;
  else cart.items.push({ productId, quantity: parsedQuantity });

  await cart.save();
  res.status(201).json({ message: 'Item added to cart' });
}

async function updateItem(req, res) {
  if (!mongoose.isValidObjectId(req.params.productId)) {
    return res.status(400).json({ message: 'Invalid product reference' });
  }
  const { quantity } = req.body;
  const parsedQuantity = Number(quantity);

  if (!Number.isInteger(parsedQuantity) || parsedQuantity < 1) {
    return res.status(400).json({ message: 'Quantity must be a positive integer' });
  }

  const [cart, product] = await Promise.all([
    Cart.findOne({ userId: req.user.id }),
    Product.findById(req.params.productId)
  ]);

  if (!cart) return res.status(404).json({ message: 'Cart not found' });
  if (!product) return res.status(404).json({ message: 'Product not found' });
  if (parsedQuantity > product.stock) {
    return res.status(400).json({ message: `Only ${product.stock} item(s) available` });
  }

  const item = cart.items.find((entry) => entry.productId.toString() === req.params.productId);
  if (!item) return res.status(404).json({ message: 'Item not in cart' });

  item.quantity = parsedQuantity;
  await cart.save();
  res.json({ message: 'Cart updated' });
}

async function removeItem(req, res) {
  if (!mongoose.isValidObjectId(req.params.productId)) {
    return res.status(400).json({ message: 'Invalid product reference' });
  }
  const cart = await Cart.findOne({ userId: req.user.id });
  if (!cart) return res.status(404).json({ message: 'Cart not found' });

  const before = cart.items.length;
  cart.items = cart.items.filter((item) => item.productId.toString() !== req.params.productId);
  if (before === cart.items.length) return res.status(404).json({ message: 'Item not in cart' });

  await cart.save();
  res.json({ message: 'Item removed from cart' });
}

module.exports = { getCart, addItem, updateItem, removeItem };
