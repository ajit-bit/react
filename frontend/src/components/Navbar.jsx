import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Navbar.css';
import logo from '../assets/images/logo-nobg.png';
import searchLogo from '../assets/images/searchlogo.svg';
import likeLogo from '../assets/images/like.svg';
import accountLogo from '../assets/images/acountlogo.svg';
import shopLogo from '../assets/images/shoplogo.svg';

// Inline SVG Icons for the mobile bottom nav and back button
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

const BackIcon = () => (
  <svg className="icon-svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6"></polyline>
  </svg>
);

const Navbar = ({ setCartItems, setLikedItems, cartItems = [], likedItems = [], user, setUser }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [menuLevel, setMenuLevel] = useState(0); // 0 for main menu, 1 for submenu
  const [isCartSidebarOpen, setIsCartSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('cart');
  const [products, setProducts] = useState([]);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showAllJewelryDropdown, setShowAllJewelryDropdown] = useState(false);
  const [showAboutDropdown, setShowAboutDropdown] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const sidebarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target) && !event.target.closest('.icon-bar button') && !event.target.closest('.mobile-bottom-nav button')) {
        setIsCartSidebarOpen(false);
      }
      if (!event.target.closest('.cat-links .all-jewellery') && !event.target.closest('.dropdown-menu')) {
        setShowAllJewelryDropdown(false);
      }
      if (!event.target.closest('.cat-links .about') && !event.target.closest('.dropdown-menu')) {
        setShowAboutDropdown(false);
      }
      if (!event.target.closest('.mobile-menu') && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
        setMenuLevel(0);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobileMenuOpen]);

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
      toast.error("Failed to fetch products", {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchCartItems = async (identifier) => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:5000/api/cart/${identifier}`, {
          credentials: "include",
          headers: token ? { 'Authorization': `Bearer ${token}` } : {},
        });
        if (response.ok) {
          const data = await response.json();
          const normalizedItems = data.map(item => ({
            id: item.productId || item.id,
            name: item.product?.name || item.name,
            price: parseFloat(item.product?.price || item.price || 0),
            imageUrl: item.product?.imageUrl || item.imageUrl || '/images/default-product.jpg'
          }));
          if (setCartItems) setCartItems(normalizedItems);
        }
      } catch (err) {
        console.error("Error fetching cart items:", err);
        toast.error("Failed to fetch cart items", {
          position: 'top-right',
          autoClose: 3000,
        });
      }
    };

    const fetchLikedItems = async (identifier) => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:5000/api/liked/${identifier}`, {
          credentials: "include",
          headers: token ? { 'Authorization': `Bearer ${token}` } : {},
        });
        if (response.ok) {
          const data = await response.json();
          const normalizedItems = data.map(item => ({
            id: item.productId || item.id,
            name: item.product?.name || item.name,
            price: parseFloat(item.product?.price || item.price || 0),
            imageUrl: item.product?.imageUrl || item.imageUrl || '/images/default-product.jpg'
          }));
          if (setLikedItems) setLikedItems(normalizedItems);
        }
      } catch (err) {
        console.error("Error fetching liked items:", err);
        toast.error("Failed to fetch liked items", {
          position: 'top-right',
          autoClose: 3000,
        });
      }
    };

    const sessionId = localStorage.getItem('sessionId') || '';
    const identifier = user ? user.id : sessionId;
    if (identifier) {
      fetchCartItems(identifier);
      fetchLikedItems(identifier);
    }
  }, [user]);

  const addToCart = async (productId) => {
    const identifier = user ? user.id : localStorage.getItem('sessionId') || '';
    if (!identifier) {
      toast.warn("Please login or create a session to add items to cart", {
        position: 'top-right',
        autoClose: 3000,
      });
      navigate('/auth');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch("http://localhost:5000/api/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && { 'Authorization': `Bearer ${token}` }),
        },
        credentials: "include",
        body: JSON.stringify({ productId, userId: user?.id, sessionId: !user ? identifier : undefined })
      });
      if (response.ok) {
        const fetchCartItems = async (identifier) => {
          const response = await fetch(`http://localhost:5000/api/cart/${identifier}`, {
            credentials: "include",
            headers: token ? { 'Authorization': `Bearer ${token}` } : {},
          });
          if (response.ok) {
            const data = await response.json();
            const normalizedItems = data.map(item => ({
              id: item.productId || item.id,
              name: item.product?.name || item.name,
              price: parseFloat(item.product?.price || item.price || 0),
              imageUrl: item.product?.imageUrl || item.imageUrl || '/images/default-product.jpg'
            }));
            if (setCartItems) setCartItems(normalizedItems);
          }
        };
        await fetchCartItems(identifier);
        toast.success("Added to Cart!", {
          position: 'top-right',
          autoClose: 3000,
        });
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || 'Failed to add to cart', {
          position: 'top-right',
          autoClose: 3000,
        });
      }
    } catch (err) {
      console.error("Error adding to cart:", err);
      toast.error("Failed to add to cart", {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  };

  const addToWishlist = async (productId) => {
    const identifier = user ? user.id : localStorage.getItem('sessionId') || '';
    if (!identifier) {
      toast.warn("Please login or create a session to add items to wishlist", {
        position: 'top-right',
        autoClose: 3000,
      });
      navigate('/auth');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch("http://localhost:5000/api/liked/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && { 'Authorization': `Bearer ${token}` }),
        },
        credentials: "include",
        body: JSON.stringify({ productId, userId: user?.id, sessionId: !user ? identifier : undefined })
      });
      if (response.ok) {
        const fetchLikedItems = async (identifier) => {
          const response = await fetch(`http://localhost:5000/api/liked/${identifier}`, {
            credentials: "include",
            headers: token ? { 'Authorization': `Bearer ${token}` } : {},
          });
          if (response.ok) {
            const data = await response.json();
            const normalizedItems = data.map(item => ({
              id: item.productId || item.id,
              name: item.product?.name || item.name,
              price: parseFloat(item.product?.price || item.price || 0),
              imageUrl: item.product?.imageUrl || item.imageUrl || '/images/default-product.jpg'
            }));
            if (setLikedItems) setLikedItems(normalizedItems);
          }
        };
        await fetchLikedItems(identifier);
        toast.success("Added to Wishlist!", {
          position: 'top-right',
          autoClose: 3000,
        });
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || 'Failed to add to wishlist', {
          position: 'top-right',
          autoClose: 3000,
        });
      }
    } catch (err) {
      console.error("Error adding to wishlist:", err);
      toast.error("Failed to add to wishlist", {
        position: 'top-right',
        autoClose: 3000,
      });
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
      if (setCartItems) setCartItems([]);
      if (setLikedItems) setLikedItems([]);
      setShowUserDropdown(false);
      localStorage.removeItem('token');
      navigate("/");
      toast.success("Logged out successfully!", {
        position: 'top-right',
        autoClose: 3000,
      });
    } catch (err) {
      console.error("Logout failed", err);
      toast.error("Failed to log out", {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setMenuLevel(0); // Reset to main menu when toggling
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
    setMenuLevel(0);
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

  const goBack = () => {
    setMenuLevel(0);
  };

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
              <img src={logo} alt="Aisha" />
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
                  <span>Hello, {user.firstName} {user.lastName}</span>
                  <button onClick={(e) => { e.preventDefault(); handleNavigation('/profile'); }}>Profile</button>
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
        {menuLevel === 1 && (
          <div className="mobile-menu-header">
            <button className="back-button" onClick={goBack} aria-label="Go back">
              <BackIcon />
            </button>
            <h2 className="mobile-menu-title">Menu</h2>
          </div>
        )}
        {menuLevel === 0 && (
          <div className="mobile-menu-header">
            <h2 className="mobile-menu-title">Menu</h2>
          </div>
        )}
        <ul>
          {menuLevel === 0 && (
            <>
              <li className={`all-jewellery ${showAllJewelryDropdown ? 'active' : ''}`}>
                <a href="/products" onClick={(e) => { e.preventDefault(); setShowAllJewelryDropdown(!showAllJewelryDropdown); setMenuLevel(1); }}>
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
              <li className={`about ${showAboutDropdown ? 'active' : ''}`}>
                <a href="/about" onClick={(e) => { e.preventDefault(); setShowAboutDropdown(!showAboutDropdown); setMenuLevel(1); }}>
                  About
                </a>
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
                <a href="/auth" onClick={(e) => { e.preventDefault(); handleNavigation(user ? '/profile' : '/auth'); }}>
                  {user ? `Hello, ${user.firstName}` : 'Login/Sign Up'}
                </a>
              </li>
            </>
          )}
          {menuLevel === 1 && showAllJewelryDropdown && (
            <div className="dropdown-menu">
              <a href="#" onClick={(e) => { e.preventDefault(); handleNavigation('/category/earrings'); }}>Earrings</a>
              <a href="#" onClick={(e) => { e.preventDefault(); handleNavigation('/category/rings'); }}>Rings</a>
              <a href="#" onClick={(e) => { e.preventDefault(); handleNavigation('/category/necklaces'); }}>Necklaces</a>
              <a href="#" onClick={(e) => { e.preventDefault(); handleNavigation('/category/bracelets'); }}>Bracelets</a>
              <a href="#" onClick={(e) => { e.preventDefault(); handleNavigation('/jewellery-sets'); }}>Jewellery Sets</a>
            </div>
          )}
          {menuLevel === 1 && showAboutDropdown && (
            <div className="dropdown-menu">
              <a href="#" onClick={(e) => { e.preventDefault(); handleNavigation('/our-story'); }}>Our Story</a>
              <a href="#" onClick={(e) => { e.preventDefault(); handleNavigation('/craftsmanship'); }}>Craftsmanship</a>
              <a href="#" onClick={(e) => { e.preventDefault(); handleNavigation('/sustainability'); }}>Sustainability</a>
              <a href="#" onClick={(e) => { e.preventDefault(); handleNavigation('/testimonials'); }}>Testimonials</a>
              <a href="#" onClick={(e) => { e.preventDefault(); handleNavigation('/contact'); }}>Contact Us</a>
            </div>
          )}
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
            Wishlist
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
          <h2>WISHLIST</h2>
          <hr />
          {likedItems.length === 0 ? (
            <div>
              <p className="empty-message">No liked items yet.</p>
              <img src={likeLogo} alt="Liked Items" onClick={(e) => { e.preventDefault(); navigate('/wishlist'); }} style={{ width: '40px', height: '40px', cursor: 'pointer', margin: '20px auto', display: 'block' }} />
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
              <span>{user ? 'Profile' : 'Account'}</span>
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