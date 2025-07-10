import React, { useState, useEffect, useRef } from 'react';
import { Container, Button } from 'react-bootstrap';
import styles from '../styles/CategoryCarousel.module.css';
import ring1 from '../assets/images/ring1.jpg';

const categories = [
  { name: 'MANGALSUTRA', img: ring1 },
  { name: 'NECKLACE', img: ring1 },
  { name: 'RING', img: ring1 },
  { name: 'BRACELET', img: ring1 },
  { name: 'EARRINGS', img: ring1 },
  { name: 'PENDANTS', img: ring1 },
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

  const resetAutoScroll = () => {
    startAutoScroll();
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

  const handleNext = () => {
    setCurrentIndex(prev => prev + 1);
    resetAutoScroll(); 
  };

  const handleTransitionEnd = () => {
    if (currentIndex >= categories.length) {
      setTransitionDisabled(true);
      setCurrentIndex(currentIndex % categories.length);
    }
  };

  const itemWidth = 270;
  
  return (
    <Container as="section" className="py-5 text-center">
      <h1 className={`h2 ${styles.carouselTitle}`}>Everyday Demi-fine Jewellery</h1>
      <div className={`${styles.categoryCarouselContainer} mt-4`}>
        <div 
          ref={trackRef}
          className={`${styles.categoryCarouselTrack} ${isTransitionDisabled ? styles.noTransition : ''}`}
          style={{ transform: `translateX(-${currentIndex * itemWidth}px)` }}
          onTransitionEnd={handleTransitionEnd}
        >
          {loopedCategories.map((category, index) => (
            <div className={styles.categoryCarouselItem} key={index}>
              <div className={styles.circleImage}>
                <img src={category.img} alt={category.name} />
              </div>
              <p className={`mt-3 fw-bold ${styles.categoryCarouselName}`}>{category.name}</p>
            </div>
          ))}
        </div>
        <Button variant="light" className={`${styles.nextBtn} shadow`} onClick={handleNext}>❯</Button>
      </div>
    </Container>
  );
};

export default CategoryCarousel;