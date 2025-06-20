// server.js - Starter Express server for Week 2 assignment

// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware setup
app.use(bodyParser.json());

// Sample in-memory products database
let products = [
  {
    id: '1',
    name: 'Laptop',
    description: 'High-performance laptop with 16GB RAM',
    price: 1200,
    category: 'electronics',
    inStock: true
  },
  {
    id: '2',
    name: 'Smartphone',
    description: 'Latest model with 128GB storage',
    price: 800,
    category: 'electronics',
    inStock: true
  },
  {
    id: '3',
    name: 'Coffee Maker',
    description: 'Programmable coffee maker with timer',
    price: 50,
    category: 'kitchen',
    inStock: false
  }
];

// --- Custom Middleware ---

// Request logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// Simple authentication middleware (expects 'x-api-key' header)
app.use((req, res, next) => {
  const apiKey = req.header('x-api-key');
  if (!apiKey || apiKey !== 'my-secret-key') {
    return res.status(401).json({ error: 'Unauthorized: Invalid or missing API key' });
  }
  next();
});

// Validation middleware for product creation and update
function validateProduct(req, res, next) {
  const { name, description, price, category, inStock } = req.body;
  if (!name || !description || price == null || !category || inStock == null) {
    return res.status(400).json({ error: 'Missing required product fields' });
  }
  next();
}

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Product API! Go to /api/products to see all products.');
});

// Import product routes
const productRoutes = require('./routes');

// Use product routes with validation middleware for POST and PUT
app.use('/api/products', (req, res, next) => {
  if ((req.method === 'POST' || req.method === 'PUT') && (req.path === '/' || /^\/[\w-]+$/.test(req.path))) {
    return validateProduct(req, res, next);
  }
  next();
}, productRoutes);

// --- Error Handling Middleware ---

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Export the app for testing purposes
module.exports = app;