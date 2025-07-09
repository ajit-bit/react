import React from 'react';
import { Carousel, Row, Col } from 'react-bootstrap';
import slide1 from '../assets/images/slide1.png';
import slide2 from '../assets/images/slide2.png';
import slide3 from '../assets/images/slide3.png';

import '../styles/Slider.css';

const Slider = () => {
  const slides = [
    {
      image: slide1,
      subtitle: 'New Collection',
      title: 'FANCY JEWELERY',
      description: 'Jewelry Joice is a fresh and conceptual in the world of jewelry. You will get a unique, one-of-a-kind decoration that will suit you better than any other.',
      alt: 'First slide',
    },
    {
      image: slide2,
      subtitle: 'New Arrivals',
      title: 'GOLDEN GLAM',
      description: 'Discover the elegance of our latest collection – golden chains, earrings, and bracelets that shine as bright as you.',
      alt: 'Second slide',
    },
    {
      image: slide3,
      subtitle: 'Limited Offer',
      title: 'CLASSIC STYLE',
      description: 'Elegant and timeless designs that complement every outfit. Get the classic style you always dreamed of.',
      alt: 'Third slide',
    },
  ];

  return (
    <Carousel interval={5000} controls={false} className="home-slider">
      {slides.map((slide, index) => (
        <Carousel.Item key={index}>
          <Row className="m-0 h-100 align-items-center px-lg-5">
            <Col lg={6} className="text-container text-start order-2 order-lg-1">
              <h4>{slide.subtitle}</h4>
              <span>{slide.title}</span>
              <p>{slide.description}</p>
              <button className="shop-now-btn">Shop now</button>
            </Col>
            
            <Col lg={6} className="order-1 order-lg-2">
              <img
                className="d-block w-100 slide-image"
                src={slide.image}
                alt={slide.alt}
              />
            </Col>
          </Row>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default Slider;