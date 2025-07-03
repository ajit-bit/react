const Cart = require('../models/Cart');
const Product = require('../models/Product');

exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.find({ userId: req.params.userId }).populate('productId');
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cart' });
  }
};

exports.addToCart = async (req, res) => {
  const { productId } = req.body;
  try {
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    const cartItem = await Cart.findOne({ userId: req.user.id, productId });
    if (cartItem) {
      cartItem.quantity += 1;
      await cartItem.save();
    } else {
      const newCartItem = new Cart({ userId: req.user.id, productId, price: product.currentPrice });
      await newCartItem.save();
    }
    res.status(200).json({ message: 'Added to cart' });
  } catch (error) {
    res.status(500).json({ message: 'Error adding to cart' });
  }
};

exports.deleteCartItem = async (req, res) => {
  try {
    const cartItem = await Cart.findByIdAndDelete(req.params.id);
    if (!cartItem) return res.status(404).json({ message: 'Item not found' });
    res.json({ message: 'Item deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting item' });
  }
};

exports.buyItem = async (req, res) => {
  try {
    const cartItem = await Cart.findByIdAndDelete(req.params.id);
    if (!cartItem) return res.status(404).json({ message: 'Item not found' });
    res.json({ message: 'Item purchased' });
  } catch (error) {
    res.status(500).json({ message: 'Error purchasing item' });
  }
};