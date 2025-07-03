const express = require('express');
const router = express.Router();
const { getCart, addToCart, deleteCartItem, buyItem } = require('../controllers/cartController');
const auth = require('../middleware/auth');

router.get('/:userId', auth, getCart);
router.post('/add', auth, addToCart);
router.delete('/:id', auth, deleteCartItem);
router.post('/buy/:id', auth, buyItem);

module.exports = router;