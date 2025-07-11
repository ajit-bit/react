import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Heart, Star, ShoppingBag } from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../styles/Category.module.css';
import earring from '../assets/images/earring.png';
import earring1 from '../assets/images/earring1.jpg';
import necklace from '../assets/images/ring.png';
import necklace1 from '../assets/images/ring1.jpg';
import ring from '../assets/images/ring.png';
import ring1 from '../assets/images/ring1.jpg';
import bracelet from '../assets/images/bracelet.png';
import bracelet1 from '../assets/images/bracelet1.jpg';
import { v4 as uuidv4 } from 'uuid';

const Category = ({ setCartItems, setLikedItems }) => {
  const { categoryName } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [likedProducts, setLikedProducts] = useState(new Set());
  const [loading, setLoading] = useState({});
  const sessionId = localStorage.getItem('sessionId') || uuidv4();

  const isMenRoute = location.pathname.includes('/men');

  const slideImages = [
    'https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop',
    'https://images.pexels.com/photos/1927130/pexels-photo-1927130.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop',
    'https://images.pexels.com/photos/1366957/pexels-photo-1366957.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop',
    'https://images.pexels.com/photos/1445527/pexels-photo-1445527.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop',
  ];

  const categoryData = {
    earrings: {
      title: 'Premium Earring Collection',
      subtitle: 'Exquisite Earrings',
      description: 'Discover our handpicked selection of exquisite earrings, crafted with precision and designed to make every moment special.',
      products: Array(8).fill().map((_, index) => ({
        id: `507f1f77bcf86cd79943901${index}`,
        name: 'Elegant Drop Earrings - Silver',
        originalPrice: 800.00,
        currentPrice: 649.00,
        rating: 4.7,
        reviews: 520,
        image: earring,
        hoverImage: earring1,
        description: 'Elegant silver drop earrings for a sophisticated look.',
        category: 'earrings',
        badge: null,
      })),
    },
    necklaces: {
      title: 'Premium Necklace Collection',
      subtitle: 'Exquisite Necklaces',
      description: 'Discover our handpicked selection of exquisite necklaces, crafted with precision and designed to make every moment special.',
      products: Array(8).fill().map((_, index) => ({
        id: `507f1f77bcf86cd79943902${index}`,
        name: 'Radiant Gem Necklace - Gold',
        originalPrice: 1500.00,
        currentPrice: 1299.00,
        rating: 4.8,
        reviews: 820,
        image: necklace,
        hoverImage: necklace1,
        description: 'Gold necklace with radiant gemstones.',
        category: 'necklaces',
        badge: null,
      })),
    },
    rings: {
      title: 'Premium Ring Collection',
      subtitle: 'Exquisite Rings',
      description: 'Discover our handpicked selection of exquisite rings, crafted with precision and designed to make every moment special.',
      products: Array(8).fill().map((_, index) => ({
        id: `507f1f77bcf86cd79943903${index}`,
        name: 'Girl Boss Salty Watch Ring - Rose Gold',
        originalPrice: 900.00,
        currentPrice: 749.00,
        rating: 4.5,
        reviews: 670,
        image: ring,
        hoverImage: ring1,
        description: 'Rose gold ring with a bold, modern design.',
        category: 'rings',
        badge: null,
      })),
    },
    bracelets: {
      title: 'Premium Bracelet Collection',
      subtitle: 'Exquisite Bracelets',
      description: 'Discover our handpicked selection of exquisite bracelets, crafted with precision and designed to make every moment special.',
      products: Array(8).fill().map((_, index) => ({
        id: `507f1f77bcf86cd79943904${index}`,
        name: 'Elegant Charm Bracelet - Silver',
        originalPrice: 1200.00,
        currentPrice: 999.00,
        rating: 4.7,
        reviews: 540,
        image: bracelet,
        hoverImage: bracelet1,
        description: 'Silver charm bracelet with heart-shaped pendants.',
        category: 'bracelets',
        badge: null,
      })),
    },
  };

  const normalizedCategory = categoryName ? categoryName.toLowerCase() : 'earrings';
  const currentCategory = categoryData[normalizedCategory] || categoryData.earrings;

  useEffect(() => {
    if (!localStorage.getItem('sessionId')) {
      localStorage.setItem('sessionId', sessionId);
    }
    fetchCartItems();
    fetchLikedItems();
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slideImages.length]);

  const fetchCartItems = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/cart/${sessionId}`);
      if (response.ok) {
        const data = await response.json();
        const normalizedItems = data.map(item => ({
          id: item.productId || item.id,
          name: item.name || 'Unnamed Product',
          price: parseFloat(item.price || 0),
          imageUrl: item.imageUrl || '/images/default-product.jpg',
          quantity: item.quantity || 1,
        }));
        setCartItems(normalizedItems);
      } else {
        throw new Error("Failed to fetch cart items");
      }
    } catch (err) {
      console.error("Error fetching cart items:", err);
      setCartItems([]);
      toast.error("Failed to fetch cart items", {
        className: isMenRoute ? 'men-theme-toast' : '',
      });
    }
  };

  const fetchLikedItems = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/liked/${sessionId}`);
      if (response.ok) {
        const data = await response.json();
        const normalizedItems = data.map(item => ({
          id: item.productId || item.id,
          name: item.name || 'Unnamed Product',
          price: parseFloat(item.price || 0),
          imageUrl: item.imageUrl || '/images/default-product.jpg',
        }));
        setLikedItems(normalizedItems);
        setLikedProducts(new Set(normalizedItems.map(item => item.id)));
      } else {
        throw new Error("Failed to fetch liked items");
      }
    } catch (err) {
      console.error("Error fetching liked items:", err);
      setLikedItems([]);
      toast.error("Failed to fetch liked items", {
        className: isMenRoute ? 'men-theme-toast' : '',
      });
    }
  };

  const addToCart = async (productId) => {
    const product = currentCategory.products.find(p => p.id === productId);
    if (!product) {
      toast.error("Product not found", { className: isMenRoute ? 'men-theme-toast' : '' });
      return;
    }

    setLoading(prev => ({ ...prev, [productId]: true }));
    try {
      const response = await fetch("http://localhost:5000/api/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId,
          sessionId,
          name: product.name,
          price: product.currentPrice,
          imageUrl: product.image,
        }),
      });
      if (response.ok) {
        await fetchCartItems();
        toast.success("Added to Cart!", {
          className: isMenRoute ? 'men-theme-toast' : '',
        });
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add to cart");
      }
    } catch (err) {
      console.error("Error adding to cart:", err);
      toast.error(err.message || "Failed to add to cart", {
        className: isMenRoute ? 'men-theme-toast' : '',
      });
    } finally {
      setLoading(prev => ({ ...prev, [productId]: false }));
    }
  };

  const addToWishlist = async (productId) => {
    const product = currentCategory.products.find(p => p.id === productId);
    if (!product) {
      toast.error("Product not found", { className: isMenRoute ? 'men-theme-toast' : '' });
      return;
    }

    setLoading(prev => ({ ...prev, [productId]: true }));
    try {
      const endpoint = likedProducts.has(productId) ? "/api/liked/remove" : "/api/liked/add";
      const response = await fetch(`http://localhost:5000${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId,
          sessionId,
          name: product.name,
          price: product.currentPrice,
          imageUrl: product.image,
        }),
      });
      if (response.ok) {
        await fetchLikedItems();
        toast.success(likedProducts.has(productId) ? "Removed from Wishlist!" : "Added to Wishlist!", {
          className: isMenRoute ? 'men-theme-toast' : '',
        });
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update wishlist");
      }
    } catch (err) {
      console.error("Error updating wishlist:", err);
      toast.error(err.message || "Failed to update wishlist", {
        className: isMenRoute ? 'men-theme-toast' : '',
      });
    } finally {
      setLoading(prev => ({ ...prev, [productId]: false }));
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slideImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slideImages.length) % slideImages.length);
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
    <div className={`${styles['category-page']} container-fluid px-0`}>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={isMenRoute ? 'dark' : 'light'}
      />
      <div className={`${styles['slideshow-container']} w-100`}>
        <div
          className={styles['slideshow-wrapper']}
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slideImages.map((image, index) => (
            <div key={index} className={styles.slide}>
              <img src={image} alt={`Slide ${index + 1}`} className="w-100 h-100 object-fit-cover" />
              <div className={styles['slide-overlay']}>
                <div className={styles['slide-content']}>
                  <h2 className={styles['slide-title']}>{currentCategory.subtitle}</h2>
                  <p className={styles['slide-subtitle']}>Discover our premium collection of handcrafted {normalizedCategory}</p>
                  <button
                    className="btn btn-warning text-dark fw-bold px-3 py-1 rounded-3"
                    onClick={() => navigate('/products')}
                  >
                    Shop Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
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
      <div className="bg-white shadow-sm py-3 py-md-4">
        <div className="container text-center">
          <h1 className="display-6 fw-bold text-dark mb-2">{currentCategory.title}</h1>
          <p className="text-muted fs-6 mx-auto" style={{ maxWidth: '36rem' }}>{currentCategory.description}</p>
        </div>
      </div>
      <div className="container py-3 py-md-4">
        {currentCategory.products && currentCategory.products.length > 0 ? (
          <div className={`${styles['products-scroll-container']} d-flex flex-row gap-3 flex-nowrap overflow-auto px-3`}>
            {currentCategory.products.map((product) => (
              <div 
                key={product.id} 
                className={`${styles['product-card']} flex-shrink-0`} 
                onClick={() => navigate(`/product/${product.id}`)}
                style={{ cursor: 'pointer' }}
              >
                <div className={styles['product-image-container']}>
                  <div className={styles['product-image-wrapper']}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className={`${styles['product-image']} ${styles['main-image']} w-100 h-100 object-fit-cover`}
                    />
                    <img
                      src={product.hoverImage}
                      alt={`${product.name} - alternate view`}
                      className={`${styles['product-image']} ${styles['hover-image']} w-100 h-100 object-fit-cover`}
                    />
                    {product.badge && <span className={styles['product-badge']}>{product.badge}</span>}
                  </div>
                </div>
                <div className="p-2" onClick={(e) => e.stopPropagation()}>
                  <h3 className={styles['product-name']}>{product.name}</h3>
                  <div className={styles['rating-container']}>
                    <div className={styles['stars-container']}>{renderStars(product.rating)}</div>
                    <span className={styles['reviews-text']}>{product.reviews} reviews</span>
                  </div>
                  <div className={styles['price-container']}>
                    <div className={styles['price-wrapper']}>
                      <span className={styles['current-price']}>Rs. {product.currentPrice.toFixed(2)}</span>
                      <span className={styles['original-price']}>Rs. {product.originalPrice.toFixed(2)}</span>
                    </div>
                  </div>
                  <div className="d-flex align-items-center gap-1">
                    <button
                      className="btn btn-warning text-dark fw-bold flex-grow-1 d-flex align-items-center justify-content-center gap-1"
                      onClick={() => addToCart(product.id)}
                      disabled={loading[product.id]}
                    >
                      <ShoppingBag className={styles['bag-icon']} />
                      <span>{loading[product.id] ? 'Adding...' : 'Add to Bag'}</span>
                    </button>
                    <button
                      onClick={() => addToWishlist(product.id)}
                      className={`btn btn-outline-secondary rounded-circle p-1 ${likedProducts.has(product.id) ? styles.liked : ''}`}
                      disabled={loading[product.id]}
                    >
                      <Heart
                        className={`${styles['heart-icon']} ${likedProducts.has(product.id) ? styles.liked : ''}`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-muted">No products available in this category.</p>
        )}
      </div>
    </div>
  );
};

export default Category;