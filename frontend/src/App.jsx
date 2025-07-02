import React from 'react';
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

// Custom Layout Component to conditionally render Navbar and Footer
const Layout = ({ children, hideNavbarFooter }) => {
  return (
    <div className="layout-container">
      {!hideNavbarFooter && <Navbar />}
      <main className="main-content">{children}</main>
      {!hideNavbarFooter && <Footer />}
    </div>
  );
};

// Wrapper component to use useLocation within Router context
const AppContent = () => {
  const location = useLocation();
  const hideNavbarFooter = location.pathname === '/auth' || location.pathname === '/men';

  return (
    <Layout hideNavbarFooter={hideNavbarFooter}>
      <Routes>
        <Route path="/category/:categoryName" element={<Category />} />
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
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;