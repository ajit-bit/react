import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Category from './screens/Category';
import Blogs from './screens/Blog';
import Home from './screens/Home';
import CartWishlist from './screens/CartWishlist';
import AuthComponent from './screens/Auth';
import Women from './screens/Women';
import Men from './screens/Men';
import Product from './screens/Product';
import Profile from './screens/Profile';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';
import 'bootstrap/dist/css/bootstrap.min.css';

const Layout = ({ children, hideNavbarFooter, setCartItems, setLikedItems, user, setUser }) => {
  const location = useLocation();
  return (
    <div className={`layout-container ${hideNavbarFooter ? 'auth-layout' : ''}`}>
      {!hideNavbarFooter && <Navbar setCartItems={setCartItems} setLikedItems={setLikedItems} user={user} setUser={setUser} />}
      <main className="main-content">{children}</main>
      {!hideNavbarFooter && <Footer />}
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
        theme={location.pathname === '/men' ? 'dark' : 'light'}
      />
    </div>
  );
};

const AppContent = ({ setCartItems, setLikedItems, cartItems, likedItems }) => {
  const [user, setUser] = useState(null);
  const sessionId = localStorage.getItem('sessionId') || uuidv4();
  const location = useLocation();
  const hideNavbarFooter = location.pathname === '/auth';

  useEffect(() => {
    if (!localStorage.getItem('sessionId')) {
      localStorage.setItem('sessionId', sessionId);
    }
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      checkLoginStatus();
    } else {
      setUser(null);
    }
  }, [sessionId]);

  const checkLoginStatus = async () => {
    try {
      const storedToken = localStorage.getItem('token');
      if (!storedToken) {
        setUser(null);
        return;
      }
      const res = await fetch('http://localhost:5000/api/auth/me', {
        credentials: 'include',
        headers: { Authorization: `Bearer ${storedToken}` },
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      } else {
        localStorage.removeItem('token');
        setUser(null);
      }
    } catch (err) {
      console.error('Error checking login status:', err);
      localStorage.removeItem('token');
      setUser(null);
    }
  };

  const handleLogin = (token) => {
    localStorage.setItem('token', token);
    checkLoginStatus();
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setCartItems([]);
    setLikedItems([]);
  };

  return (
    <Layout
      hideNavbarFooter={hideNavbarFooter}
      setCartItems={setCartItems}
      setLikedItems={setLikedItems}
      user={user}
      setUser={setUser}
    >
      <Routes>
        <Route
          path="/category/:categoryName"
          element={<Category setCartItems={setCartItems} setLikedItems={setLikedItems} user={user} />}
        />
        <Route path="/jewellery-sets" element={<div>Jewellery Sets Page</div>} />
        <Route path="/collections" element={<div>Collections Page</div>} />
        <Route path="/new-arrivals" element={<div>New Arrivals Page</div>} />
        <Route path="/blogs" element={<Blogs />} />
        <Route
          path="/bag"
          element={
            <CartWishlist
              type="cart"
              user={user}
              cartItems={cartItems}
              setCartItems={setCartItems}
              likedItems={likedItems}
              setLikedItems={setLikedItems}
            />
          }
        />
        <Route
          path="/wishlist"
          element={
            <CartWishlist
              type="wishlist"
              user={user}
              cartItems={cartItems}
              setCartItems={setCartItems}
              likedItems={likedItems}
              setLikedItems={setLikedItems}
            />
          }
        />
        <Route
          path="/auth"
          element={<AuthComponent onLogin={handleLogin} onLogout={handleLogout} />}
        />
        <Route
          path="/women"
          element={<Women user={user} />}
        />
        <Route
          path="/men"
          element={<Men user={user} setCartItems={setCartItems} setLikedItems={setLikedItems} />}
        />
        <Route
          path="/product/:productId"
          element={<Product setCartItems={setCartItems} setLikedItems={setLikedItems} user={user} />}
        />
        <Route
          path="/profile"
          element={<Profile user={user} setUser={setUser} />}
        />
        <Route
          path="/"
          element={<Home user={user} setCartItems={setCartItems} setLikedItems={setLikedItems} />}
        />
      </Routes>
    </Layout>
  );
};

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [likedItems, setLikedItems] = useState([]);
  const [products, setProducts] = useState([]); // State for search functionality

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/products", { credentials: "include" });
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        } else {
          console.error("Failed to fetch products:", response.status);
        }
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    fetchProducts();
  }, []);

  return (
    <Router>
      <AppContent
        setCartItems={setCartItems}
        setLikedItems={setLikedItems}
        cartItems={cartItems}
        likedItems={likedItems}
        products={products} // Pass products to Navbar via AppContent
      />
    </Router>
  );
}

export default App;