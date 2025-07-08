import React from 'react';
import { Carousel } from 'react-bootstrap';
import slide1 from '../assets/images/slide1.png';
import slide2 from '../assets/images/slide2.png';
import slide3 from '../assets/images/slide3.png';

import '../styles/Slider.css';

const Slider = () => {
  return (
    <Carousel interval={5000} className="home-slider">
      <Carousel.Item>
        <div className="d-flex justify-content-center align-items-center slide-content">
          <div className="text-container">
            <h4>New Collection</h4>
            <h1>FANCY JEWELERY</h1>
            <p>Jewelry Joice is a fresh and conceptual in the world of jewelry. You will get a unique, one-of-a-kind decoration that will suit you better than any other.</p>
            <button className="shop-now-btn">Shop now</button>
          </div>
          <img
            className="d-block slide-image"
            src={slide1}
            alt="First slide"
          />
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div className="d-flex justify-content-center align-items-center slide-content">
          <div className="text-container">
            <h4>New Arrivals</h4>
            <h1>GOLDEN GLAM</h1>
            <p>Discover the elegance of our latest collection – golden chains, earrings, and bracelets that shine as bright as you.</p>
            <button className="shop-now-btn">Shop now</button>
          </div>
          <img
            className="d-block slide-image"
            src={slide2}
            alt="Second slide"
          />
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div className="d-flex justify-content-center align-items-center slide-content">
          <div className="text-container">
            <h4>Limited Offer</h4>
            <h1>CLASSIC STYLE</h1>
            <p>Elegant and timeless designs that complement every outfit. Get the classic style you always dreamed of.</p>
            <button className="shop-now-btn">Shop now</button>
          </div>
          <img
            className="d-block slide-image"
            src={slide3}
            alt="Third slide"
          />
        </div>
      </Carousel.Item>
    </Carousel>
  );
};

export default Slider;