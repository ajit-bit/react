import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import styles from '../styles/CategoryCarousel.module.css';
import ring1 from '../assets/images/ring1.jpg';

const categories = [
  { name: 'PENDANTS', img: ring1 },
  { name: 'MANGALSUTRA', img: ring1 },
  { name: 'NECKLACE', img: ring1 },
  { name: 'RING', img: ring1 },
  { name: 'BRACELET', img: ring1 },
  { name: 'EARRINGS', img: ring1 },
];

const loopedCategories = [...categories, ...categories];

const CategoryCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitionDisabled, setTransitionDisabled] = useState(false);
  const trackRef = useRef(null);
  const intervalRef = useRef(null);

  const startAutoScroll = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      setCurrentIndex(prev => prev + 1);
    }, 3000);
  };

  
  useEffect(() => {
    startAutoScroll();
    return () => clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    if (isTransitionDisabled) {
      setTimeout(() => {
        setTransitionDisabled(false);
      }, 50);
    }
  }, [isTransitionDisabled]);

 
  const handleTransitionEnd = () => {
    if (currentIndex >= categories.length) {
      setTransitionDisabled(true);
      setCurrentIndex(currentIndex % categories.length);
    }
  };

  return (
    <Container as="section" className={`${styles.carouselSection} py-4 py-md-5 text-center`}>
      <h1 className={styles.carouselTitle}>Everyday Demi-fine Jewellery</h1>
      <div className={`${styles.categoryCarouselContainer} mt-3 mt-md-4`}>
        <Row className="g-0">
          <Col xs={12}>
            <div
              ref={trackRef}
              className={`${styles.categoryCarouselTrack} ${isTransitionDisabled ? styles.noTransition : ''}`}
              style={{ transform: `translateX(-${currentIndex * (100 / getItemsPerView())}%)` }}
              onTransitionEnd={handleTransitionEnd}
            >
              {loopedCategories.map((category, index) => (
                <div className={styles.categoryCarouselItem} key={index}>
                  <div className={styles.circleImage}>
                    <img src={category.img} alt={category.name} className="img-fluid" />
                  </div>
                  <p className={`mt-2 mt-md-3 fw-bold ${styles.categoryCarouselName}`}>{category.name}</p>
                </div>
              ))}
            </div>
          </Col>
        </Row>
        
      </div>
    </Container>
  );
};

// Helper function to determine items per view based on screen size
const getItemsPerView = () => {
  if (window.innerWidth <= 576) return 1;
  if (window.innerWidth <= 768) return 2;
  if (window.innerWidth <= 992) return 3;
  return 4;
};

export default CategoryCarousel;