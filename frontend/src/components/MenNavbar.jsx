import { Heart, Search, ShoppingBag, User } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from "../images/logo-nobg.png";
import './MenNavbar.css';


const MenNavbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartSidebarOpen, setIsCartSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('cart');
  const [user, setUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [likedItems, setLikedItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showAllJewelryDropdown, setShowAllJewelryDropdown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    checkLoginStatus();
    fetchProducts();
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
      window.location.href = "/";
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  const toggleMobileMenu = () => {
    if (!isCartSidebarOpen) {
      setIsMobileMenuOpen(!isMobileMenuOpen);
    }
  };

  const toggleCartSidebar = (tab = 'cart') => {
    if (!isMobileMenuOpen) {
      setActiveTab(tab);
      setIsCartSidebarOpen(!isCartSidebarOpen);
    }
  };

  const closeAllMenus = () => {
    setIsMobileMenuOpen(false);
    setIsCartSidebarOpen(false);
    setShowUserDropdown(false);
    setShowAllJewelryDropdown(false);
  };

  const openTab = (tabName) => {
    setActiveTab(tabName);
  };

  const toggleAllJewelryDropdown = () => {
    setShowAllJewelryDropdown(!showAllJewelryDropdown);
  };

  const handleNavigation = (path) => {
    navigate(path);
    closeAllMenus();
  };

  const cartTotal = cartItems.reduce((sum, item) => sum + (item.price || 0), 0);

  return (
    <>
      <header className="mennavbar-header">
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
              <img src={logo} alt="Aisha" />
            </a>
          </div>

          <nav className="icon-bar" aria-label="Quick actions">
            <a href="#" aria-label="Search">
              <Search size={24} />
            </a>
            
            <button 
              className="icon-link"
              onClick={() => toggleCartSidebar('liked')}
              aria-label="Wishlist"
            >
              <Heart size={24} />
              {likedItems.length > 0 && (
                <span className="badge">{likedItems.length}</span>
              )}
            </button>

            <div className="account-wrapper">
              {user ? (
                <button 
                  className="account-button"
                  onClick={() => setShowUserDropdown(!showUserDropdown)}
                  aria-label="Account"
                >
                  <User size={24} />
                </button>
              ) : (
                <a href="/auth" aria-label="Login">
                  <User size={24} />
                </a>
              )}
              
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
              <ShoppingBag size={24} />
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
                  <a href="#" onClick={() => handleNavigation('/earrings')}>Earrings</a>
                  <a href="#" onClick={() => handleNavigation('/rings')}>Rings</a>
                  <a href="#" onClick={() => handleNavigation('/necklaces')}>Necklaces</a>
                  <a href="#" onClick={() => handleNavigation('/bracelets')}>Bracelets</a>
                  <a href="#" onClick={() => handleNavigation('/jewellery-sets')}>Jewellery Sets</a>
                </div>
              )}
            </li>
            <li><a href="/collections">Collections</a></li>
            <li><a href="/new-arrivals">New Arrivals</a></li>
          </ul>
        </nav>

        <nav className="gender-strip" aria-label="Shop by gender">
          <a href="/women">WOMEN</a>
          <span>|</span>
          <a href="/men">MEN</a>
        </nav>
      </header>

      {/* Mobile Menu */}
      <aside className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        <ul>
          <li className={`all-jewellery ${showAllJewelryDropdown ? 'active' : ''}`}>
            <a href="/products" onClick={(e) => { e.preventDefault(); toggleAllJewelryDropdown(); }}>All Jewellery</a>
            {showAllJewelryDropdown && (
              <div className="dropdown-menu">
                <a href="#" onClick={() => handleNavigation('/earrings')}>Earrings</a>
                <a href="#" onClick={() => handleNavigation('/rings')}>Rings</a>
                <a href="#" onClick={() => handleNavigation('/necklaces')}>Necklaces</a>
                <a href="#" onClick={() => handleNavigation('/bracelets')}>Bracelets</a>
                <a href="#" onClick={() => handleNavigation('/jewellery-sets')}>Jewellery Sets</a>
              </div>
            )}
          </li>
          <li><a href="/collections" onClick={closeAllMenus}>Collections</a></li>
          <li><a href="/new-arrivals" onClick={closeAllMenus}>New Arrivals</a></li>
        </ul>
      </aside>

      {/* Overlay */}
      {(isMobileMenuOpen || isCartSidebarOpen) && (
        <div className="overlay" onClick={closeAllMenus}></div>
      )}

      {/* Cart Sidebar */}
      <aside className={`cart-sidebar ${isCartSidebarOpen ? 'open' : ''}`}>
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
          {cartItems.length === 0 ? (
            <p className="empty-message">Your cart is empty.</p>
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
        </div>

        <div className={`tab-content ${activeTab === 'liked' ? 'active' : ''}`}>
          <h2>LIKED ITEMS</h2>
          {likedItems.length === 0 ? (
            <p className="empty-message">No liked items yet.</p>
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

        <div className="common-section">
          <button className="proceed-checkout">
            PROCEED TO SECURE CHECKOUT
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

export default MenNavbar;