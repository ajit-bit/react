import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Heart, Star, ShoppingBag } from 'lucide-react';
import '../styles/Bracelet.css';
import bracelet from '../../images/bracelet.png';
import bracelet1 from '../../images/bracelet1.jpg';

const Bracelet = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [likedProducts, setLikedProducts] = useState(new Set());

  // Slideshow images
  const slideImages = [
    'https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop',
    'https://images.pexels.com/photos/1927130/pexels-photo-1927130.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop',
    'https://images.pexels.com/photos/1366957/pexels-photo-1366957.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop',
    'https://images.pexels.com/photos/1445527/pexels-photo-1445527.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop',
  ];

  // Product data with hover images
  const products = [
    {
      id: 1,
      name: 'Elegant Charm Bracelet - Silver',
      originalPrice: 1200.00,
      currentPrice: 999.00,
      rating: 4.7,
      reviews: 540,
      image: bracelet,
      hoverImage: bracelet1,
      badge: null
    },
    {
      id: 2,
      name: 'Elegant Charm Bracelet - Silver',
      originalPrice: 1200.00,
      currentPrice: 999.00,
      rating: 4.7,
      reviews: 540,
      image: bracelet,
      hoverImage: bracelet1,
      badge: null
    },
    {
      id: 3,
      name: 'Elegant Charm Bracelet - Silver',
      originalPrice: 1200.00,
      currentPrice: 999.00,
      rating: 4.7,
      reviews: 540,
      image: bracelet,
      hoverImage: bracelet1,
      badge: null
    },
    {
      id: 4,
      name: 'Elegant Charm Bracelet - Silver',
      originalPrice: 1200.00,
      currentPrice: 999.00,
      rating: 4.7,
      reviews: 540,
      image: bracelet,
      hoverImage: bracelet1,
      badge: null
    },
    {
      id: 5,
      name: 'Elegant Charm Bracelet - Silver',
      originalPrice: 1200.00,
      currentPrice: 999.00,
      rating: 4.7,
      reviews: 540,
      image: bracelet,
      hoverImage: bracelet1,
      badge: null
    },
    {
      id: 6,
      name: 'Elegant Charm Bracelet - Silver',
      originalPrice: 1200.00,
      currentPrice: 999.00,
      rating: 4.7,
      reviews: 540,
      image: bracelet,
      hoverImage: bracelet1,
      badge: null
    },
    {
      id: 7,
      name: 'Elegant Charm Bracelet - Silver',
      originalPrice: 1200.00,
      currentPrice: 999.00,
      rating: 4.7,
      reviews: 540,
      image: bracelet,
      hoverImage: bracelet1,
      badge: null
    },
    {
      id: 8,
      name: 'Elegant Charm Bracelet - Silver',
      originalPrice: 1200.00,
      currentPrice: 999.00,
      rating: 4.7,
      reviews: 540,
      image: bracelet,
      hoverImage: bracelet1,
      badge: null
    },
  ];

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slideImages.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slideImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slideImages.length) % slideImages.length);
  };

  const toggleLike = (productId) => {
    setLikedProducts(prev => {
      const newLiked = new Set(prev);
      if (newLiked.has(productId)) {
        newLiked.delete(productId);
      } else {
        newLiked.add(productId);
      }
      return newLiked;
    });
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`star ${
          i < Math.floor(rating) 
            ? 'filled' 
            : i < rating 
            ? 'half-filled' 
            : ''
        }`}
      />
    ));
  };

  return (
    <>
      <div className="bracelet-page">
        {/* Slideshow Section */}
        <div className="slideshow-container">
          <div 
            className="slideshow-wrapper"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {slideImages.map((image, index) => (
              <div key={index} className="slide">
                <img
                  src={image}
                  alt={`Slide ${index + 1}`}
                />
                <div className="slide-overlay">
                  <div className="slide-content">
                    <h2 className="slide-title">Exquisite Bracelets</h2>
                    <p className="slide-subtitle">Discover our premium collection of handcrafted bracelets</p>
                    <button className="slide-button">
                      Shop Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="nav-arrow prev"
          >
            <ChevronLeft />
          </button>
          <button
            onClick={nextSlide}
            className="nav-arrow next"
          >
            <ChevronRight />
          </button>

          {/* Slide Indicators */}
          <div className="slide-indicators">
            {slideImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`indicator ${index === currentSlide ? 'active' : ''}`}
              />
            ))}
          </div>
        </div>

        {/* Header Section */}
        <div className="header-section">
          <div className="header-content">
            <h1 className="header-title">Premium Bracelet Collection</h1>
            <p className="header-description">
              Discover our handpicked selection of exquisite bracelets, crafted with precision and designed to make every moment special.
            </p>
          </div>
        </div>

        {/* Products Grid */}
        <div className="products-container">
          <div className="products-grid">
            {products.map((product) => (
              <div key={product.id} className="product-card">
                <div className="product-image-container">
                  <div className="product-image-wrapper">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="product-image main-image"
                    />
                    <img
                      src={product.hoverImage}
                      alt={`${product.name} - alternate view`}
                      className="product-image hover-image"
                    />
                  </div>
                  {product.badge && (
                    <div className="product-badge">
                      {product.badge}
                    </div>
                  )}
                </div>

                <div className="product-content">
                  <h3 className="product-name">
                    {product.name}
                  </h3>

                  {/* Rating */}
                  <div className="rating-container">
                    <div className="stars-container">
                      {renderStars(product.rating)}
                    </div>
                    <span className="reviews-text">
                      {product.reviews} reviews
                    </span>
                  </div>

                  {/* Price */}
                  <div className="price-container">
                    <div className="price-wrapper">
                      <span className="current-price">
                        Rs. {product.currentPrice.toFixed(2)}
                      </span>
                      <span className="original-price">
                        Rs. {product.originalPrice.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="action-buttons">
                    <button className="add-to-bag-button">
                      <ShoppingBag className="bag-icon" />
                      <span>Add to Bag</span>
                    </button>
                    <button
                      onClick={() => toggleLike(product.id)}
                      className="like-button"
                    >
                      <Heart
                        className={`heart-icon ${
                          likedProducts.has(product.id) ? 'liked' : ''
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Bracelet;