const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');

router.get('/:identifier', async (req, res) => {
  const { identifier } = req.params;

  if (!identifier) {
    return res.status(400).json({ message: 'Identifier required' });
  }

  const query = req.user ? { userId: req.user.id } : { sessionId: identifier };
  try {
    const cartItems = await Cart.find(query);
    const normalizedItems = cartItems.map(item => ({
      _id: item._id,
      productId: item.productId,
      name: item.name,
      price: item.price,
      imageUrl: item.imageUrl,
      quantity: item.quantity,
    }));
    res.json(normalizedItems || []);
  } catch (err) {
    console.error('Fetch cart error:', err);
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
    let cartItem = await Cart.findOne(query);
    if (cartItem) {
      cartItem.quantity += 1;
      await cartItem.save();
    } else {
      cartItem = new Cart({
        userId: req.user ? req.user.id : null,
        sessionId: req.user ? null : sessionId,
        productId,
        name,
        price,
        imageUrl,
        quantity: 1,
      });
      await cartItem.save();
    }

    const cartItems = await Cart.find(req.user ? { userId: req.user.id } : { sessionId });
    const normalizedItems = cartItems.map(item => ({
      _id: item._id,
      productId: item.productId,
      name: item.name,
      price: item.price,
      imageUrl: item.imageUrl,
      quantity: item.quantity,
    }));
    res.json({ message: 'Added to cart', cartItems: normalizedItems });
  } catch (err) {
    console.error('Add to cart error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/update', async (req, res) => {
  const { productId, userId, sessionId, quantity } = req.body;
  if (!productId || quantity === undefined || quantity < 1) {
    return res.status(400).json({ message: 'Product ID and valid quantity required' });
  }
  if (!userId && !sessionId) {
    return res.status(400).json({ message: 'User ID or session ID required' });
  }

  try {
    const query = userId ? { userId, productId } : { sessionId, productId };
    let cartItem = await Cart.findOne(query);
    if (!cartItem) {
      return res.status(404).json({ message: 'Cart item not found' });
    }

    cartItem.quantity = quantity;
    await cartItem.save();

    const cartItems = await Cart.find(userId ? { userId } : { sessionId });
    const normalizedItems = cartItems.map(item => ({
      _id: item._id,
      productId: item.productId,
      name: item.name,
      price: item.price,
      imageUrl: item.imageUrl,
      quantity: item.quantity,
    }));
    res.json({ message: 'Quantity updated', cartItems: normalizedItems });
  } catch (err) {
    console.error('Update cart quantity error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/remove', async (req, res) => {
  const { productId, userId, sessionId } = req.body;
  if (!productId) {
    return res.status(400).json({ message: 'Product ID required' });
  }
  if (!userId && !sessionId) {
    return res.status(400).json({ message: 'User ID or session ID required' });
  }

  try {
    const query = userId ? { userId, productId } : { sessionId, productId };
    console.log('Removing cart item with query:', query);
    const cartItem = await Cart.findOneAndDelete(query);
    if (!cartItem) {
      return res.status(404).json({ message: 'Cart item not found' });
    }

    const cartItems = await Cart.find(userId ? { userId } : { sessionId });
    const normalizedItems = cartItems.map(item => ({
      _id: item._id,
      productId: item.productId,
      name: item.name,
      price: item.price,
      imageUrl: item.imageUrl,
      quantity: item.quantity,
    }));
    res.json({ message: 'Item removed from cart', cartItems: normalizedItems });
  } catch (err) {
    console.error('Remove from cart error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const { sessionId } = req.body;
  if (!req.user && !sessionId) {
    return res.status(400).json({ message: 'Session ID required for unauthenticated users' });
  }

  try {
    const query = req.user ? { _id: id, userId: req.user.id } : { _id: id, sessionId };
    const cartItem = await Cart.findOneAndDelete(query);
    if (!cartItem) {
      return res.status(404).json({ message: 'Cart item not found' });
    }

    const cartItems = await Cart.find(req.user ? { userId: req.user.id } : { sessionId });
    const normalizedItems = cartItems.map(item => ({
      _id: item._id,
      productId: item.productId,
      name: item.name,
      price: item.price,
      imageUrl: item.imageUrl,
      quantity: item.quantity,
    }));
    res.json({ message: 'Item removed from cart', cartItems: normalizedItems });
  } catch (err) {
    console.error('Remove from cart error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;