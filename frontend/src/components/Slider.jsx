import React from 'react';
import { Carousel, Row, Col } from 'react-bootstrap';
import styles from '../styles/Slider.module.css';
import slide1 from '../assets/images/slide1.png';
import slide2 from '../assets/images/slide2.png';
import slide3 from '../assets/images/slide3.png';

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
    <Carousel interval={5000} controls={true} indicators={true} className={styles.homeSlider}>
      {slides.map((slide, index) => (
        <Carousel.Item key={index}>
          <Row className="m-0 h-100 align-items-center px-3 px-lg-5">
            <Col xs={12} lg={6} className={`${styles.textContainer} text-start order-2 order-lg-1 py-4 py-lg-0`}>
              <h4 className="text-uppercase text-muted mb-2">{slide.subtitle}</h4>
              <h1 className="fw-bold mb-3">{slide.title}</h1>
              <p className="text-secondary mb-4">{slide.description}</p>
              <button className={`${styles.shopNowBtn} btn`}>Shop Now</button>
            </Col>
            <Col xs={12} lg={6} className="order-1 order-lg-2 d-flex justify-content-center">
              <img
                className={`img-fluid ${styles.slideImage}`}
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