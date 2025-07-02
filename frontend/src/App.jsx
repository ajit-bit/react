import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Category from './screens/Category';
import Blogs from './screens/Blog';
import Home from './screens/Home';
import Cart from './screens/Cart';
import AuthComponent from './screens/Auth';
import Women from './screens/Women';
import Men from './screens/Men';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Layout = ({ children, hideNavbarFooter, setCartItems, setLikedItems }) => {
  const location = useLocation();
  return (
    <div className="layout-container">
      {!hideNavbarFooter && <Navbar setCartItems={setCartItems} setLikedItems={setLikedItems} />}
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

const AppContent = ({ cartItems, setCartItems, setLikedItems }) => {
  const location = useLocation();
  const hideNavbarFooter = location.pathname === '/auth';

  // Example usage of cartItems to avoid unused variable error
  React.useEffect(() => {
    // This effect runs whenever cartItems changes
    // You can add logic here if needed
  }, [cartItems]);

  return (
    <Layout hideNavbarFooter={hideNavbarFooter} setCartItems={setCartItems} setLikedItems={setLikedItems}>
      <Routes>
        <Route path="/category/:categoryName" element={<Category setCartItems={setCartItems} setLikedItems={setLikedItems} />} />
        <Route path="/jewellery-sets" element={<div>Jewellery Sets Page</div>} />
        <Route path="/collections" element={<div>Collections Page</div>} />
        <Route path="/new-arrivals" element={<div>New Arrivals Page</div>} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/bag" element={<Cart />} />
        <Route path="/auth" element={<AuthComponent />} />
        <Route path="/women" element={<Women />} />
        <Route path="/men" element={<Men />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Layout>
  );
};

function App() {
  const [cartItems, setCartItems] = useState([]);
  // Only using setLikedItems to avoid unused variable error
  const [, setLikedItems] = useState([]);

  return (
    <Router>
      <AppContent cartItems={cartItems} setCartItems={setCartItems} setLikedItems={setLikedItems} />
    </Router>
  );
}

export default App;