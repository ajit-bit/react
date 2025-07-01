import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Heart, Star, ShoppingBag } from 'lucide-react';
import styles from '../styles/Necklace.module.css';
import necklace from '../../images/ring.png';
import necklace1 from '../../images/ring1.jpg';

const Necklace = () => {
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
      name: 'Radiant Gem Necklace - Gold',
      originalPrice: 1500.00,
      currentPrice: 1299.00,
      rating: 4.8,
      reviews: 820,
      image: necklace,
      hoverImage: necklace1,
      badge: null
    },
    {
      id: 2,
      name: 'Radiant Gem Necklace - Gold',
      originalPrice: 1500.00,
      currentPrice: 1299.00,
      rating: 4.8,
      reviews: 820,
      image: necklace,
      hoverImage: necklace1,
      badge: null
    },
    {
      id: 3,
      name: 'Radiant Gem Necklace - Gold',
      originalPrice: 1500.00,
      currentPrice: 1299.00,
      rating: 4.8,
      reviews: 820,
      image: necklace,
      hoverImage: necklace1,
      badge: null
    },
    {
      id: 4,
      name: 'Radiant Gem Necklace - Gold',
      originalPrice: 1500.00,
      currentPrice: 1299.00,
      rating: 4.8,
      reviews: 820,
      image: necklace,
      hoverImage: necklace1,
      badge: null
    },
    {
      id: 5,
      name: 'Radiant Gem Necklace - Gold',
      originalPrice: 1500.00,
      currentPrice: 1299.00,
      rating: 4.8,
      reviews: 820,
      image: necklace,
      hoverImage: necklace1,
      badge: null
    },
    {
      id: 6,
      name: 'Radiant Gem Necklace - Gold',
      originalPrice: 1500.00,
      currentPrice: 1299.00,
      rating: 4.8,
      reviews: 820,
      image: necklace,
      hoverImage: necklace1,
      badge: null
    },
    {
      id: 7,
      name: 'Radiant Gem Necklace - Gold',
      originalPrice: 1500.00,
      currentPrice: 1299.00,
      rating: 4.8,
      reviews: 820,
      image: necklace,
      hoverImage: necklace1,
      badge: null
    },
    {
      id: 8,
      name: 'Radiant Gem Necklace - Gold',
      originalPrice: 1500.00,
      currentPrice: 1299.00,
      rating: 4.8,
      reviews: 820,
      image: necklace,
      hoverImage: necklace1,
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
        className={`${styles.star} ${
          i < Math.floor(rating) 
            ? styles.filled 
            : i < rating 
            ? styles['half-filled'] 
            : ''
        }`}
      />
    ));
  };

  return (
    <>
      <div className={styles['necklace-page']}>
        {/* Slideshow Section */}
        <div className={styles['slideshow-container']}>
          <div 
            className={styles['slideshow-wrapper']}
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {slideImages.map((image, index) => (
              <div key={index} className={styles.slide}>
                <img
                  src={image}
                  alt={`Slide ${index + 1}`}
                />
                <div className={styles['slide-overlay']}>
                  <div className={styles['slide-content']}>
                    <h2 className={styles['slide-title']}>Exquisite Necklaces</h2>
                    <p className={styles['slide-subtitle']}>Discover our premium collection of handcrafted necklaces</p>
                    <button className={styles['slide-button']}>
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
            className={`${styles['nav-arrow']} ${styles.prev}`}
          >
            <ChevronLeft />
          </button>
          <button
            onClick={nextSlide}
            className={`${styles['nav-arrow']} ${styles.next}`}
          >
            <ChevronRight />
          </button>

          {/* Slide Indicators */}
          <div className={styles['slide-indicators']}>
            {slideImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`${styles.indicator} ${index === currentSlide ? styles.active : ''}`}
              />
            ))}
          </div>
        </div>

        {/* Header Section */}
        <div className={styles['header-section']}>
          <div className={styles['header-content']}>
            <h1 className={styles['header-title']}>Premium Necklace Collection</h1>
            <p className={styles['header-description']}>
              Discover our handpicked selection of exquisite necklaces, crafted with precision and designed to make every moment special.
            </p>
          </div>
        </div>

        {/* Products Grid */}
        <div className={styles['products-container']}>
          <div className={styles['products-grid']}>
            {products.map((product) => (
              <div key={product.id} className={styles['product-card']}>
                <div className={styles['product-image-container']}>
                  <div className={styles['product-image-wrapper']}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className={`${styles['product-image']} ${styles['main-image']}`}
                    />
                    <img
                      src={product.hoverImage}
                      alt={`${product.name} - alternate view`}
                      className={`${styles['product-image']} ${styles['hover-image']}`}
                    />
                  </div>
                  {product.badge && (
                    <div className={styles['product-badge']}>
                      {product.badge}
                    </div>
                  )}
                </div>

                <div className={styles['product-content']}>
                  <h3 className={styles['product-name']}>
                    {product.name}
                  </h3>

                  {/* Rating */}
                  <div className={styles['rating-container']}>
                    <div className={styles['stars-container']}>
                      {renderStars(product.rating)}
                    </div>
                    <span className={styles['reviews-text']}>
                      {product.reviews} reviews
                    </span>
                  </div>

                  {/* Price */}
                  <div className={styles['price-container']}>
                    <div className={styles['price-wrapper']}>
                      <span className={styles['current-price']}>
                        Rs. {product.currentPrice.toFixed(2)}
                      </span>
                      <span className={styles['original-price']}>
                        Rs. {product.originalPrice.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className={styles['action-buttons']}>
                    <button className={styles['add-to-bag-button']}>
                      <ShoppingBag className={styles['bag-icon']} />
                      <span>Add to Bag</span>
                    </button>
                    <button
                      onClick={() => toggleLike(product.id)}
                      className={styles['like-button']}
                    >
                      <Heart
                        className={`${styles['heart-icon']} ${
                          likedProducts.has(product.id) ? styles.liked : ''
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

export default Necklace;