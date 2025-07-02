const LikedItem = require('../models/LikedItem');

exports.addToLiked = async (req, res) => {
  try {
    const newItem = new LikedItem(req.body);
    await newItem.save();
    res.status(201).json({ message: 'Item added to liked list successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error adding item to liked list', error: err.message });
  }
};

exports.getLikedItems = async (req, res) => {
  try {
    const items = await LikedItem.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving liked items', error: err.message });
  }
};
