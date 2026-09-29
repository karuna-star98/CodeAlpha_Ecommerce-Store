const mongoose = require('mongoose');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const Order = require('../models/Order');

async function createOrder(req, res) {
  const { shippingAddress } = req.body;
  if (!shippingAddress || shippingAddress.trim().length < 10) {
    return res.status(400).json({ message: 'A valid shipping address is required' });
  }

  const cart = await Cart.findOne({ userId: req.user.id });
  if (!cart || cart.items.length === 0) {
    return res.status(400).json({ message: 'Your cart is empty' });
  }

  const orderItems = [];
  let totalAmount = 0;

  for (const cartItem of cart.items) {
    const product = await Product.findById(cartItem.productId);
    if (!product) {
      return res.status(400).json({ message: 'A product in your cart is no longer available' });
    }
    if (cartItem.quantity > product.stock) {
      return res.status(400).json({ message: `Insufficient stock for ${product.name}` });
    }

    orderItems.push({
      productId: product._id,
      name: product.name,
      price: product.price,
      quantity: cartItem.quantity
    });
    totalAmount += product.price * cartItem.quantity;
  }

  const order = await Order.create({
    userId: req.user.id,
    items: orderItems,
    totalAmount,
    shippingAddress: shippingAddress.trim(),
    status: 'Pending'
  });

  for (const item of orderItems) {
    await Product.findByIdAndUpdate(item.productId, { $inc: { stock: -item.quantity } });
  }

  cart.items = [];
  await cart.save();

  res.status(201).json(order);
}

async function listOrders(req, res) {
  const orders = await Order.find({ userId: req.user.id }).sort({ createdAt: -1 });
  res.json(orders);
}

async function getOrder(req, res) {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(404).json({ message: 'Order not found' });
  }
  const order = await Order.findOne({ _id: req.params.id, userId: req.user.id });
  if (!order) return res.status(404).json({ message: 'Order not found' });
  res.json(order);
}

module.exports = { createOrder, listOrders, getOrder };
