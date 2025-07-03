const express = require('express');
const router = express.Router();
const { getWishlist, addToWishlist, removeFromWishlist } = require('../controllers/wishlistController');
const auth = require('../middleware/auth');

router.get('/:userId', auth, getWishlist);
router.post('/add', auth, addToWishlist);
router.post('/remove', auth, removeFromWishlist);

module.exports = router;