// src/components/Features.jsx

import React from 'react';

const Features = () => {
  return (
    <section className="feature-section">
      <div className="feature-container">
        <div className="feature-item">
          <div className="icon-circle"><i className="fas fa-truck"></i></div>
          <h4>Free Shipping</h4>
          <p>On orders over ₹1999</p>
        </div>
        <div className="feature-item">
          <div className="icon-circle"><i className="fas fa-undo"></i></div>
          <h4>30 Days Return</h4>
          <p>Exchange product easily</p>
        </div>
        <div className="feature-item">
          <div className="icon-circle"><i className="fas fa-lock"></i></div>
          <h4>Secure Payment</h4>
          <p>Payment Cards Accepted</p>
        </div>
        <div className="feature-item">
          <div className="icon-circle"><i className="fas fa-headset"></i></div>
          <h4>24/7 Support</h4>
          <p>Contact us Anytime</p>
        </div>
      </div>
    </section>
  );
};

export default Features;