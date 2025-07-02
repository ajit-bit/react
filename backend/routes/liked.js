const express = require('express');
const router = express.Router();
const LikedItem = require('../models/LikedItem');
const CartItem = require('../models/CartItem'); // To move to cart

// Add liked item
router.post('/add', async (req, res) => {
  try {
    const newItem = new LikedItem(req.body);
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(500).json({ error: 'Failed to like item' });
  }
});

// Get all liked items
router.get('/', async (req, res) => {
  try {
    const items = await LikedItem.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch liked items' });
  }
});

// Remove liked item
router.delete('/:id', async (req, res) => {
  try {
    await LikedItem.findByIdAndDelete(req.params.id);
    res.json({ message: 'Item removed from liked list' });
  } catch (err) {
    res.status(500).json({ error: 'Delete failed' });
  }
});



// Move item from liked to cart
router.post('/move-to-cart/:id', async (req, res) => {
  try {
    const likedItem = await LikedItem.findById(req.params.id);

    if (!likedItem) {
      return res.status(404).json({ error: 'Liked item not found' });
    }

    // Create a new cart item from the liked item
    const newCartItem = new CartItem({
      name: likedItem.name,
      price: likedItem.price,
      image: likedItem.image
    });

    await newCartItem.save();               // Save to Cart
    await likedItem.deleteOne();            // Remove from Liked

    res.json({ message: 'Item moved to cart successfully' });
  } catch (err) {
    console.error('Move to cart failed:', err);
    res.status(500).json({ error: 'Failed to move item to cart' });
  }
});


module.exports = router;
