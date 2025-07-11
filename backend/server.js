const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const cartRoutes = require('./routes/cart');
const likedRoutes = require('./routes/liked');
const path = require('path');

const app = express();

// Connect to MongoDB
connectDB();

// Authentication Middleware
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    req.user = null; // Explicitly set req.user to null for unauthenticated requests
    return next();
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret');
    req.user = decoded; // Set req.user with decoded token (includes id)
    next();
  } catch (err) {
    req.user = null;
    res.status(401).json({ message: 'Invalid token' });
  }
};

// Middleware
app.use(cors({
  origin: ['http://localhost:5173'], // Allow frontend origin
     methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow these methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow necessary headers
  credentials: true, // Allow credentials (cookies, tokens)
}));
app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'public/images'))); // Serve static images

// Routes
app.use('/api/auth', authRoutes); // Auth routes don't need authMiddleware
app.use('/api/products', productRoutes); // Product routes may not need authMiddleware
app.use('/api/cart', authMiddleware, cartRoutes); // Apply authMiddleware to cart routes
app.use('/api/liked', authMiddleware, likedRoutes); // Apply authMiddleware to liked routes

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ message: 'Server error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));