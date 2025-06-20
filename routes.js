const express = require('express');
const { v4: uuidv4 } = require('uuid');

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

const router = express.Router();

// GET /api/products - Get all products (with pagination, search, and filtering)
router.get('/', (req, res) => {
  let { page = 1, limit = 10, search = '', category } = req.query;
  page = parseInt(page);
  limit = parseInt(limit);
  let filtered = products;
  if (search) {
    const searchLower = search.toLowerCase();
    filtered = filtered.filter(p => p.name.toLowerCase().includes(searchLower));
  }
  if (category) {
    const categoryLower = category.toLowerCase();
    filtered = filtered.filter(p => p.category.toLowerCase() === categoryLower);
  }
  const start = (page - 1) * limit;
  const end = start + limit;
  const paginated = filtered.slice(start, end);
  res.json({
    page,
    limit,
    total: filtered.length,
    products: paginated
  });
});

// GET /api/products/:id - Get a specific product
router.get('/:id', (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  res.json(product);
});

// POST /api/products - Create a new product
router.post('/', (req, res) => {
  const { name, description, price, category, inStock } = req.body;
  if (!name || !description || price == null || !category || inStock == null) {
    return res.status(400).json({ error: 'Missing required product fields' });
  }
  const newProduct = {
    id: uuidv4(),
    name,
    description,
    price,
    category,
    inStock
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// PUT /api/products/:id - Update a product
router.put('/:id', (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  const { name, description, price, category, inStock } = req.body;
  if (!name || !description || price == null || !category || inStock == null) {
    return res.status(400).json({ error: 'Missing required product fields' });
  }
  product.name = name;
  product.description = description;
  product.price = price;
  product.category = category;
  product.inStock = inStock;
  res.json(product);
});

// DELETE /api/products/:id - Delete a product
router.delete('/:id', (req, res) => {
  const index = products.findIndex(p => p.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Product not found' });
  }
  const deleted = products.splice(index, 1);
  res.json({ message: 'Product deleted', product: deleted[0] });
});

module.exports = router;
