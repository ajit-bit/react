import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Heart, Star, ShoppingBag } from 'lucide-react';
import styles from '../styles/Category.module.css';
import earring from '../../images/earring.png';
import earring1 from '../../images/earring1.jpg';
import necklace from '../../images/ring.png';
import necklace1 from '../../images/ring1.jpg';
import ring from '../../images/ring.png';
import ring1 from '../../images/ring1.jpg';
import bracelet from '../../images/bracelet.png';
import bracelet1 from '../../images/bracelet1.jpg';

const Category = () => {
  const { categoryName } = useParams();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [likedProducts, setLikedProducts] = useState(new Set());

  // Slideshow images (same for all categories)
  const slideImages = [
    'https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop',
    'https://images.pexels.com/photos/1927130/pexels-photo-1927130.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop',
    'https://images.pexels.com/photos/1366957/pexels-photo-1366957.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop',
    'https://images.pexels.com/photos/1445527/pexels-photo-1445527.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop',
  ];

  // Product data for each category
  const categoryData = {
    earrings: {
      title: 'Premium Earring Collection',
      subtitle: 'Exquisite Earrings',
      description: 'Discover our handpicked selection of exquisite earrings, crafted with precision and designed to make every moment special.',
      products: Array(8).fill().map((_, index) => ({
        id: index + 1,
        name: 'Elegant Drop Earrings - Silver',
        originalPrice: 800.00,
        currentPrice: 649.00,
        rating: 4.7,
        reviews: 520,
        image: earring,
        hoverImage: earring1,
        badge: null,
      })),
    },
    necklaces: {
      title: 'Premium Necklace Collection',
      subtitle: 'Exquisite Necklaces',
      description: 'Discover our handpicked selection of exquisite necklaces, crafted with precision and designed to make every moment special.',
      products: Array(8).fill().map((_, index) => ({
        id: index + 1,
        name: 'Radiant Gem Necklace - Gold',
        originalPrice: 1500.00,
        currentPrice: 1299.00,
        rating: 4.8,
        reviews: 820,
        image: necklace,
        hoverImage: necklace1,
        badge: null,
      })),
    },
    rings: {
      title: 'Premium Ring Collection',
      subtitle: 'Exquisite Rings',
      description: 'Discover our handpicked selection of exquisite rings, crafted with precision and designed to make every moment special.',
      products: Array(8).fill().map((_, index) => ({
        id: index + 1,
        name: 'Girl Boss Salty Watch Ring - Rose Gold',
        originalPrice: 900.00,
        currentPrice: 749.00,
        rating: 4.5,
        reviews: 670,
        image: ring,
        hoverImage: ring1,
        badge: null,
      })),
    },
    bracelets: {
      title: 'Premium Bracelet Collection',
      subtitle: 'Exquisite Bracelets',
      description: 'Discover our handpicked selection of exquisite bracelets, crafted with precision and designed to make every moment special.',
      products: Array(8).fill().map((_, index) => ({
        id: index + 1,
        name: 'Elegant Charm Bracelet - Silver',
        originalPrice: 1200.00,
        currentPrice: 999.00,
        rating: 4.7,
        reviews: 540,
        image: bracelet,
        hoverImage: bracelet1,
        badge: null,
      })),
    },
  };

  // Normalize categoryName to match categoryData keys
  const normalizedCategory = categoryName ? categoryName.toLowerCase() : 'earrings';
  const currentCategory = categoryData[normalizedCategory] || categoryData.earrings;

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
    setLikedProducts((prev) => {
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
    <div className={styles['category-page']}>
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
                  <h2 className={styles['slide-title']}>{currentCategory.subtitle}</h2>
                  <p className={styles['slide-subtitle']}>Discover our premium collection of handcrafted {normalizedCategory}</p>
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
          <h1 className={styles['header-title']}>{currentCategory.title}</h1>
          <p className={styles['header-description']}>
            {currentCategory.description}
          </p>
        </div>
      </div>

      {/* Products Grid */}
      <div className={styles['products-container']}>
        {currentCategory.products && currentCategory.products.length > 0 ? (
          <div className={styles['products-grid']}>
            {currentCategory.products.map((product) => (
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
        ) : (
          <div className="text-center text-gray-500">
            No products available for this category.
          </div>
        )}
      </div>
    </div>
  );
};

export default Category;