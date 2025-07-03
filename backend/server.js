const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
require('dotenv').config();
const authMiddleware = require('./midddleware/authMiddleware');

const app = express();

// Middleware
app.use(cors({
  origin: ['http://127.0.0.1:5500', 'http://localhost:5500'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET || 'yourSecretKeyHere',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    httpOnly: true,
    sameSite: 'lax'
  }
}));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB connected"))
.catch(err => console.error("❌ MongoDB connection error:", err));

// Load auth routes
console.log('Attempting to load auth routes...');
try {
  const authRoutes = require('./routes/auth');
  app.use('/api/auth', authRoutes);
  console.log('✅ Auth routes loaded successfully');
} catch (error) {
  console.error('❌ Error loading auth routes:', error.message);
  console.error('Full error:', error);
}

// Load cart routes with authentication
console.log('Attempting to load cart routes...');
try {
  const cartRoutes = require('./routes/cart');
  app.use('/api/cart', authMiddleware, cartRoutes);
  console.log('✅ Cart routes loaded successfully');
} catch (error) {
  console.error('❌ Error loading cart routes:', error.message);
  console.error('Full error:', error);
}

// Load liked routes with authentication
console.log('Attempting to load liked routes...');
try {
  const likedRoutes = require('./routes/liked');
  app.use('/api/liked', authMiddleware, likedRoutes);
  console.log('✅ Liked routes loaded successfully');
} catch (error) {
  console.error('❌ Error loading liked routes:', error.message);
  console.error('Full error:', error);
}

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));