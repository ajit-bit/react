import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Heart, Star, ShoppingBag } from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';
import styles from '../styles/Category.module.css';
import earring from '../../images/earring.png';
import earring1 from '../../images/earring1.jpg';
import necklace from '../../images/ring.png';
import necklace1 from '../../images/ring1.jpg';
import ring from '../../images/ring.png';
import ring1 from '../../images/ring1.jpg';
import bracelet from '../../images/bracelet.png';
import bracelet1 from '../../images/bracelet1.jpg';

const Category = ({ setCartItems, setLikedItems }) => {
  const { categoryName } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [likedProducts, setLikedProducts] = useState(new Set());
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState({});

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

  const normalizedCategory = categoryName ? categoryName.toLowerCase() : 'earrings';
  const currentCategory = categoryData[normalizedCategory] || categoryData.earrings;

  const checkLoginStatus = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setUser(null);
        setCartItems([]);
        setLikedItems([]);
        return;
      }
      const res = await fetch("http://localhost:5000/api/auth/me", {
        credentials: "include",
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
        await fetchCartItems(data.user.id);
        await fetchLikedItems(data.user.id);
      } else {
        localStorage.removeItem('token');
        setUser(null);
        setCartItems([]);
        setLikedItems([]);
        toast.error("Session expired, please log in again", {
          className: isMenRoute ? 'men-theme-toast' : '',
        });
      }
    } catch (err) {
      console.error("Error checking login status", err);
      setUser(null);
      setCartItems([]);
      setLikedItems([]);
      toast.error("Failed to check login status", {
        className: isMenRoute ? 'men-theme-toast' : '',
      });
    }
  };

  const fetchCartItems = async (userId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/cart/${userId}`, {
        credentials: "include",
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        const normalizedItems = data.map(item => ({
          id: item.productId || item.id,
          name: item.product?.name || item.name || 'Unnamed Product',
          price: parseFloat(item.product?.price || item.price || 0),
          imageUrl: item.product?.imageUrl || item.imageUrl || '/images/default-product.jpg',
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

  const fetchLikedItems = async (userId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/liked/${userId}`, {
        credentials: "include",
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        const normalizedItems = data.map(item => ({
          id: item.productId || item.id,
          name: item.product?.name || item.name || 'Unnamed Product',
          price: parseFloat(item.product?.price || item.price || 0),
          imageUrl: item.product?.imageUrl || item.imageUrl || '/images/default-product.jpg',
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
    if (!user) {
      toast.warn("Please login to add items to cart", {
        className: isMenRoute ? 'men-theme-toast' : '',
      });
      navigate('/auth');
      return;
    }
    setLoading(prev => ({ ...prev, [productId]: true }));
    try {
      const token = localStorage.getItem('token');
      const response = await fetch("http://localhost:5000/api/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`,
        },
        credentials: "include",
        body: JSON.stringify({ productId }),
      });
      if (response.ok) {
        await fetchCartItems(user.id);
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
    if (!user) {
      toast.warn("Please login to add items to wishlist", {
        className: isMenRoute ? 'men-theme-toast' : '',
      });
      navigate('/auth');
      return;
    }
    setLoading(prev => ({ ...prev, [productId]: true }));
    try {
      const token = localStorage.getItem('token');
      const endpoint = likedProducts.has(productId) ? "/api/liked/remove" : "/api/liked/add";
      const response = await fetch(`http://localhost:5000${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`,
        },
        credentials: "include",
        body: JSON.stringify({ productId }),
      });
      if (response.ok) {
        await fetchLikedItems(user.id);
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

  useEffect(() => {
    checkLoginStatus();
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
      <div className={styles['slideshow-container']}>
        <div
          className={styles['slideshow-wrapper']}
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slideImages.map((image, index) => (
            <div key={index} className={styles.slide}>
              <img src={image} alt={`Slide ${index + 1}`} />
              <div className={styles['slide-overlay']}>
                <div className={styles['slide-content']}>
                  <h2 className={styles['slide-title']}>{currentCategory.subtitle}</h2>
                  <p className={styles['slide-subtitle']}>Discover our premium collection of handcrafted {normalizedCategory}</p>
                  <button
                    className={styles['slide-button']}
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
      <div className={styles['header-section']}>
        <div className={styles['header-content']}>
          <h1 className={styles['header-title']}>{currentCategory.title}</h1>
          <p className={styles['header-description']}>{currentCategory.description}</p>
        </div>
      </div>
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
                </div>
                <div className={styles['product-content']}>
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
                  <div className={styles['action-buttons']}>
                    <button
                      className={styles['add-to-bag-button']}
                      onClick={() => addToCart(product.id)}
                      disabled={loading[product.id]}
                    >
                      <ShoppingBag className={styles['bag-icon']} />
                      <span>{loading[product.id] ? 'Adding...' : 'Add to Bag'}</span>
                    </button>
                    <button
                      onClick={() => addToWishlist(product.id)}
                      className={`${styles['like-button']} ${likedProducts.has(product.id) ? styles.liked : ''}`}
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
          <p>No products available in this category.</p>
        )}
      </div>
    </div>
  );
};

export default Category;