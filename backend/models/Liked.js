const mongoose = require('mongoose');

const likedSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  sessionId: { type: String, index: true, required: function() { return !this.userId; } }
});

module.exports = mongoose.model('Liked', likedSchema);