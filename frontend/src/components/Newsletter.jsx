// src/components/Newsletter.jsx

import React from 'react';
import immg2 from '../assets/images/immg2.png';

const Newsletter = () => {
  return (
    <section className="newsletter-banner">
      <div className="banner-image">
        <img src={immg2} alt="Newsletter Promo Image" />
      </div>
      <div className="banner-content">
        <h2>15% DISCOUNT</h2>
        <p>Subscribe to our newsletter to get a 15% discount on your first purchase.</p>
        <form className="newsletter-form">
          <input type="email" placeholder="Email address" required />
          <button type="submit">→</button>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;