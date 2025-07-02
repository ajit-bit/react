const mongoose = require('mongoose');

const likedItemSchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: String,
});

module.exports = mongoose.model('LikedItem', likedItemSchema);