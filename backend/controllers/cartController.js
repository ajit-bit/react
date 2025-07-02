const CartItem = require('../models/CartItem');

exports.addToCart = async (req, res) => {
  try {
    const newItem = new CartItem(req.body);
    await newItem.save();
    res.status(201).json({ message: 'Item added to cart successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error adding item to cart', error: err.message });
  }
};

exports.getCartItems = async (req, res) => {
  try {
    const items = await CartItem.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving cart items', error: err.message });
  }
};
