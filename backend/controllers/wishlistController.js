const Wishlist = require('../models/Wishlist');
const Product = require('../models/Product');

exports.getWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.find({ userId: req.params.userId }).populate('productId');
    res.json(wishlist);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching wishlist' });
  }
};

exports.addToWishlist = async (req, res) => {
  const { productId } = req.body;
  try {
    const existingItem = await Wishlist.findOne({ userId: req.user.id, productId });
    if (existingItem) return res.status(400).json({ message: 'Item already in wishlist' });

    const newWishlistItem = new Wishlist({ userId: req.user.id, productId });
    await newWishlistItem.save();
    res.status(200).json({ message: 'Added to wishlist' });
  } catch (error) {
    res.status(500).json({ message: 'Error adding to wishlist' });
  }
};

exports.removeFromWishlist = async (req, res) => {
  try {
    const wishlistItem = await Wishlist.findOneAndDelete({ userId: req.user.id, productId: req.body.productId });
    if (!wishlistItem) return res.status(404).json({ message: 'Item not found' });
    res.json({ message: 'Removed from wishlist' });
  } catch (error) {
    res.status(500).json({ message: 'Error removing from wishlist' });
  }
};