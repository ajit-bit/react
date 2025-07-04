const express = require('express');
const router = express.Router();
const Liked = require('../models/Liked');
const Product = require('../models/Product');

router.get('/:identifier', async (req, res) => {
  const { identifier } = req.params;
  const isAuthenticated = req.headers.authorization;

  if (!identifier && !isAuthenticated) {
    return res.status(400).json({ message: 'Identifier required' });
  }

  const query = isAuthenticated ? { userId: identifier } : { sessionId: identifier || '' };
  try {
    const likedItems = await Liked.find(query).populate('productId');
    const normalizedItems = likedItems.map(item => ({
      _id: item._id,
      productId: item.productId._id,
      name: item.productId.name,
      price: item.productId.price,
      imageUrl: item.productId.imageUrl,
    }));
    res.json(normalizedItems || []);
  } catch (err) {
    console.error('Fetch liked error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/add', async (req, res) => {
  const { productId, userId, sessionId } = req.body;
  if (!userId && !sessionId) {
    return res.status(400).json({ message: 'User ID or Session ID required' });
  }

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const query = userId ? { userId, productId } : { sessionId, productId };
    const existingItem = await Liked.findOne(query);
    if (existingItem) {
      return res.status(400).json({ message: 'Item already in wishlist' });
    }

    const likedItem = new Liked({ userId: userId || undefined, sessionId: sessionId || undefined, productId });
    await likedItem.save();
    res.json({ message: 'Added to wishlist' });
  } catch (err) {
    console.error('Add to wishlist error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/remove', async (req, res) => {
  const { productId, userId, sessionId } = req.body;
  if (!userId && !sessionId) {
    return res.status(400).json({ message: 'User ID or Session ID required' });
  }

  try {
    const query = userId ? { userId, productId } : { sessionId, productId };
    const likedItem = await Liked.findOneAndDelete(query);
    if (!likedItem) {
      return res.status(404).json({ message: 'Item not found in wishlist' });
    }
    res.json({ message: 'Removed from wishlist' });
  } catch (err) {
    console.error('Remove from wishlist error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;