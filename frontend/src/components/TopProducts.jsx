import React, { useState, useEffect } from 'react';
import { Container, Card } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';
import styles from '../styles/TopProducts.module.css';

const productData = {
  rings: [
    { 
      id: '507f1f77bcf86cd799439071',
      name: "9CT WHITE GOLD 0.33CT DIAMOND ETERNITY", 
      price: 2799, 
      image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop", 
      hoverImage: "https://images.unsplash.com/photo-1614292264945-5b882e3b5f8e?w=400&h=400&fit=crop",
      badge: "Sale", 
      rating: "★★★★★", 
      count: 1 
    },
    { 
      id: '507f1f77bcf86cd799439072',
      name: "9CT WHITE GOLD 0.25CT DIAMOND SOLITAIRE", 
      price: 3799, 
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop", 
      hoverImage: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=400&fit=crop",
      rating: "★★★★★", 
      count: 2 
    },
    { 
      id: '507f1f77bcf86cd799439073',
      name: "9CT WHITE GOLD DIAMOND TWISTED ETERNITY", 
      price: 5699, 
      image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop", 
      hoverImage: "https://images.unsplash.com/photo-1614292264945-5b882e3b5f8e?w=400&h=400&fit=crop",
      rating: "★★★★☆", 
      count: 5 
    },
    { 
      id: '507f1f77bcf86cd799439074',
      name: "9CT WHITE GOLD CUBIC ZIRCONIA SOLITAIRE", 
      price: 4399, 
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop", 
      hoverImage: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=400&fit=crop",
      badge: "Popular", 
      rating: "★★★★★", 
      count: 8 
    },
    { 
      id: '507f1f77bcf86cd799439075',
      name: "9CT WHITE GOLD I LOVE YOU RING", 
      price: 3699, 
      image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop", 
      hoverImage: "https://images.unsplash.com/photo-1614292264945-5b882e3b5f8e?w=400&h=400&fit=crop",
      rating: "★★★★★", 
      count: 3 
    },
    { 
      id: '507f1f77bcf86cd799439076',
      name: "9CT WHITE GOLD PRINCESS CUT DIAMOND", 
      price: 6299, 
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop", 
      hoverImage: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=400&fit=crop",
      rating: "★★★★★", 
      count: 7 
    },
    { 
      id: '507f1f77bcf86cd799439077',
      name: "9CT WHITE GOLD EMERALD CUT DIAMOND", 
      price: 7899, 
      image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop", 
      hoverImage: "https://images.unsplash.com/photo-1614292264945-5b882e3b5f8e?w=400&h=400&fit=crop",
      badge: "New", 
      rating: "★★★★★", 
      count: 2 
    }
  ],
  earrings: [
    { 
      id: '507f1f77bcf86cd799439078',
      name: "9CT YELLOW GOLD DIAMOND DROP EARRINGS", 
      price: 1999, 
      image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=400&fit=crop", 
      hoverImage: "https://images.unsplash.com/photo-1629639948084-1b6da5a9c3f4?w=400&h=400&fit=crop",
      badge: "Sale", 
      rating: "★★★★★", 
      count: 4 
    },
    { 
      id: '507f1f77bcf86cd799439079',
      name: "9CT WHITE GOLD PEARL STUD EARRINGS", 
      price: 2499, 
      image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=400&fit=crop", 
      hoverImage: "https://images.unsplash.com/photo-1629639948084-1b6da5a9c3f4?w=400&h=400&fit=crop",
      rating: "★★★★★", 
      count: 6 
    },
    { 
      id: '507f1f77bcf86cd799439080',
      name: "9CT ROSE GOLD HOOP EARRINGS", 
      price: 3299, 
      image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=400&fit=crop", 
      hoverImage: "https://images.unsplash.com/photo-1629639948084-1b6da5a9c3f4?w=400&h=400&fit=crop",
      badge: "Popular", 
      rating: "★★★★☆", 
      count: 3 
    },
    { 
      id: '507f1f77bcf86cd799439081',
      name: "9CT WHITE GOLD DIAMOND HUGGIE EARRINGS", 
      price: 4599, 
      image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=400&fit=crop", 
      hoverImage: "https://images.unsplash.com/photo-1629639948084-1b6da5a9c3f4?w=400&h=400&fit=crop",
      rating: "★★★★★", 
      count: 5 
    },
    { 
      id: '507f1f77bcf86cd799439082',
      name: "9CT YELLOW GOLD CHANDELIER EARRINGS", 
      price: 5299, 
      image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=400&fit=crop", 
      hoverImage: "https://images.unsplash.com/photo-1629639948084-1b6da5a9c3f4?w=400&h=400&fit=crop",
      badge: "New", 
      rating: "★★★★★", 
      count: 8 
    },
    { 
      id: '507f1f77bcf86cd799439083',
      name: "9CT WHITE GOLD TEARDROP EARRINGS", 
      price: 3899, 
      image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=400&fit=crop", 
      hoverImage: "https://images.unsplash.com/photo-1629639948084-1b6da5a9c3f4?w=400&h=400&fit=crop",
      rating: "★★★★☆", 
      count: 6 
    }
  ],
  necklaces: [
    { 
      id: '507f1f77bcf86cd799439084',
      name: "9CT WHITE GOLD DIAMOND PENDANT NECKLACE", 
      price: 3999, 
      image: "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=400&h=400&fit=crop", 
      hoverImage: "https://images.unsplash.com/photo-1612728264640-2d1c4b64e2c7?w=400&h=400&fit=crop",
      badge: "Sale", 
      rating: "★★★★★", 
      count: 5 
    },
    { 
      id: '507f1f77bcf86cd799439085',
      name: "9CT YELLOW GOLD HEART LOCKET NECKLACE", 
      price: 4599, 
      image: "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=400&h=400&fit=crop", 
      hoverImage: "https://images.unsplash.com/photo-1612728264640-2d1c4b64e2c7?w=400&h=400&fit=crop",
      rating: "★★★★★", 
      count: 3 
    },
    { 
      id: '507f1f77bcf86cd799439086',
      name: "9CT WHITE GOLD TENNIS NECKLACE", 
      price: 7899, 
      image: "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=400&h=400&fit=crop", 
      hoverImage: "https://images.unsplash.com/photo-1612728264640-2d1c4b64e2c7?w=400&h=400&fit=crop",
      badge: "Premium", 
      rating: "★★★★★", 
      count: 9 
    },
    { 
      id: '507f1f77bcf86cd799439087',
      name: "9CT ROSE GOLD INFINITY NECKLACE", 
      price: 2899, 
      image: "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=400&h=400&fit=crop", 
      hoverImage: "https://images.unsplash.com/photo-1612728264640-2d1c4b64e2c7?w=400&h=400&fit=crop",
      rating: "★★★★☆", 
      count: 4 
    },
    { 
      id: '507f1f77bcf86cd799439088',
      name: "9CT WHITE GOLD CROSS PENDANT NECKLACE", 
      price: 3299, 
      image: "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=400&h=400&fit=crop", 
      hoverImage: "https://images.unsplash.com/photo-1612728264640-2d1c4b64e2c7?w=400&h=400&fit=crop",
      rating: "★★★★★", 
      count: 7 
    },
    { 
      id: '507f1f77bcf86cd799439089',
      name: "9CT YELLOW GOLD LAYERED CHAIN NECKLACE", 
      price: 5199, 
      image: "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=400&h=400&fit=crop", 
      hoverImage: "https://images.unsplash.com/photo-1612728264640-2d1c4b64e2c7?w=400&h=400&fit=crop",
      badge: "Trending", 
      rating: "★★★★★", 
      count: 12 
    }
  ]
};

const TopProducts = ({ setCartItems, setLikedItems }) => {
  const [activeTab, setActiveTab] = useState('rings');
  const [likedProducts, setLikedProducts] = useState(new Set());
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState({});
  const sessionId = localStorage.getItem('sessionId') || uuidv4();

  useEffect(() => {
    if (!localStorage.getItem('sessionId')) {
      localStorage.setItem('sessionId', sessionId);
    }
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setUser(null);
        await fetchCartItems(sessionId);
        await fetchLikedItems(sessionId);
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
        await fetchCartItems(sessionId);
        await fetchLikedItems(sessionId);
        toast.error("Session expired, please log in again", {
          className: styles['men-theme-toast'],
        });
      }
    } catch (err) {
      console.error("Error checking login status", err);
      setUser(null);
      await fetchCartItems(sessionId);
      await fetchLikedItems(sessionId);
      toast.error("Failed to check login status", {
        className: styles['men-theme-toast'],
      });
    }
  };

  const fetchCartItems = async (identifier) => {
    try {
      const token = localStorage.getItem('token');
      const headers = token ? { 'Authorization': `Bearer ${token}` } : {};
      const response = await fetch(`http://localhost:5000/api/cart/${identifier}`, {
        credentials: "include",
        headers,
      });
      if (response.ok) {
        const data = await response.json();
        const normalizedItems = data.map(item => ({
          id: item.productId || item._id,
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
        className: styles['men-theme-toast'],
      });
    }
  };

  const fetchLikedItems = async (identifier) => {
    try {
      const token = localStorage.getItem('token');
      const headers = token ? { 'Authorization': `Bearer ${token}` } : {};
      const response = await fetch(`http://localhost:5000/api/liked/${identifier}`, {
        credentials: "include",
        headers,
      });
      if (response.ok) {
        const data = await response.json();
        const normalizedItems = data.map(item => ({
          id: item.productId || item._id,
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
        className: styles['men-theme-toast'],
      });
    }
  };

  const addToCart = async (productId) => {
    const product = productData[activeTab].find(p => p.id === productId);
    if (!product) {
      toast.error("Product not found", { className: styles['men-theme-toast'] });
      return;
    }

    setLoading(prev => ({ ...prev, [productId]: true }));
    try {
      const token = localStorage.getItem('token');
      const headers = token ? { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' } : { 'Content-Type': 'application/json' };
      const body = user
        ? { productId, name: product.name, price: product.price, imageUrl: product.image }
        : { productId, name: product.name, price: product.price, imageUrl: product.image, sessionId };
      const response = await fetch("http://localhost:5000/api/cart/add", {
        method: "POST",
        headers,
        credentials: "include",
        body: JSON.stringify(body),
      });
      if (response.ok) {
        await fetchCartItems(user ? user.id : sessionId);
        toast.success("Added to Cart!", {
          className: styles['men-theme-toast'],
        });
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add to cart");
      }
    } catch (err) {
      console.error("Error adding to cart:", err);
      toast.error(err.message || "Failed to add to cart", {
        className: styles['men-theme-toast'],
      });
    } finally {
      setLoading(prev => ({ ...prev, [productId]: false }));
    }
  };

  const addToWishlist = async (productId) => {
    const product = productData[activeTab].find(p => p.id === productId);
    if (!product) {
      toast.error("Product not found", { className: styles['men-theme-toast'] });
      return;
    }

    setLoading(prev => ({ ...prev, [productId]: true }));
    try {
      const token = localStorage.getItem('token');
      const headers = token ? { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' } : { 'Content-Type': 'application/json' };
      const endpoint = likedProducts.has(productId) ? "/api/liked/remove" : "/api/liked/add";
      const body = user
        ? { productId, name: product.name, price: product.price, imageUrl: product.image }
        : { productId, name: product.name, price: product.price, imageUrl: product.image, sessionId };
      const response = await fetch(`http://localhost:5000${endpoint}`, {
        method: "POST",
        headers,
        credentials: "include",
        body: JSON.stringify(body),
      });
      if (response.ok) {
        await fetchLikedItems(user ? user.id : sessionId);
        toast.success(likedProducts.has(productId) ? "Removed from Wishlist!" : "Added to Wishlist!", {
          className: styles['men-theme-toast'],
        });
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update wishlist");
      }
    } catch (err) {
      console.error("Error updating wishlist:", err);
      toast.error(err.message || "Failed to update wishlist", {
        className: styles['men-theme-toast'],
      });
    } finally {
      setLoading(prev => ({ ...prev, [productId]: false }));
    }
  };

  const renderProductGrid = (products) => (
    <div className={styles.shopGrid}>
      {products.map((product) => (
        <div key={product.id} className={styles.shopCardWrapper}>
          <Card className={`${styles.shopCard} h-100`}>
            {product.badge && (
              <div className={`${styles.badge} ${styles[product.badge.toLowerCase()]}`}>
                {product.badge}
              </div>
            )}
            <div className={styles.imgBox}>
              <Card.Img 
                className={`${styles.productImg} ${styles.default}`} 
                src={product.image} 
                alt={product.name}
              />
              <Card.Img 
                className={`${styles.productImg} ${styles.hover}`} 
                src={product.hoverImage || product.image} 
                alt={`${product.name} hover`}
              />
            </div>
            <Card.Body className="d-flex flex-column text-center">
              <Card.Title as="p" className={styles.prodTitle}>
                {product.name}
              </Card.Title>
              <p className={styles.rating}>
                {product.rating} 
                <span className={styles.count}>({product.count})</span>
              </p>
              <p className={styles.price}>
                ₹{product.price.toLocaleString()}
              </p>
              <div className={`${styles.actions} mt-auto`}>
                <button 
                  className={styles.btnCart} 
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(product.id);
                  }}
                  disabled={loading[product.id]}
                >
                  {loading[product.id] ? 'Adding...' : 'Add to Cart'}
                </button>
                <button 
                  className={`${styles.btnLike} ${likedProducts.has(product.id) ? styles.liked : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    addToWishlist(product.id);
                  }}
                  disabled={loading[product.id]}
                >
                  <i className={likedProducts.has(product.id) ? "fas fa-heart" : "far fa-heart"}></i>
                </button>
              </div>
            </Card.Body>
          </Card>
        </div>
      ))}
    </div>
  );

  return (
    <Container as="section" className={`${styles.topProductsSection} text-center my-5`}>
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
        theme="dark"
      />
      <h1 className={styles.shopHeading}>TOP PRODUCTS</h1>
      
      {/* Custom Tab Navigation */}
      <div className={styles.customTabs}>
        <button 
          className={`${styles.tabButton} ${activeTab === 'rings' ? styles.active : ''}`}
          onClick={() => setActiveTab('rings')}
        >
          Rings
        </button>
        <button 
          className={`${styles.tabButton} ${activeTab === 'earrings' ? styles.active : ''}`}
          onClick={() => setActiveTab('earrings')}
        >
          Earrings
        </button>
        <button 
          className={`${styles.tabButton} ${activeTab === 'necklaces' ? styles.active : ''}`}
          onClick={() => setActiveTab('necklaces')}
        >
          Necklaces
        </button>
      </div>

      {/* Tab Content */}
      <div className={styles.tabContent}>
        {renderProductGrid(productData[activeTab])}
      </div>
    </Container>
  );
};

export default TopProducts;