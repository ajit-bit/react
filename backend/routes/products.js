const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    console.error('Fetch products error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;