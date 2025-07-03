const express = require('express');
const router = express.Router();
const CartItem = require('../models/CartItem');

// Add a cart item
router.post('/add', async (req, res) => {
  try {
    const { userId, productId, name, price, image } = req.body;
    if (!userId || !productId || !name || !price || !image) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const existingItem = await CartItem.findOne({ userId, productId });
    if (existingItem) {
      existingItem.quantity += 1;
      await existingItem.save();
      return res.status(200).json(existingItem);
    }

    const newItem = new CartItem({
      userId,
      productId,
      name,
      price,
      image,
      quantity: 1,
    });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    console.error('Error adding to cart:', err);
    res.status(500).json({ error: 'Failed to add item to cart' });
  }
});

// Get all cart items for a user
router.get('/:userId', async (req, res) => {
  try {
    const items = await CartItem.find({ userId: req.params.userId });
    res.json(items);
  } catch (err) {
    console.error('Error fetching cart items:', err);
    res.status(500).json({ error: 'Failed to fetch cart items' });
  }
});

// Delete a cart item
router.delete('/:id', async (req, res) => {
  try {
    const item = await CartItem.findByIdAndDelete(req.params.id);
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json({ message: 'Item deleted successfully' });
  } catch (err) {
    console.error('Error deleting cart item:', err);
    res.status(500).json({ error: 'Failed to delete item' });
  }
});

// Simulated "Buy Now"
router.post('/buy/:id', async (req, res) => {
  try {
    const item = await CartItem.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }
    // Simulate purchase logic (e.g., reduce quantity or remove item)
    await CartItem.findByIdAndDelete(req.params.id);
    res.json({ message: `You bought: ${item.name}` });
  } catch (err) {
    console.error('Error processing buy now:', err);
    res.status(500).json({ error: 'Buy now failed' });
  }
});

module.exports = router;