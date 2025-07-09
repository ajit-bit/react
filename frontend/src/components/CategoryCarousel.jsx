import React, { useState, useEffect } from 'react';
import { Container, Button } from 'react-bootstrap';
import ring1 from '../assets/images/ring1.jpg';
import '../styles/CategoryCarousel.css';

const categories = [
  { name: 'MANGALSUTRA', img: ring1 },
  { name: 'NECKLACE', img: ring1 },
  { name: 'RING', img: ring1 },
  { name: 'BRACELET', img: ring1 },
  { name: 'EARRINGS', img: ring1 },
  { name: 'PENDANTS', img: ring1 },
];

const CategoryCarousel = () => {
  const [carouselIndex, setCarouselIndex] = useState(0);

  // Auto-scroll logic
  useEffect(() => {
    const interval = setInterval(() => {
      setCarouselIndex(prev => (prev >= categories.length - 1 ? 0 : prev + 1));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const nextCarouselSlide = () => {
    setCarouselIndex(prev => (prev >= categories.length - 1 ? 0 : prev + 1));
  };
  
  const itemWidth = 270;

  return (
    <Container as="section" className="py-5 text-center">
      <h1 className="h2 carouselTitle">Everyday Demi-fine Jewellery</h1>
      <div className="category-carousel-container mt-4">
        <div 
          className="category-carousel-track" 
          style={{ transform: `translateX(-${carouselIndex * itemWidth}px)` }}
        >
          {categories.map((category, index) => (
            <div className="category-carousel-item" key={index}>
              <div className="circle-image">
                <img src={category.img} alt={category.name} />
              </div>
              <p className="mt-3 fw-bold">{category.name}</p>
            </div>
          ))}
        </div>
        <Button variant="light" className="next-btn shadow" onClick={nextCarouselSlide}>❯</Button>
      </div>
    </Container>
  );
};

export default CategoryCarousel;