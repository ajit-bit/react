import { useState, useEffect } from 'react';
import ring1 from '../assets/images/ring1.jpg';

const CategoryCarousel = () => {
  const [carouselIndex, setCarouselIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCarouselIndex(prev => (prev >= 5 ? 0 : prev + 1));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const nextCarouselSlide = () => {
    setCarouselIndex(prev => (prev >= 5 ? 0 : prev + 1));
  };

  return (
    <>
      <h1>Everyday Demi-fine Jewellery</h1>
      <div className="carousel-container">
        <div className="carousel-track" id="carouselTrack" style={{ transform: `translateX(-${carouselIndex * 270}px)` }}>
          <div className="carousel-item">
            <div className="circle">
              <img src={ring1} alt="Mangalsutra" />
            </div>
            <p>MANGALSUTRA</p>
          </div>
          <div className="carousel-item">
            <div className="circle">
              <img src={ring1} alt="Necklace" />
            </div>
            <p>NECKLACE</p>
          </div>
          <div className="carousel-item">
            <div className="circle">
              <img src={ring1} alt="Ring" />
            </div>
            <p>RING</p>
          </div>
          <div className="carousel-item">
            <div className="circle">
              <img src={ring1} alt="Bracelet" />
            </div>
            <p>BRACELET</p>
          </div>
          <div className="carousel-item">
            <div className="circle">
              <img src={ring1} alt="Mangalsutra" />
            </div>
            <p>MANGALSUTRA</p>
          </div>
          <div className="carousel-item">
            <div className="circle">
              <img src={ring1} alt="Necklace" />
            </div>
            <p>NECKLACE</p>
          </div>
        </div>
        <button className="next-btn" onClick={nextCarouselSlide}>❯</button>
      </div>
    </>
  );
};

export default CategoryCarousel;