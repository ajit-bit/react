import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';
import searchLogo from '../../images/searchlogo.svg';
import likeLogo from '../../images/like.svg';
import accountLogo from '../../images/acountlogo.svg';
import shopLogo from '../../images/shoplogo.svg';

// Inline SVG Icons for the mobile bottom nav
const CategoriesIcon = () => (
  <svg className="icon-svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7"></rect>
    <rect x="14" y="3" width="7" height="7"></rect>
    <rect x="3" y="14" width="7" height="7"></rect>
    <rect x="14" y="14" width="7" height="7"></rect>
  </svg>
);

const TopIcon = () => (
  <svg className="icon-svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="18 15 12 9 6 15"></polyline>
  </svg>
);


const Navbar = ({ setCartItems, setLikedItems }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartSidebarOpen, setIsCartSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('cart');
  const [user, setUser] = useState(null);
  const [cartItems, setCartItemsLocal] = useState([]);
  const [likedItems, setLikedItemsLocal] = useState([]);
  const [products, setProducts] = useState([]);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showAllJewelryDropdown, setShowAllJewelryDropdown] = useState(false);
  const [showAboutDropdown, setShowAboutDropdown] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const sidebarRef = useRef(null);

  useEffect(() => {
    checkLoginStatus();
    fetchProducts();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target) && !event.target.closest('.icon-bar button') && !event.target.closest('.mobile-bottom-nav button')) {
        setIsCartSidebarOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const checkLoginStatus = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setUser(null);
        return;
      }
      
      const res = await fetch("http://localhost:5000/api/auth/me", {
        credentials: "include",
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
        await fetchCartItems(data.user.id);
        await fetchLikedItems(data.user.id);
      } else {
        setUser(null);
        setCartItemsLocal([]);
        setLikedItemsLocal([]);
        localStorage.removeItem('token');
      }
    } catch (err) {
      console.error("Error checking login status", err);
      setUser(null);
      localStorage.removeItem('token');
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
        credentials: "include",
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        const normalizedItems = data.map(item => ({
          id: item.productId || item.id,
          name: item.product?.name || item.name,
          price: parseFloat(item.product?.price || item.price || 0),
          imageUrl: item.product?.imageUrl || item.imageUrl || '/images/default-product.jpg'
        }));
        setCartItemsLocal(normalizedItems);
        if (setCartItems) setCartItems(normalizedItems);
      }
    } catch (err) {
      console.error("Error fetching cart items:", err);
    }
  };

  const fetchLikedItems = async (userId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/liked/${userId}`, {
        credentials: "include",
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        const normalizedItems = data.map(item => ({
          id: item.productId || item.id,
          name: item.product?.name || item.name,
          price: parseFloat(item.product?.price || item.price || 0),
          imageUrl: item.product?.imageUrl || item.imageUrl || '/images/default-product.jpg'
        }));
        setLikedItemsLocal(normalizedItems);
        if (setLikedItems) setLikedItems(normalizedItems);
      }
    } catch (err) {
      console.error("Error fetching liked items:", err);
    }
  };

  const addToCart = async (productId) => {
    if (!user) {
      navigate('/auth');
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        credentials: "include",
        body: JSON.stringify({ productId, userId: user.id })
      });
      if (response.ok) {
        await fetchCartItems(user.id);
      } else {
        const errorData = await response.json();
        alert(errorData.message || 'Failed to add to cart');
      }
    } catch (err) {
      console.error("Error adding to cart:", err);
    }
  };

  const addToWishlist = async (productId) => {
    if (!user) {
      navigate('/auth');
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/liked/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        credentials: "include",
        body: JSON.stringify({ productId, userId: user.id })
      });
      if (response.ok) {
        await fetchLikedItems(user.id);
      } else {
        const errorData = await response.json();
        alert(errorData.message || 'Failed to add to wishlist');
      }
    } catch (err)
      {
      console.error("Error adding to wishlist:", err);
    }
  };

  const logout = async () => {
    try {
      await fetch("http://localhost:5000/api/auth/logout", {
        method: "POST",
        credentials: "include",
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setUser(null);
      setCartItemsLocal([]);
      setLikedItemsLocal([]);
      if (setCartItems) setCartItems([]);
      if (setLikedItems) setLikedItems([]);
      setShowUserDropdown(false);
      localStorage.removeItem('token');
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
    if (!isCartSidebarOpen) setIsMobileMenuOpen(false);
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

  const handleProfileClick = () => {
    if (user) {
      setShowUserDropdown(!showUserDropdown);
    } else {
      handleNavigation('/auth');
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const cartTotal = cartItems.reduce((sum, item) => sum + (item.price || 0), 0);

  const isMenRoute = location.pathname === '/men';

  return (
    <>
      <header className={`navbar-header ${isMenRoute ? 'men-theme' : ''}`}>
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
            <a href="/" onClick={(e) => { e.preventDefault(); handleNavigation('/'); }}>
              <img src="/images/logo-nobg.png" alt="Aisha" />
            </a>
          </div>

          <nav className="icon-bar" aria-label="Quick actions">
            <button 
              className="icon-link"
              onClick={(e) => { e.preventDefault(); handleNavigation('/search'); }}
              aria-label="Search"
            >
              <img src={searchLogo} alt="Search" className="icon-svg" />
            </button>
            
            <button 
              className="icon-link"
              onClick={(e) => { e.preventDefault(); toggleCartSidebar('liked'); }}
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
                onClick={(e) => { e.preventDefault(); handleProfileClick(); }}
                aria-label="Account"
              >
                <img src={accountLogo} alt="Account" className="icon-svg" />
              </button>
              
              {user && showUserDropdown && (
                <div className="account-dropdown">
                  <span>Hello, {user.firstName}</span>
                  <button onClick={(e) => { e.preventDefault(); logout(); }}>Logout</button>
                </div>
              )}
            </div>

            <button 
              className="icon-link"
              onClick={(e) => { e.preventDefault(); toggleCartSidebar('cart'); }}
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
                  <a href="#" onClick={(e) => { e.preventDefault(); handleNavigation('/category/earrings'); }}>Earrings</a>
                  <a href="#" onClick={(e) => { e.preventDefault(); handleNavigation('/category/rings'); }}>Rings</a>
                  <a href="#" onClick={(e) => { e.preventDefault(); handleNavigation('/category/necklaces'); }}>Necklaces</a>
                  <a href="#" onClick={(e) => { e.preventDefault(); handleNavigation('/category/bracelets'); }}>Bracelets</a>
                  <a href="#" onClick={(e) => { e.preventDefault(); handleNavigation('/jewellery-sets'); }}>Jewellery Sets</a>
                </div>
              )}
            </li>
            <li><a href="/collections" onClick={(e) => { e.preventDefault(); handleNavigation('/collections'); }}>Collections</a></li>
            <li><a href="/new-arrivals" onClick={(e) => { e.preventDefault(); handleNavigation('/new-arrivals'); }}>New Arrivals</a></li>
            <li><a href="/new-arrivals" onClick={(e) => { e.preventDefault(); handleNavigation('/new-arrivals'); }}>Best Seller</a></li>
            <li className={`about ${showAboutDropdown ? 'active' : ''}`}>
              <a href="/about" onClick={(e) => { e.preventDefault(); toggleAboutDropdown(); }}>
                About
              </a>
              {showAboutDropdown && (
                <div className="dropdown-menu">
                  <a href="#" onClick={(e) => { e.preventDefault(); handleNavigation('/our-story'); }}>Our Story</a>
                  <a href="#" onClick={(e) => { e.preventDefault(); handleNavigation('/blogs'); }}>Blogs</a>
                  <a href="#" onClick={(e) => { e.preventDefault(); handleNavigation('/contact'); }}>Contact Us</a>
                </div>
              )}
            </li>
          </ul>
        </nav>

        <nav className="gender-strip" aria-label="Shop by gender">
          <a href="/women" onClick={(e) => { e.preventDefault(); handleNavigation('/women'); }}>WOMEN</a>
          <span>|</span>
          <a href="/men" onClick={(e) => { e.preventDefault(); handleNavigation('/men'); }}>MEN</a>
        </nav>
      </header>

      <aside className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        <ul>
          <li className={`all-jewellery ${showAllJewelryDropdown ? 'active' : ''}`}>
            <a href="/products" onClick={(e) => { e.preventDefault(); toggleAllJewelryDropdown(); }}>All Jewellery</a>
            {showAllJewelryDropdown && (
              <div className="dropdown-menu">
                <a href="#" onClick={(e) => { e.preventDefault(); handleNavigation('/category/earrings'); }}>Earrings</a>
                <a href="#" onClick={(e) => { e.preventDefault(); handleNavigation('/category/rings'); }}>Rings</a>
                <a href="#" onClick={(e) => { e.preventDefault(); handleNavigation('/category/necklaces'); }}>Necklaces</a>
                <a href="#" onClick={(e) => { e.preventDefault(); handleNavigation('/category/bracelets'); }}>Bracelets</a>
                <a href="#" onClick={(e) => { e.preventDefault(); handleNavigation('/jewellery-sets'); }}>Jewellery Sets</a>
              </div>
            )}
          </li>
          <li><a href="/collections" onClick={(e) => { e.preventDefault(); handleNavigation('/collections'); }}>Collections</a></li>
          <li><a href="/new-arrivals" onClick={(e) => { e.preventDefault(); handleNavigation('/new-arrivals'); }}>New Arrivals</a></li>
          <li className={`about ${showAboutDropdown ? 'active' : ''}`}>
            <a href="/about" onClick={(e) => { e.preventDefault(); toggleAboutDropdown(); }}>About</a>
            {showAboutDropdown && (
              <div className="dropdown-menu">
                <a href="#" onClick={(e) => { e.preventDefault(); handleNavigation('/our-story'); }}>Our Story</a>
                <a href="#" onClick={(e) => { e.preventDefault(); handleNavigation('/craftsmanship'); }}>Craftsmanship</a>
                <a href="#" onClick={(e) => { e.preventDefault(); handleNavigation('/sustainability'); }}>Sustainability</a>
                <a href="#" onClick={(e) => { e.preventDefault(); handleNavigation('/testimonials'); }}>Testimonials</a>
                <a href="#" onClick={(e) => { e.preventDefault(); handleNavigation('/contact'); }}>Contact Us</a>
              </div>
            )}
          </li>
          <li>
            <a href="/auth" onClick={(e) => { e.preventDefault(); handleNavigation('/auth'); }}>
              {user ? 'Profile' : 'Login/Sign Up'}
            </a>
          </li>
        </ul>
      </aside>

      {(isMobileMenuOpen || isCartSidebarOpen) && (
        <div className="overlay" onClick={closeAllMenus}></div>
      )}

      <aside className={`cart-sidebar ${isCartSidebarOpen ? 'open' : ''} ${isMenRoute ? 'men-theme' : ''}`} ref={sidebarRef}>
        <div className="tab-buttons">
          <button 
            className={`tab-link ${activeTab === 'cart' ? 'active' : ''}`}
            onClick={(e) => { e.preventDefault(); openTab('cart'); }}
          >
            Cart
          </button>
          <button 
            className={`tab-link ${activeTab === 'liked' ? 'active' : ''}`}
            onClick={(e) => { e.preventDefault(); openTab('liked'); }}
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
              <img src={shopLogo} alt="Shopping Cart" onClick={(e) => { e.preventDefault(); navigate('/bag'); }} style={{ width: '40px', height: '40px', cursor: 'pointer', margin: '20px auto', display: 'block' }} />
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
          <button className="return-to-shop" onClick={(e) => { e.preventDefault(); closeAllMenus(); }}>
            RETURN TO SHOP
          </button>
          <button className="proceed-checkout" onClick={(e) => { e.preventDefault(); navigate('/checkout'); }}>
            PROCEED TO SECURE CHECKOUT
          </button>
        </div>

        <div className={`tab-content ${activeTab === 'liked' ? 'active' : ''}`}>
          <h2>LIKED</h2>
          <hr />
          {likedItems.length === 0 ? (
            <div>
              <p className="empty-message">No liked items yet.</p>
              <img src={likeLogo} alt="Liked Items" onClick={(e) => { e.preventDefault(); navigate('/liked'); }} style={{ width: '40px', height: '40px', cursor: 'pointer', margin: '20px auto', display: 'block' }} />
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
          <button className="return-to-shop" onClick={(e) => { e.preventDefault(); closeAllMenus(); }}>
            GO TO WISHLIST
          </button>
        </div>
      </aside>

      {products.length > 0 && (
        <main className="products-section">
          <div className="product-grid">
            {products.map((product) => (
              <div key={product.id} className="product-card">
                <img src={product.imageUrl || '/images/default-product.jpg'} alt={product.name} />
                <h3>{product.name}</h3>
                <p>₹{product.price.toFixed(2)}</p>
                <div className="product-actions">
                  <button onClick={(e) => { e.preventDefault(); addToCart(product.id); }}>Add to Cart</button>
                  <button onClick={(e) => { e.preventDefault(); addToWishlist(product.id); }}>Add to Wishlist</button>
                </div>
              </div>
            ))}
          </div>
        </main>
      )}
      
      <div className="mobile-bottom-nav">
          <button onClick={() => handleNavigation(user ? '/profile' : '/auth')}>
              <img src={accountLogo} alt="Account" className="icon-svg"/>
              <span>Account</span>
          </button>
          <button onClick={toggleMobileMenu}>
              <CategoriesIcon />
              <span>Categories</span>
          </button>
          <button className="cart-button" onClick={() => toggleCartSidebar('cart')}>
              <img src={shopLogo} alt="Cart" className="icon-svg"/>
              {cartItems.length > 0 && <span className="badge">{cartItems.length}</span>}
              <span>Cart</span>
          </button>
          <button onClick={() => handleNavigation('/search')}>
              <img src={searchLogo} alt="Search" className="icon-svg"/>
              <span>Search</span>
          </button>
          <button onClick={scrollToTop}>
              <TopIcon />
              <span>Top</span>
          </button>
      </div>

    </>
  );
};

export default Navbar;