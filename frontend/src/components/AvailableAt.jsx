// src/components/AvailableAt.jsx

import React from 'react';
import myntra from '../assets/images/myntra.png';

const AvailableAt = () => {
  return (
    <section className="available-at-section">
      <h1>AVAILABLE AT</h1>
      <div className="title-divider"></div>
      
      <div className="marketplace-logos">
        <a href="#" className="marketplace-logo">
          <div className="logo-circle">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2560px-Amazon_logo.svg.png" alt="Amazon" className="marketplace-icon" />
          </div>
          <p>Amazon</p>
        </a>
        <a href="#" className="marketplace-logo">
          <div className="logo-circle">
            <img src="https://logos-world.net/wp-content/uploads/2020/11/Flipkart-Logo.png" alt="Flipkart" className="marketplace-icon" />
          </div>
          <p>Flipkart</p>
        </a>
        <a href="#" className="marketplace-logo">
          <div className="logo-circle">
            <img src={myntra} alt="Myntra" className="marketplace-icon" style={{height: '50px'}} />
          </div>
          <p>Myntra</p>
        </a>
      </div>
    </section>
  );
};

export default AvailableAt;