const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  price: { type: Number, required: true },
  imageUrl: { type: String, default: '/images/default-product.jpg' },
  category: { type: String, required: true },
  gender: { type: String, enum: ['men', 'women', 'unisex'], required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Product', productSchema);