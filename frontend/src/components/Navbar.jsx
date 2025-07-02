import React, { useState, useEffect, useRef } from 'react';
import './Navbar.css';
import { useNavigate } from 'react-router-dom';

// Import custom SVG icons
import searchLogo from '../../images/searchlogo.svg';
import likeLogo from '../../images/like.svg';
import accountLogo from '../../images/acountlogo.svg';
import shopLogo from '../../images/shoplogo.svg';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartSidebarOpen, setIsCartSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('cart');
  const [user, setUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [likedItems, setLikedItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showAllJewelryDropdown, setShowAllJewelryDropdown] = useState(false);
  const [showAboutDropdown, setShowAboutDropdown] = useState(false);
  const navigate = useNavigate();
  const sidebarRef = useRef(null);

  useEffect(() => {
    checkLoginStatus();
    fetchProducts();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target) && !event.target.closest('.icon-bar button')) {
        setIsCartSidebarOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const checkLoginStatus = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/me", {
        credentials: "include"
      });

      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
        await fetchCartItems(data.user.id);
        await fetchLikedItems(data.user.id);
      } else {
        setUser(null);
        setCartItems([]);
        setLikedItems([]);
      }
    } catch (err) {
      console.error("Error checking login status", err);
      setUser(null);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/products", {
        credentials: "include"
      });
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      }
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  const fetchCartItems = async (userId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/cart/${userId}`, {
        credentials: "include"
      });
      if (response.ok) {
        const data = await response.json();
        const normalizedItems = data.map(item => ({
          id: item.productId || item.id,
          name: item.product?.name || item.name,
          price: parseFloat(item.product?.price || item.price || 0),
          imageUrl: item.product?.imageUrl || item.imageUrl || '/images/default-product.jpg'
        }));
        setCartItems(normalizedItems);
      }
    } catch (err) {
      console.error("Error fetching cart items:", err);
    }
  };

  const fetchLikedItems = async (userId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/liked/${userId}`, {
        credentials: "include"
      });
      if (response.ok) {
        const data = await response.json();
        const normalizedItems = data.map(item => ({
          id: item.productId || item.id,
          name: item.product?.name || item.name,
          price: parseFloat(item.product?.price || item.price || 0),
          imageUrl: item.product?.imageUrl || item.imageUrl || '/images/default-product.jpg'
        }));
        setLikedItems(normalizedItems);
      }
    } catch (err) {
      console.error("Error fetching liked items:", err);
    }
  };

  const addToCart = async (productId) => {
    if (!user) {
      alert('Please login to add items to cart');
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({ productId })
      });
      if (response.ok) {
        await fetchCartItems(user.id);
      }
    } catch (err) {
      console.error("Error adding to cart:", err);
    }
  };

  const addToWishlist = async (productId) => {
    if (!user) {
      alert('Please login to add items to wishlist');
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/liked/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({ productId })
      });
      if (response.ok) {
        await fetchLikedItems(user.id);
      }
    } catch (err) {
      console.error("Error adding to wishlist:", err);
    }
  };

  const logout = async () => {
    try {
      await fetch("http://localhost:5000/api/auth/logout", {
        method: "POST",
        credentials: "include"
      });
      setUser(null);
      setCartItems([]);
      setLikedItems([]);
      setShowUserDropdown(false);
      navigate("/");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleCartSidebar = (tab = 'cart') => {
    setActiveTab(tab);
    setIsCartSidebarOpen(!isCartSidebarOpen);
    if (!isCartSidebarOpen) setIsMobileMenuOpen(false); // Close mobile menu when opening sidebar
  };

  const closeAllMenus = () => {
    setIsMobileMenuOpen(false);
    setIsCartSidebarOpen(false);
    setShowUserDropdown(false);
    setShowAllJewelryDropdown(false);
    setShowAboutDropdown(false);
  };

  const openTab = (tabName) => {
    setActiveTab(tabName);
  };

  const toggleAllJewelryDropdown = () => {
    setShowAllJewelryDropdown(!showAllJewelryDropdown);
    setShowAboutDropdown(false);
  };

  const toggleAboutDropdown = () => {
    setShowAboutDropdown(!showAboutDropdown);
    setShowAllJewelryDropdown(false);
  };

  const handleNavigation = (path) => {
    navigate(path);
    closeAllMenus();
  };

  const cartTotal = cartItems.reduce((sum, item) => sum + (item.price || 0), 0);

  return (
    <>
      <header className="navbar-header">
        <div className="promo">
          FREE JEWELLERY ORGANIZER WORTH ₹400 ON ORDERS ABOVE RS. 1500
        </div>

        <div className="nav-row">
          <button 
            className={`burger ${isMobileMenuOpen ? 'open' : ''}`}
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            <span></span>
          </button>

          <div className="logo">
            <a href="/">
              <img src="/images/logo-nobg.png" alt="Aisha" />
            </a>
          </div>

          <nav className="icon-bar" aria-label="Quick actions">
            <a href="#" aria-label="Search">
              <img src={searchLogo} alt="Search" className="icon-svg" />
            </a>
            
            <button 
              className="icon-link"
              onClick={() => toggleCartSidebar('liked')}
              aria-label="Wishlist"
            >
              <img src={likeLogo} alt="Wishlist" className="icon-svg" />
              {likedItems.length > 0 && (
                <span className="badge">{likedItems.length}</span>
              )}
            </button>

            <div className="account-wrapper">
              <button 
                className="account-button"
                onClick={() => handleNavigation('/auth')}
                aria-label="Account"
              >
                <img src={accountLogo} alt="Account" className="icon-svg" />
              </button>
              
              {user && showUserDropdown && (
                <div className="account-dropdown">
                  <span>Hello, {user.firstName}</span>
                  <button onClick={logout}>Logout</button>
                </div>
              )}
            </div>

            <button 
              className="icon-link"
              onClick={() => toggleCartSidebar('cart')}
              aria-label="Shopping cart"
            >
              <img src={shopLogo} alt="Shopping cart" className="icon-svg" />
              {cartItems.length > 0 && (
                <span className="badge">{cartItems.length}</span>
              )}
            </button>
          </nav>
        </div>

        <nav className="cat-strip" aria-label="Primary navigation">
          <ul className="cat-links">
            <li className={`all-jewellery ${showAllJewelryDropdown ? 'active' : ''}`}>
              <a href="/products" onClick={(e) => { e.preventDefault(); toggleAllJewelryDropdown(); }}>
                All Jewellery
              </a>
              {showAllJewelryDropdown && (
                <div className="dropdown-menu">
                  <a href="#" onClick={() => handleNavigation('/category/earrings')}>Earrings</a>
                  <a href="#" onClick={() => handleNavigation('/category/rings')}>Rings</a>
                  <a href="#" onClick={() => handleNavigation('/category/necklaces')}>Necklaces</a>
                  <a href="#" onClick={() => handleNavigation('/category/bracelets')}>Bracelets</a>
                  <a href="#" onClick={() => handleNavigation('/jewellery-sets')}>Jewellery Sets</a>
                </div>
              )}
            </li>
            <li><a href="/collections" onClick={() => handleNavigation('/collections')}>Collections</a></li>
            <li><a href="/new-arrivals" onClick={() => handleNavigation('/new-arrivals')}>New Arrivals</a></li>
            <li><a href="/new-arrivals" onClick={() => handleNavigation('/new-arrivals')}>Best Seller</a></li>
            <li className={`about ${showAboutDropdown ? 'active' : ''}`}>
              <a href="/about" onClick={(e) => { e.preventDefault(); toggleAboutDropdown(); }}>
                About
              </a>
              {showAboutDropdown && (
                <div className="dropdown-menu">
                  <a href="#" onClick={() => handleNavigation('/our-story')}>Our Story</a>
                  <a href="#" onClick={() => handleNavigation('/blogs')}>Blogs</a>
                  <a href="#" onClick={() => handleNavigation('/contact')}>Contact Us</a>
                </div>
              )}
            </li>
          </ul>
        </nav>

        <nav className="gender-strip" aria-label="Shop by gender">
          <a href="/women" onClick={() => handleNavigation('/women')}>WOMEN</a>
          <span>|</span>
          <a href="/men" onClick={() => handleNavigation('/men')}>MEN</a>
        </nav>
      </header>

      {/* Mobile Menu */}
      <aside className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        <ul>
          <li className={`all-jewellery ${showAllJewelryDropdown ? 'active' : ''}`}>
            <a href="/products" onClick={(e) => { e.preventDefault(); toggleAllJewelryDropdown(); }}>All Jewellery</a>
            {showAllJewelryDropdown && (
              <div className="dropdown-menu">
                <a href="#" onClick={() => handleNavigation('/category/earrings')}>Earrings</a>
                <a href="#" onClick={() => handleNavigation('/category/rings')}>Rings</a>
                <a href="#" onClick={() => handleNavigation('/category/necklaces')}>Necklaces</a>
                <a href="#" onClick={() => handleNavigation('/category/bracelets')}>Bracelets</a>
                <a href="#" onClick={() => handleNavigation('/jewellery-sets')}>Jewellery Sets</a>
              </div>
            )}
          </li>
          <li><a href="/collections" onClick={() => handleNavigation('/collections')}>Collections</a></li>
          <li><a href="/new-arrivals" onClick={() => handleNavigation('/new-arrivals')}>New Arrivals</a></li>
          <li className={`about ${showAboutDropdown ? 'active' : ''}`}>
            <a href="/about" onClick={(e) => { e.preventDefault(); toggleAboutDropdown(); }}>About</a>
            {showAboutDropdown && (
              <div className="dropdown-menu">
                <a href="#" onClick={() => handleNavigation('/our-story')}>Our Story</a>
                <a href="#" onClick={() => handleNavigation('/craftsmanship')}>Craftsmanship</a>
                <a href="#" onClick={() => handleNavigation('/sustainability')}>Sustainability</a>
                <a href="#" onClick={() => handleNavigation('/testimonials')}>Testimonials</a>
                <a href="#" onClick={() => handleNavigation('/contact')}>Contact Us</a>
              </div>
            )}
          </li>
        </ul>
      </aside>

      {/* Overlay */}
      {(isMobileMenuOpen || isCartSidebarOpen) && (
        <div className="overlay" onClick={closeAllMenus}></div>
      )}

      {/* Cart Sidebar */}
      <aside className={`cart-sidebar ${isCartSidebarOpen ? 'open' : ''}`} ref={sidebarRef}>
        <div className="tab-buttons">
          <button 
            className={`tab-link ${activeTab === 'cart' ? 'active' : ''}`}
            onClick={() => openTab('cart')}
          >
            Cart
          </button>
          <button 
            className={`tab-link ${activeTab === 'liked' ? 'active' : ''}`}
            onClick={() => openTab('liked')}
          >
            Liked
          </button>
        </div>

        <div className={`tab-content ${activeTab === 'cart' ? 'active' : ''}`}>
          <h2>SHOPPING CART</h2>
          <hr />
          {cartItems.length === 0 ? (
            <div>
              <p className="empty-message">Your cart is empty.</p>
              <img src={shopLogo} alt="Shopping Cart" onClick={() => navigate('/bag')} style={{ width: '40px', height: '40px', cursor: 'pointer', margin: '20px auto', display: 'block' }} />
            </div>
          ) : (
            <div className="items-container">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item">
                  <img src={item.imageUrl} alt={item.name} />
                  <h3>{item.name}</h3>
                  <p>₹{item.price.toFixed(2)}</p>
                </div>
              ))}
            </div>
          )}
          <div className="subtotal">Subtotal: ₹{cartTotal.toFixed(2)}</div>
          <button className="return-to-shop" onClick={closeAllMenus}>
            RETURN TO SHOP
          </button>
          <button className="proceed-checkout">
            PROCEED TO SECURE CHECKOUT
          </button>
        </div>

        <div className={`tab-content ${activeTab === 'liked' ? 'active' : ''}`}>
          <h2>LIKED</h2>
          <hr />
          {likedItems.length === 0 ? (
            <div>
              <p className="empty-message">No liked items yet.</p>
              <img src={likeLogo} alt="Liked Items" onClick={() => navigate('/liked')} style={{ width: '40px', height: '40px', cursor: 'pointer', margin: '20px auto', display: 'block' }} />
            </div>
          ) : (
            <div className="items-container">
              {likedItems.map((item) => (
                <div key={item.id} className="liked-item">
                  <img src={item.imageUrl} alt={item.name} />
                  <h3>{item.name}</h3>
                  <p>₹{item.price.toFixed(2)}</p>
                </div>
              ))}
            </div>
          )}
          <button className="return-to-shop" onClick={closeAllMenus}>
            GO TO WISHLIST
          </button>
        </div>
      </aside>

      {/* Products Grid */}
      {products.length > 0 && (
        <main className="products-section">
          <div className="product-grid">
            {products.map((product) => (
              <div key={product.id} className="product-card">
                <img src={product.imageUrl || '/images/default-product.jpg'} alt={product.name} />
                <h3>{product.name}</h3>
                <p>₹{product.price.toFixed(2)}</p>
                <div className="product-actions">
                  <button onClick={() => addToCart(product.id)}>Add to Cart</button>
                  <button onClick={() => addToWishlist(product.id)}>Add to Wishlist</button>
                </div>
              </div>
            ))}
          </div>
        </main>
      )}
    </>
  );
};

export default Navbar;