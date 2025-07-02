const express = require('express');
const router = express.Router();
const CartItem = require('../models/CartItem');

// Add a cart item
router.post('/add', async (req, res) => {
  try {
    const newItem = new CartItem(req.body);
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add item' });
  }
});

// Get all cart items
router.get('/', async (req, res) => {
  try {
    const items = await CartItem.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch items' });
  }
});

// Delete a cart item
router.delete('/:id', async (req, res) => {
  try {
    await CartItem.findByIdAndDelete(req.params.id);
    res.json({ message: 'Item deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete item' });
  }
});

// Simulated "Buy Now"
router.post('/buy/:id', async (req, res) => {
  try {
    const item = await CartItem.findById(req.params.id);
    if (!item) return res.status(404).json({ error: 'Item not found' });

    // Simulate purchase logic here
    res.json({ message: `You bought: ${item.name}` });
  } catch (err) {
    res.status(500).json({ error: 'Buy now failed' });
  }
});

module.exports = router;
