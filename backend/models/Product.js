const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  originalPrice: { type: Number, required: true },
  currentPrice: { type: Number, required: true },
  rating: { type: Number, default: 0 },
  reviews: { type: Number, default: 0 },
  image: { type: String, required: true },
  hoverImage: { type: String, required: true },
  category: { type: String, required: true },
});

module.exports = mongoose.model('Product', productSchema);