const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: String,
});

module.exports = mongoose.model('CartItem', cartItemSchema);