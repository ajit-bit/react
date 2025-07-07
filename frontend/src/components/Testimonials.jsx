// src/components/Testimonials.jsx

import React from 'react';
import testimonial1 from '../assets/images/testimonial-1.jpg';
import testimonial2 from '../assets/images/testimonial-2.jpg';
import testimonial3 from '../assets/images/testimonial-3.jpg';

const Testimonials = () => {
  return (
    <section className="testimonials-section">
      <h1>WHAT OUR CLIENTS SAY</h1>
      <div className="title-divider"></div>
      
      <div className="testimonials-grid">
        <div className="testimonial-card">
          <div className="testimonial-rating">★★★★★</div>
          <p className="testimonial-text">"The quality of the silver jewelry I received from AAISHA HOUSE OF SILVER was exceptional. The craftsmanship and attention to detail truly stands out. I've received so many compliments on my necklace!"</p>
          <div className="testimonial-author">
            <img src={testimonial1} alt="Sarah J." className="author-image" />
            <div className="author-info">
              <p className="author-name">Sarah J.</p>
              <p className="author-title">Loyal Customer</p>
            </div>
          </div>
        </div>
        
        <div className="testimonial-card">
          <div className="testimonial-rating">★★★★★</div>
          <p className="testimonial-text">"I purchased a gift for my wife's anniversary from AAISHA HOUSE OF SILVER, and she absolutely loved it! The packaging was elegant and the ring was even more beautiful than in the pictures. Will definitely shop here again."</p>
          <div className="testimonial-author">
            <img src={testimonial2} alt="Robert K." className="author-image" />
            <div className="author-info">
              <p className="author-name">Robert K.</p>
              <p className="author-title">Happy Customer</p>
            </div>
          </div>
        </div>
        
        <div className="testimonial-card">
          <div className="testimonial-rating">★★★★★</div>
          <p className="testimonial-text">"The customer service at AAISHA HOUSE OF SILVER is impeccable. They helped me find the perfect bracelet for my style and budget. The piece arrived promptly and was exactly what I wanted. Highly recommend!"</p>
          <div className="testimonial-author">
            <img src={testimonial3} alt="Mia L." className="author-image" />
            <div className="author-info">
              <p className="author-name">Mia L.</p>
              <p className="author-title">Repeat Customer</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;