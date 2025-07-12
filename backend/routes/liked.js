const express = require('express');
const router = express.Router();
const Liked = require('../models/Liked');

router.get('/:identifier', async (req, res) => {
  const { identifier } = req.params;

  if (!identifier) {
    return res.status(400).json({ message: 'Identifier required' });
  }

  const query = req.user ? { userId: req.user.id } : { sessionId: identifier };
  try {
    const likedItems = await Liked.find(query);
    const normalizedItems = likedItems.map(item => ({
      _id: item._id,
      productId: item.productId,
      name: item.name,
      price: item.price,
      imageUrl: item.imageUrl,
    }));
    res.json(normalizedItems || []);
  } catch (err) {
    console.error('Fetch liked error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/add', async (req, res) => {
  const { productId, name, price, imageUrl, sessionId } = req.body;
  if (!productId || !name || !price || !imageUrl) {
    return res.status(400).json({ message: 'Product ID, name, price, and imageUrl required' });
  }
  if (!req.user && !sessionId) {
    return res.status(400).json({ message: 'Session ID required for unauthenticated users' });
  }

  try {
    const query = req.user ? { userId: req.user.id, productId } : { sessionId, productId };
    const existingItem = await Liked.findOne(query);
    if (existingItem) {
      return res.status(400).json({ message: 'Item already in wishlist' });
    }

    const likedItem = new Liked({
      userId: req.user ? req.user.id : null,
      sessionId: req.user ? null : sessionId,
      productId,
      name,
      price,
      imageUrl,
    });
    await likedItem.save();
    const likedItems = await Liked.find(req.user ? { userId: req.user.id } : { sessionId });
    const normalizedItems = likedItems.map(item => ({
      _id: item._id,
      productId: item.productId,
      name: item.name,
      price: item.price,
      imageUrl: item.imageUrl,
    }));
    res.json({ message: 'Added to wishlist', likedItems: normalizedItems });
  } catch (err) {
    console.error('Add to wishlist error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/remove', async (req, res) => {
  const { productId, sessionId } = req.body;
  if (!productId) {
    return res.status(400).json({ message: 'Product ID required' });
  }
  if (!req.user && !sessionId) {
    return res.status(400).json({ message: 'Session ID required for unauthenticated users' });
  }

  try {
    const query = req.user ? { userId: req.user.id, productId } : { sessionId, productId };
    console.log('Removing wishlist item with query:', query);
    const likedItem = await Liked.findOneAndDelete(query);
    if (!likedItem) {
      return res.status(404).json({ message: 'Item not found in wishlist' });
    }
    const likedItems = await Liked.find(req.user ? { userId: req.user.id } : { sessionId });
    const normalizedItems = likedItems.map(item => ({
      _id: item._id,
      productId: item.productId,
      name: item.name,
      price: item.price,
      imageUrl: item.imageUrl,
    }));
    res.json({ message: 'Removed from wishlist', likedItems: normalizedItems });
  } catch (err) {
    console.error('Remove from wishlist error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;