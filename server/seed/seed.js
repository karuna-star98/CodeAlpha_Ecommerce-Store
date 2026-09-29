require('dotenv').config();
const connectDB = require('../config/db');
const Product = require('../models/Product');

const products = [
  {
    name: 'Wireless Headphones',
    description: 'Bluetooth over-ear headphones with rich sound and all-day comfort.',
    price: 1999,
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80',
    category: 'Electronics',
    stock: 25
  },
  {
    name: 'USB Mechanical Keyboard',
    description: 'Compact mechanical keyboard designed for everyday coding and work.',
    price: 2499,
    imageUrl: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=900&q=80',
    category: 'Electronics',
    stock: 18
  },
  {
    name: 'Smart Fitness Watch',
    description: 'Fitness-focused smartwatch with activity tracking and notifications.',
    price: 3499,
    imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80',
    category: 'Wearables',
    stock: 12
  },
  {
    name: 'Travel Backpack',
    description: 'Water-resistant everyday backpack with padded laptop storage.',
    price: 1299,
    imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=80',
    category: 'Lifestyle',
    stock: 30
  },
  {
    name: 'Minimal Desk Lamp',
    description: 'Adjustable LED desk lamp for study, coding and workspace lighting.',
    price: 899,
    imageUrl: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=80',
    category: 'Home',
    stock: 21
  },
  {
    name: 'Ceramic Coffee Mug',
    description: 'Simple ceramic mug with a comfortable handle for coffee or tea.',
    price: 399,
    imageUrl: 'https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?auto=format&fit=crop&w=900&q=80',
    category: 'Home',
    stock: 40
  }
];

async function seed() {
  await connectDB();
  await Product.deleteMany({});
  await Product.insertMany(products);
  console.log(`Seeded ${products.length} products`);
  process.exit(0);
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
