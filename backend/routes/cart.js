const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const Product = require('../models/Product');

router.get('/:identifier', async (req, res) => {
  const { identifier } = req.params;
  const isAuthenticated = req.headers.authorization;

  if (!identifier && !isAuthenticated) {
    return res.status(400).json({ message: 'Identifier required' });
  }

  const query = isAuthenticated ? { userId: identifier } : { sessionId: identifier || '' };
  try {
    const cartItems = await Cart.find(query).populate('productId');
    const normalizedItems = cartItems.map(item => ({
      _id: item._id,
      productId: item.productId._id,
      name: item.productId.name,
      price: item.productId.price,
      imageUrl: item.productId.imageUrl,
      quantity: item.quantity,
    }));
    res.json(normalizedItems || []);
  } catch (err) {
    console.error('Fetch cart error:', err);
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
    let cartItem = await Cart.findOne(query);
    if (cartItem) {
      cartItem.quantity += 1;
      await cartItem.save();
    } else {
      cartItem = new Cart({ userId: userId || undefined, sessionId: sessionId || undefined, productId, quantity: 1 });
      await cartItem.save();
    }

    res.json({ message: 'Added to cart' });
  } catch (err) {
    console.error('Add to cart error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const { userId, sessionId } = req.body;
  if (!userId && !sessionId) {
    return res.status(400).json({ message: 'User ID or Session ID required' });
  }

  try {
    const query = userId ? { _id: id, userId } : { _id: id, sessionId };
    const cartItem = await Cart.findOneAndDelete(query);
    if (!cartItem) {
      return res.status(404).json({ message: 'Cart item not found' });
    }
    res.json({ message: 'Item removed from cart' });
  } catch (err) {
    console.error('Remove from cart error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;