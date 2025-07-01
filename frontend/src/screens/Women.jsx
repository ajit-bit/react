import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/Women.module.css';

// Import images from the public/images folder
import ring1 from '/images/ring1.jpg';
import women1 from '/images/women1.jpg';
import women2 from '/images/women2.jpg';
import women3 from '/images/women3.jpg';

const Women = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentReviewSlide, setCurrentReviewSlide] = useState(0);
  const navigate = useNavigate();

  const reviewSlides = [
    [
      {
        stars: 5,
        text: 'Absolutely love the designs! Great quality and fast delivery.',
        image: women1,
        author: 'Meera Sharma',
        title: 'Designer & Blogger',
      },
      {
        stars: 4,
        text: 'The earrings I got were even better in person. Definitely ordering again!',
        image: women2,
        author: 'Anjali Rao',
        title: 'Fashion Student',
      },
      {
        stars: 5,
        text: 'Perfect anniversary gift! The packaging was so beautiful.',
        image: women3,
        author: 'Sneha Joshi',
        title: 'Marketing Lead',
      },
    ],
    [
      {
        stars: 5,
        text: 'Incredible craftsmanship and lovely customer service.',
        image: women2,
        author: 'Divya Kapoor',
        title: 'Event Planner',
      },
    ],
  ];

  // Slider images
  const sliderImages = [
    { src: women1, alt: 'Women Jewelry Slide 1' },
    { src: women2, alt: 'Women Jewelry Slide 2' },
    { src: women3, alt: 'Women Jewelry Slide 3' }
  ];

  useEffect(() => {
    const sliderInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    }, 5000);

    return () => clearInterval(sliderInterval);
  }, [sliderImages.length]);

  const handleWishlistClick = () => {
    console.log("Wishlist button clicked");
  };

  const renderStars = (count) => {
    return '★'.repeat(count) + '☆'.repeat(5 - count);
  };

  return (
    <div className={styles['women-page']}>

      {/* Slider Section */}
      <section className={styles.slider}>
        <div className={`${styles.slide} ${currentSlide === 0 ? styles.active : ''}`}>
          <div className={styles.text}>
            <h4>Curated for Her</h4>
            <h1>EVERYDAY GLAM</h1>
            <p>Discover effortlessly elegant jewelry made for modern women — delicate rings, dainty chains, and versatile charms.</p>
            <button>Shop now</button>
          </div>
          <img src={sliderImages[0].src} alt={sliderImages[0].alt} />
        </div>

        <div className={`${styles.slide} ${currentSlide === 1 ? styles.active : ''}`}>
          <div className={styles.text}>
            <h4>Season's Highlights</h4>
            <h1>GOLDEN GRACE</h1>
            <p>Refined designs in warm gold tones — perfect for layering or wearing solo. Shine with subtle sophistication.</p>
            <button>Shop now</button>
          </div>
          <img src={sliderImages[1].src} alt={sliderImages[1].alt} />
        </div>

        <div className={`${styles.slide} ${currentSlide === 2 ? styles.active : ''}`}>
          <div className={styles.text}>
            <h4>Timeless Charm</h4>
            <h1>STATEMENT SETS</h1>
            <p>From bridal sets to festive picks, elevate your style with pieces that make every moment unforgettable.</p>
            <button>Shop now</button>
          </div>
          <img src={sliderImages[2].src} alt={sliderImages[2].alt} />
        </div>

        <div className={styles['slider-nav']}>
          <button 
            className={styles.prev}
            onClick={() => setCurrentSlide((prev) => (prev - 1 + sliderImages.length) % sliderImages.length)}
          ></button>
          <button 
            className={styles.next}
            onClick={() => setCurrentSlide((prev) => (prev + 1) % sliderImages.length)}
          ></button>
        </div>
      </section>

      {/* Signature Silver Collection */}
      <div className={styles.collection}>
        <h2>Signature Silver Collection</h2>
        <button className={styles['view-more']}>View All</button>
        <div className={styles.cards}>
          {[
            { name: 'Elegant Rose Ring', originalPrice: 1200, currentPrice: 949, reviews: 14, rating: 5 },
            { name: 'Pearl Stud Necklace', originalPrice: 1000, currentPrice: 799, reviews: 9, rating: 4 },
            { name: 'Crystal Charm Bracelet', originalPrice: 950, currentPrice: 749, reviews: 6, rating: 4 },
            { name: 'Golden Glow Earrings', originalPrice: 850, currentPrice: 699, reviews: 5, rating: 3 }
          ].map((product, index) => (
            <div key={index} className={styles.card}>
              <button className={styles['wishlist-icon']} onClick={handleWishlistClick}>♡</button>
              <img src={ring1} alt={product.name} />
              <div className={styles['card-content']}>
                <h3>{product.name}</h3>
                <div className={styles['card-rating']}>
                  <div className={styles.stars}>{renderStars(product.rating)}</div>
                  <p className={styles['review-count']}>{product.reviews} reviews</p>
                </div>
                <div className={styles.price}>
                  <span className={styles['original-price']}>Rs. {product.originalPrice}.00</span>
                  <span className={styles['current-price']}>Rs. {product.currentPrice}.00</span>
                </div>
                <button className={styles['add-to-cart']} onClick={handleWishlistClick}>Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trending Collections for Women */}
      {[
        'Celestial Glow Collection',
        'Most Loved by Her',
        'Festive Dazzle Picks',
        'The Luxe Essentials'
      ].map((collectionName, collectionIndex) => (
        <div key={collectionIndex} className={styles.jeweler}>
          <h2>{collectionName}</h2>
          <button className={styles['view-more']}>View All</button>
          <div className={styles.cards}>
            {[
              { name: 'Opal Shine Necklace', originalPrice: 1100, currentPrice: 949, reviews: 11, rating: 4 },
              { name: 'Twilight Gold Ring', originalPrice: 1150, currentPrice: 849, reviews: 8, rating: 4 },
              { name: 'Crystal Drop Earrings', originalPrice: 990, currentPrice: 799, reviews: 7, rating: 3 },
              { name: 'Luna Silver Cuff', originalPrice: 1250, currentPrice: 999, reviews: 12, rating: 5 }
            ].map((product, index) => (
              <div key={index} className={styles.card}>
                <button className={styles['wishlist-icon']} onClick={handleWishlistClick}>♡</button>
                <img src={ring1} alt={product.name} />
                <div className={styles['card-content']}>
                  <h3>{product.name}</h3>
                  <div className={styles['card-rating']}>
                    <div className={styles.stars}>{renderStars(product.rating)}</div>
                    <span className={styles['review-count']}>{product.reviews} reviews</span>
                  </div>
                  <div className={styles.price}>
                    <span className={styles['original-price']}>Rs. {product.originalPrice}.00</span>
                    <span className={styles['current-price']}>Rs. {product.currentPrice}.00</span>
                  </div>
                  <button className={styles['add-to-cart']} onClick={handleWishlistClick}>Add to Cart</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Shop by Category */}
      <div className={styles['shop-love']}>
        <h2>Shop by Category</h2>
        <div className={styles.cards}>
          {['Necklaces', 'Bracelets', 'Earrings', 'Rings'].map((category, index) => (
            <div
              key={index}
              className={styles.card}
              onClick={() => navigate(`/${category.toLowerCase()}`)}
            >
              <img src={ring1} alt={category} />
              <div className={styles['card-content']}>
                <h3>{category}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Customer Reviews */}
      <div className={styles.reviews}>
        <h2>Our Customers ♥ Us</h2>
        <div className={styles['review-carousel']}>
          {reviewSlides.map((slideGroup, slideIndex) => (
            <div key={slideIndex} className={`${styles['review-slide']} ${currentReviewSlide === slideIndex ? styles.active : ''}`}>
              {slideGroup.map((review, reviewIndex) => (
                <div key={reviewIndex} className={styles['review-card']}>
                  <div className={styles['review-stars']}>{renderStars(review.stars)}</div>
                  <p className={styles['review-text']}>{review.text}</p>
                  <div className={styles.reviewer}>
                    <img src={review.image} alt={review.author} />
                    <div className={styles['reviewer-info']}>
                      <h4>{review.author}</h4>
                      <p>{review.title}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
          <div className={styles['review-indicators']}>
            {reviewSlides.map((_, index) => (
              <div 
                key={index}
                className={`${styles['review-indicator']} ${currentReviewSlide === index ? styles.active : ''}`}
                onClick={() => setCurrentReviewSlide(index)}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Women;