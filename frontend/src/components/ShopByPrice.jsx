// src/components/ShopByPrice.jsx

import React from 'react';

const ShopByPrice = () => {
  return (
    <section className="shop-by-price-section" id="shopbyprice">
      <h2 className="section-title">Shop by Price</h2>
      <div className="price-grid">
        <div className="price-card">
          <p className="price-label">Under</p>
          <p className="price-value">₹999</p>
          <button className="price-btn"><i className="fas fa-chevron-right"></i></button>
        </div>
        <div className="price-card">
          <p className="price-label">Under</p>
          <p className="price-value">₹2999</p>
          <button className="price-btn"><i className="fas fa-chevron-right"></i></button>
        </div>
        <div className="price-card">
          <p className="price-label">Under</p>
          <p className="price-value">₹4999</p>
          <button className="price-btn"><i className="fas fa-chevron-right"></i></button>
        </div>
        <div className="price-card premium">
          <p className="price-label">Premium</p>
          <p className="price-value">Gifts</p>
          <button className="price-btn"><i className="fas fa-chevron-right"></i></button>
        </div>
      </div>
    </section>
  );
};

export default ShopByPrice;