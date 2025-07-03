const express = require('express');
const router = express.Router();
const { getProductsByCategory } = require('../controllers/productController');

router.get('/category/:category', getProductsByCategory);

module.exports = router;