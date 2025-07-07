// src/components/Slider.jsx

import { useState, useEffect } from 'react';
import slide1 from '../assets/images/slide1.png';
import slide2 from '../assets/images/slide2.png';
import slide3 from '../assets/images/slide3.png';

const Slider = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlideIndex(prev => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentSlideIndex(prev => (prev + 1) % 3);
  };

  const prevSlide = () => {
    setCurrentSlideIndex(prev => (prev - 1 + 3) % 3);
  };

  return (
    <section className="slider">
      <div className={`slide ${currentSlideIndex === 0 ? 'active' : ''}`}>
        <div className="text">
          <h4>New Collection</h4>
          <h1>FANCY JEWELERY</h1>
          <p>Jewelry Joice is a fresh and conceptual in the world of jewelry. You will get a unique, one-of-a-kind decoration that will suit you better than any other.</p>
          <button>Shop now</button>
        </div>
        <img src={slide1} alt="Slide 1" />
      </div>
      <div className={`slide ${currentSlideIndex === 1 ? 'active' : ''}`}>
        <div className="text">
          <h4>New Arrivals</h4>
          <h1>GOLDEN GLAM</h1>
          <p>Discover the elegance of our latest collection – golden chains, earrings, and bracelets that shine as bright as you.</p>
          <button>Shop now</button>
        </div>
        <img src={slide2} alt="Slide 2" />
      </div>
      <div className={`slide ${currentSlideIndex === 2 ? 'active' : ''}`}>
        <div className="text">
          <h4>Limited Offer</h4>
          <h1>CLASSIC STYLE</h1>
          <p>Elegant and timeless designs that complement every outfit. Get the classic style you always dreamed of.</p>
          <button>Shop now</button>
        </div>
        <img src={slide3}alt="Slide 3" />
      </div>
      <div className="slider-nav">
        <button className="prev" onClick={prevSlide}></button>
        <button className="next" onClick={nextSlide}></button>
      </div>
    </section>
  );
};

export default Slider;