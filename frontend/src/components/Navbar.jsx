import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './Navbar.module.css';
import logo from '../assets/images/logo-nobg.png';
import likeLogo from '../assets/images/like.svg';
import accountLogo from '../assets/images/acountlogo.svg';
import shopLogo from '../assets/images/shoplogo.svg';

// Inline SVG Icons
const CategoriesIcon = () => (
  <svg className={styles['icon-svg']} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7"></rect>
    <rect x="14" y="3" width="7" height="7"></rect>
    <rect x="3" y="14" width="7" height="7"></rect>
    <rect x="14" y="14" width="7" height="7"></rect>
  </svg>
);

const TopIcon = () => (
  <svg className={styles['icon-svg']} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="18 15 12 9 6 15"></polyline>
  </svg>
);

const BackIcon = () => (
  <svg className={styles['icon-svg']} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6"></polyline>
  </svg>
);

const SearchIcon = () => (
  <svg className={styles['icon-svg']} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

const CloseIcon = () => (
  <svg className={styles['icon-svg']} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const Navbar = ({ setCartItems, setLikedItems, cartItems = [], likedItems = [], user, setUser, products = [] }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [menuLevel, setMenuLevel] = useState(0);
  const [isCartSidebarOpen, setIsCartSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('cart');
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showAllJewelryDropdown, setShowAllJewelryDropdown] = useState(false);
  const [showAboutDropdown, setShowAboutDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchPopup, setShowSearchPopup] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const sidebarRef = useRef(null);
  const accountDropdownRef = useRef(null);
  const searchPopupRef = useRef(null);

  const toastOptions = {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: 'light',
    className: styles['women-theme-toast'],
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close cart sidebar if clicking outside
      if (sidebarRef.current && !sidebarRef.current.contains(event.target) && !event.target.closest(`.${styles['icon-bar']} button`) && !event.target.closest(`.${styles['mobile-bottom-nav']} button`)) {
        setIsCartSidebarOpen(false);
      }
      // Close all jewelry dropdown if clicking outside
      if (!event.target.closest(`.${styles['cat-links']} .${styles['all-jewellery']}`) && !event.target.closest(`.${styles['dropdown-menu']}`)) {
        setShowAllJewelryDropdown(false);
      }
      // Close about dropdown if clicking outside
      if (!event.target.closest(`.${styles['cat-links']} .${styles.about}`) && !event.target.closest(`.${styles['dropdown-menu']}`)) {
        setShowAboutDropdown(false);
      }
      // Close mobile menu if clicking outside
      if (!event.target.closest(`.${styles['mobile-menu']}`) && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
        setMenuLevel(0);
      }
      // Close account dropdown if clicking outside
      if (accountDropdownRef.current && !accountDropdownRef.current.contains(event.target) && !event.target.closest(`.${styles['account-button']}`)) {
        setShowUserDropdown(false);
      }
      // Close search popup if clicking on the overlay
      if (searchPopupRef.current && !searchPopupRef.current.contains(event.target) && event.target.closest(`.${styles['search-popup-overlay']}`)) {
        setShowSearchPopup(false);
        setSearchQuery('');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobileMenuOpen, showSearchPopup, showUserDropdown]);

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
            id: item.productId || item._id,
            name: item.name,
            price: parseFloat(item.price || 0),
            imageUrl: item.imageUrl || '/images/default-product.jpg',
            quantity: item.quantity || 1,
          }));
          if (setCartItems) setCartItems(normalizedItems);
        } else {
          console.error("Failed to fetch cart items:", response.status);
          toast.error("Failed to fetch cart items", toastOptions);
        }
      } catch (err) {
        console.error("Error fetching cart items:", err);
        toast.error("Failed to fetch cart items", toastOptions);
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
            id: item.productId || item._id,
            name: item.name,
            price: parseFloat(item.price || 0),
            imageUrl: item.imageUrl || '/images/default-product.jpg',
          }));
          if (setLikedItems) setLikedItems(normalizedItems);
        } else {
          console.error("Failed to fetch liked items:", response.status);
          toast.error("Failed to fetch liked items", toastOptions);
        }
      } catch (err) {
        console.error("Error fetching liked items:", err);
        toast.error("Failed to fetch liked items", toastOptions);
      }
    };

    const identifier = user ? user.id : localStorage.getItem('sessionId') || '';
    if (identifier) {
      fetchCartItems(identifier);
      fetchLikedItems(identifier);
    }
  }, [user, setCartItems, setLikedItems]);

  const addToCart = async (productId) => {
    const identifier = user ? user.id : localStorage.getItem('sessionId') || '';
    if (!identifier) {
      toast.warn("Please login or create a session to add items to cart", toastOptions);
      navigate('/auth');
      return;
    }
    try {
      const token = localStorage.getItem('token');
      const product = products.find(p => p.id === productId);
      const response = await fetch("http://localhost:5000/api/cart/add", {
        method: "POST",
        headers: { "Content-Type": "application/json", ...(token && { 'Authorization': `Bearer ${token}` }) },
        credentials: "include",
        body: JSON.stringify({ 
          productId, 
          name: product?.name || 'Unknown Product', 
          price: product?.price || 0, 
          imageUrl: product?.imageUrl || '/images/default-product.jpg',
          userId: user?.id, 
          sessionId: !user ? identifier : undefined 
        })
      });
      if (response.ok) {
        const data = await response.json();
        const normalizedItems = data.cartItems.map(item => ({
          id: item.productId || item._id,
          name: item.name,
          price: parseFloat(item.price || 0),
          imageUrl: item.imageUrl || '/images/default-product.jpg',
          quantity: item.quantity || 1,
        }));
        if (setCartItems) setCartItems(normalizedItems);
        toast.success("Added to Cart!", toastOptions);
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || 'Failed to add to cart', toastOptions);
      }
    } catch (err) {
      console.error("Error adding to cart:", err);
      toast.error("Failed to add to cart", toastOptions);
    }
  };

  const addToWishlist = async (productId) => {
    const identifier = user ? user.id : localStorage.getItem('sessionId') || '';
    if (!identifier) {
      toast.warn("Please login or create a session to add items to wishlist", toastOptions);
      navigate('/auth');
      return;
    }
    try {
      const token = localStorage.getItem('token');
      const product = products.find(p => p.id === productId);
      const response = await fetch("http://localhost:5000/api/liked/add", {
        method: "POST",
        headers: { "Content-Type": "application/json", ...(token && { 'Authorization': `Bearer ${token}` }) },
        credentials: "include",
        body: JSON.stringify({ 
          productId, 
          name: product?.name || 'Unknown Product', 
          price: product?.price || 0, 
          imageUrl: product?.imageUrl || '/images/default-product.jpg',
          userId: user?.id, 
          sessionId: !user ? identifier : undefined 
        })
      });
      if (response.ok) {
        const identifier = user ? user.id : localStorage.getItem('sessionId') || '';
        const fetchResponse = await fetch(`http://localhost:5000/api/liked/${identifier}`, {
          credentials: "include",
          headers: token ? { 'Authorization': `Bearer ${token}` } : {},
        });
        if (fetchResponse.ok) {
          const data = await fetchResponse.json();
          const normalizedItems = data.map(item => ({
            id: item.productId || item._id,
            name: item.name,
            price: parseFloat(item.price || 0),
            imageUrl: item.imageUrl || '/images/default-product.jpg',
          }));
          if (setLikedItems) setLikedItems(normalizedItems);
          toast.success("Added to Wishlist!", toastOptions);
        } else {
          toast.error("Failed to fetch updated wishlist", toastOptions);
        }
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || 'Failed to add to wishlist', toastOptions);
      }
    } catch (err) {
      console.error("Error adding to wishlist:", err);
      toast.error("Failed to add to wishlist", toastOptions);
    }
  };

  const removeItem = async (productId, type) => {
    const identifier = user ? user.id : localStorage.getItem('sessionId') || '';
    if (!identifier) return;
    try {
      const token = localStorage.getItem('token');
      const endpoint = type === 'cart' ? '/api/cart/remove' : '/api/liked/remove';
      const response = await fetch(`http://localhost:5000${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...(token && { 'Authorization': `Bearer ${token}` }) },
        credentials: 'include',
        body: JSON.stringify({ productId, userId: user?.id, sessionId: !user ? identifier : undefined })
      });
      if (response.ok) {
        const data = await response.json();
        if (type === 'cart') {
          const normalizedItems = data.cartItems.map(item => ({
            id: item.productId || item._id,
            name: item.name,
            price: parseFloat(item.price || 0),
            imageUrl: item.imageUrl || '/images/default-product.jpg',
            quantity: item.quantity || 1,
          }));
          setCartItems(normalizedItems);
        } else {
          const normalizedItems = data.likedItems.map(item => ({
            id: item.productId || item._id,
            name: item.name,
            price: parseFloat(item.price || 0),
            imageUrl: item.imageUrl || '/images/default-product.jpg',
          }));
          setLikedItems(normalizedItems);
        }
        toast.success(`Item removed from ${type}!`, toastOptions);
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || `Failed to remove item from ${type}`, toastOptions);
      }
    } catch (err) {
      console.error(`Error removing from ${type}:`, err);
      toast.error(`Failed to remove item from ${type}`, toastOptions);
    }
  };

  const logout = async () => {
    try {
      await fetch("http://localhost:5000/api/auth/logout", {
        method: "POST",
        credentials: "include",
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      setUser(null);
      if (setCartItems) setCartItems([]);
      if (setLikedItems) setLikedItems([]);
      setShowUserDropdown(false);
      navigate("/");
      toast.success("Logged out successfully!", toastOptions);
    } catch (err) {
      console.error("Logout failed", err);
      toast.error("Failed to log out", toastOptions);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setMenuLevel(0);
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
    setShowSearchPopup(false);
    setSearchQuery('');
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

  const toggleSearchPopup = () => {
    setShowSearchPopup(!showSearchPopup);
    if (!showSearchPopup) setSearchQuery('');
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cartTotal = cartItems.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 1), 0);
  const isMenRoute = location.pathname === '/men';

  const goBack = () => {
    setMenuLevel(0);
    setShowAllJewelryDropdown(false);
    setShowAboutDropdown(false);
  };

  const handleSearch = (e) => {
    if (e.key === 'Enter' || e.type === 'click') {
      if (searchQuery.trim()) {
        navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
        setShowSearchPopup(false);
      }
    }
  };

  const popularProducts = products.slice(0, 4).map(product => ({
    ...product,
    imageUrl: product.imageUrl || '/images/default-product.jpg',
  }));

  const recommendedProducts = products.slice(0, 5).map(product => ({
    ...product,
    oldPrice: product.price * 1.2,
  }));

  return (
    <>
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
        theme="light"
      />
      <header className={`${styles['navbar-header']} ${isMenRoute ? styles['men-theme'] : ''}`}>
        <div className={styles.promo}>
          FREE JEWELLERY ORGANIZER WORTH ₹400 ON ORDERS ABOVE RS. 1500
        </div>

        <div className={styles['nav-row']}>
          <button 
            className={`${styles.burger} ${isMobileMenuOpen ? styles.open : ''}`}
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            <span></span>
          </button>

          <div className={styles.logo}>
            <a href="/" onClick={(e) => { e.preventDefault(); handleNavigation('/'); }}>
              <img src={logo} alt="Aisha" />
            </a>
          </div>

          <nav className={styles['icon-bar']} aria-label="Quick actions">
            <button 
              className={styles['search-toggle']}
              onClick={toggleSearchPopup}
              aria-label="Toggle search"
            >
              <SearchIcon />
            </button>
            
            <button 
              className={styles['icon-link']}
              onClick={(e) => { e.preventDefault(); toggleCartSidebar('liked'); }}
              aria-label="Wishlist"
            >
              <img src={likeLogo} alt="Wishlist" className={styles['icon-svg']} />
              {likedItems.length > 0 && (
                <span className={styles.badge}>{likedItems.length}</span>
              )}
            </button>

            <div className={styles['account-wrapper']} ref={accountDropdownRef}>
              <button 
                className={styles['account-button']}
                onClick={(e) => { e.preventDefault(); handleProfileClick(); }}
                aria-label="Account"
              >
                <img src={accountLogo} alt="Account" className={styles['icon-svg']} />
              </button>
              
              {user && showUserDropdown && (
                <div className={styles['account-dropdown']}>
                  <span>Hello, {user.firstName} {user.lastName}</span>
                  <button onClick={(e) => { e.preventDefault(); handleNavigation('/profile'); }}>Profile</button>
                  <button onClick={(e) => { e.preventDefault(); logout(); }}>Logout</button>
                </div>
              )}
            </div>

            <button 
              className={styles['icon-link']}
              onClick={(e) => { e.preventDefault(); toggleCartSidebar('cart'); }}
              aria-label="Shopping cart"
            >
              <img src={shopLogo} alt="Shopping cart" className={styles['icon-svg']} />
              {cartItems.length > 0 && (
                <span className={styles.badge}>{cartItems.length}</span>
              )}
            </button>
          </nav>
        </div>

        <nav className={styles['cat-strip']} aria-label="Primary navigation">
          <ul className={styles['cat-links']}>
            <li className={`${styles['all-jewellery']} ${showAllJewelryDropdown ? styles.active : ''}`}>
              <a href="/products" onClick={(e) => { e.preventDefault(); toggleAllJewelryDropdown(); }}>
                All Jewellery
              </a>
              {showAllJewelryDropdown && (
                <div className={styles['dropdown-menu']}>
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
            <li className={`${styles.about} ${showAboutDropdown ? styles.active : ''}`}>
              <a href="/about" onClick={(e) => { e.preventDefault(); toggleAboutDropdown(); }}>
                About
              </a>
              {showAboutDropdown && (
                <div className={styles['dropdown-menu']}>
                  <a href="#" onClick={(e) => { e.preventDefault(); handleNavigation('/our-story'); }}>Our Story</a>
                  <a href="#" onClick={(e) => { e.preventDefault(); handleNavigation('/blogs'); }}>Blogs</a>
                  <a href="#" onClick={(e) => { e.preventDefault(); handleNavigation('/contact'); }}>Contact Us</a>
                </div>
              )}
            </li>
          </ul>
        </nav>

        <nav className={styles['gender-strip']} aria-label="Shop by gender">
          <a href="/women" onClick={(e) => { e.preventDefault(); handleNavigation('/women'); }}>WOMEN</a>
          <span>|</span>
          <a href="/men" onClick={(e) => { e.preventDefault(); handleNavigation('/men'); }}>MEN</a>
        </nav>
      </header>

      <aside className={`${styles['mobile-menu']} ${isMobileMenuOpen ? styles.open : ''}`}>
        <div className={styles['mobile-menu-header']}>
          <button className={styles['back-button']} onClick={goBack} aria-label="Go back">
            <BackIcon />
          </button>
          <h2 className={styles['mobile-menu-title']}>Menu</h2>
        </div>
        <div className={styles['menu-content']}>
          <ul className="list-group">
            {menuLevel === 0 && (
              <>
                <li className="list-group-item">
                  <a href="/products" onClick={(e) => { e.preventDefault(); setShowAllJewelryDropdown(!showAllJewelryDropdown); setMenuLevel(1); }}>
                    <CategoriesIcon /> All Jewellery
                  </a>
                </li>
                <li className="list-group-item">
                  <a href="/collections" onClick={(e) => { e.preventDefault(); handleNavigation('/collections'); }}>
                    <CategoriesIcon /> Collections
                  </a>
                </li>
                <li className="list-group-item">
                  <a href="/new-arrivals" onClick={(e) => { e.preventDefault(); handleNavigation('/new-arrivals'); }}>
                    <CategoriesIcon /> New Arrivals
                  </a>
                </li>
                <li className="list-group-item">
                  <a href="/about" onClick={(e) => { e.preventDefault(); setShowAboutDropdown(!showAboutDropdown); setMenuLevel(1); }}>
                    <CategoriesIcon /> About
                  </a>
                </li>
                <li className="list-group-item">
                  <a href="/auth" onClick={(e) => { e.preventDefault(); handleNavigation(user ? '/profile' : '/auth'); }}>
                    <img src={accountLogo} alt="Account" className={styles['icon-svg']} /> {user ? `Hello, ${user.firstName}` : 'Login/Sign Up'}
                  </a>
                </li>
              </>
            )}
            {menuLevel === 1 && showAllJewelryDropdown && (
              <div className={`${styles['dropdown-menu']} list-group ${styles.submenu}`}>
                <a href="#" className="list-group-item" onClick={(e) => { e.preventDefault(); handleNavigation('/category/earrings'); }}>
                  <CategoriesIcon /> Earrings
                </a>
                <a href="#" className="list-group-item" onClick={(e) => { e.preventDefault(); handleNavigation('/category/rings'); }}>
                  <CategoriesIcon /> Rings
                </a>
                <a href="#" className="list-group-item" onClick={(e) => { e.preventDefault(); handleNavigation('/category/necklaces'); }}>
                  <CategoriesIcon /> Necklaces
                </a>
                <a href="#" className="list-group-item" onClick={(e) => { e.preventDefault(); handleNavigation('/category/bracelets'); }}>
                  <CategoriesIcon /> Bracelets
                </a>
                <a href="#" className="list-group-item" onClick={(e) => { e.preventDefault(); handleNavigation('/jewellery-sets'); }}>
                  <CategoriesIcon /> Jewellery Sets
                </a>
              </div>
            )}
            {menuLevel === 1 && showAboutDropdown && (
              <div className={`${styles['dropdown-menu']} list-group ${styles.submenu}`}>
                <a href="#" className="list-group-item" onClick={(e) => { e.preventDefault(); handleNavigation('/our-story'); }}>
                  <CategoriesIcon /> Our Story
                </a>
                <a href="#" className="list-group-item" onClick={(e) => { e.preventDefault(); handleNavigation('/craftsmanship'); }}>
                  <CategoriesIcon /> Craftsmanship
                </a>
                <a href="#" className="list-group-item" onClick={(e) => { e.preventDefault(); handleNavigation('/sustainability'); }}>
                  <CategoriesIcon /> Sustainability
                </a>
                <a href="#" className="list-group-item" onClick={(e) => { e.preventDefault(); handleNavigation('/testimonials'); }}>
                  <CategoriesIcon /> Testimonials
                </a>
                <a href="#" className="list-group-item" onClick={(e) => { e.preventDefault(); handleNavigation('/contact'); }}>
                  <CategoriesIcon /> Contact Us
                </a>
              </div>
            )}
          </ul>
        </div>
      </aside>

      {showSearchPopup && (
        <div className={styles['search-popup-overlay']}>
          <div className={styles['search-popup']} ref={searchPopupRef}>
            <button className={styles['close-button']} onClick={toggleSearchPopup} aria-label="Close search">
              <CloseIcon />
            </button>
            <div className={styles['search-header']}>
              <input
                type="text"
                placeholder="Search jewelry..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleSearch}
                autoFocus
              />
              <button className={styles['search-icon-btn']} onClick={handleSearch} aria-label="Search">
                <SearchIcon />
              </button>
            </div>
            <div className={styles['popular-choices']}>
              <h3>Popular Choices</h3>
              <div className={styles['category-buttons']}>
                {popularProducts.map((product) => (
                  <div key={product.id} className={styles['product-image-container']} onClick={(e) => { e.preventDefault(); handleNavigation(`/category/${product.category}`); }}>
                    {/* Placeholder for product image - replace with actual image src */}
                  </div>
                ))}
              </div>
            </div>
            <div className={styles['recommended-section']}>
              <h3>Recommended</h3>
              <div className={styles['recommended-carousel']}>
                {recommendedProducts.map((product) => (
                  <div key={product.id} className={styles['product-card']}>
                    {product.oldPrice && <span className={styles['sale-badge']}>Sale</span>}
                    <img src={product.imageUrl || '/images/default-product.jpg'} alt={product.name} className={styles['product-image']} />
                    <h4>{product.name}</h4>
                    <p><s>₹{product.oldPrice.toFixed(2)}</s> <span className={styles['discounted-price']}>₹{product.price.toFixed(2)}</span></p>
                    <button onClick={(e) => { e.preventDefault(); addToCart(product.id); }} className={styles['add-to-cart-btn']}>Add to Cart</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {(isMobileMenuOpen || isCartSidebarOpen) && (
        <div className={styles.overlay} onClick={closeAllMenus}></div>
      )}

      <aside className={`${styles['cart-sidebar']} ${isCartSidebarOpen ? styles.open : ''} ${isMenRoute ? styles['men-theme'] : ''}`} ref={sidebarRef}>
        <div className={styles['tab-buttons']}>
          <button 
            className={`${styles['tab-link']} ${activeTab === 'cart' ? styles.active : ''}`}
            onClick={(e) => { e.preventDefault(); openTab('cart'); }}
          >
            Cart
          </button>
          <button 
            className={`${styles['tab-link']} ${activeTab === 'liked' ? styles.active : ''}`}
            onClick={(e) => { e.preventDefault(); openTab('liked'); }}
          >
            Wishlist
          </button>
        </div>

        <div className={`${styles['tab-content']} ${activeTab === 'cart' ? styles.active : ''}`}>
          <h2>SHOPPING CART</h2>
          <hr />
          {cartItems.length === 0 ? (
            <div className="text-center">
              <p className={styles['empty-message']}>Your cart is empty.</p>
              <img src={shopLogo} alt="Shopping Cart" onClick={(e) => { e.preventDefault(); navigate('/bag'); }} style={{ width: '40px', height: '40px', cursor: 'pointer', margin: '20px auto' }} />
            </div>
          ) : (
            <div className={styles['items-container']}>
              {cartItems.map((item) => (
                <div key={item.id} className={`${styles['cart-item']} d-flex align-items-center mb-3`}>
                  <img src={item.imageUrl} alt={item.name} className="img-fluid" style={{ width: '50px', height: '50px', marginRight: '10px' }} />
                  <div className="flex-grow-1">
                    <h3>{item.name}</h3>
                    <p>₹{item.price.toFixed(2)} x {item.quantity}</p>
                  </div>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => removeItem(item.id, 'cart')}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
          <div className={styles.subtotal}>Subtotal: ₹{cartTotal.toFixed(2)}</div>
          <button className={`${styles['return-to-shop']} btn btn-outline-primary w-100`} onClick={(e) => { e.preventDefault(); closeAllMenus(); }}>
            RETURN TO SHOP
          </button>
          <button className={`${styles['proceed-checkout']} btn btn-primary w-100`} onClick={(e) => { e.preventDefault(); navigate('/checkout'); }}>
            PROCEED TO SECURE CHECKOUT
          </button>
        </div>

        <div className={`${styles['tab-content']} ${activeTab === 'liked' ? styles.active : ''}`}>
          <h2>WISHLIST</h2>
          <hr />
          {likedItems.length === 0 ? (
            <div className="text-center">
              <p className={styles['empty-message']}>No liked items yet.</p>
              <img src={likeLogo} alt="Liked Items" onClick={(e) => { e.preventDefault(); navigate('/wishlist'); }} style={{ width: '40px', height: '40px', cursor: 'pointer', margin: '20px auto' }} />
            </div>
          ) : (
            <div className={styles['items-container']}>
              {likedItems.map((item) => (
                <div key={item.id} className={`${styles['liked-item']} d-flex align-items-center mb-3`}>
                  <img src={item.imageUrl} alt={item.name} className="img-fluid" style={{ width: '50px', height: '50px', marginRight: '10px' }} />
                  <div className="flex-grow-1">
                    <h3>{item.name}</h3>
                    <p>₹{item.price.toFixed(2)}</p>
                  </div>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => removeItem(item.id, 'liked')}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
          <button className={`${styles['return-to-shop']} btn btn-outline-primary w-100`} onClick={(e) => { e.preventDefault(); closeAllMenus(); }}>
            GO TO WISHLIST
          </button>
        </div>
      </aside>

      {products.length > 0 && (
        <main className={styles['products-section']}>
          <div className={styles['product-grid']}>
            {products.map((product) => (
              <div key={product.id} className={styles['product-card']}>
                <img src={product.imageUrl || '/images/default-product.jpg'} alt={product.name} className="img-fluid" />
                <h3>{product.name}</h3>
                <p>₹{product.price.toFixed(2)}</p>
                <div className={styles['product-actions']}>
                  <button onClick={(e) => { e.preventDefault(); addToCart(product.id); }} className="btn btn-outline-success">Add to Cart</button>
                  <button onClick={(e) => { e.preventDefault(); addToWishlist(product.id); }} className="btn btn-outline-danger">Add to Wishlist</button>
                </div>
              </div>
            ))}
          </div>
        </main>
      )}
      
      <div className={styles['mobile-bottom-nav']}>
          <button onClick={toggleMobileMenu} className={styles['nav-btn']}>
              <CategoriesIcon />
              <span>Categories</span>
          </button>
          
          <button onClick={toggleSearchPopup} className={styles['nav-btn']}>
              <SearchIcon />
              <span>Search</span>
          </button>
          <button onClick={() => handleNavigation(user ? '/profile' : '/auth')} className={styles['nav-btn']}>
              <img src={accountLogo} alt="Account" className={styles['icon-svg']}/>
              <span>{user ? 'Profile' : 'Account'}</span>
          </button>
          <button className={`${styles['cart-button']} ${styles['nav-btn']}`} onClick={() => toggleCartSidebar('cart')}>
              <img src={shopLogo} alt="Cart" className={styles['icon-svg']}/>
              {cartItems.length > 0 && <span className={styles.badge}>{cartItems.length}</span>}
              <span>Cart</span>
          </button>
          
          <button onClick={scrollToTop} className={styles['nav-btn']}>
              <TopIcon />
              <span>Top</span>
          </button>
      </div>
    </>
  );
};

export default Navbar;