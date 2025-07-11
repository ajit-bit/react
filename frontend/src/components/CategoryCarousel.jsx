import React, { useState, useEffect, useRef } from 'react';
import { Container } from 'react-bootstrap';
import styles from '../styles/CategoryCarousel.module.css';
import ring1 from '../assets/images/ring1.jpg'; // Using a placeholder image

// Reordered to match the image
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
  // CORRECTED THIS LINE: removed the extra '='
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
    // Added a section class for the background color
    <Container as="section" className={`${styles.carouselSection} py-5 text-center`}>
      {/* Removed the 'h2' class to let our custom style take over */}
      <h1 className={styles.carouselTitle}>Everyday Demi-fine Jewellery</h1>
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
        {/* Changed to a standard HTML button for full styling control */}
        <button className={styles.nextBtn} onClick={handleNext} aria-label="Next category">
          ❯
        </button>
      </div>
    </Container>
  );
};

export default CategoryCarousel;