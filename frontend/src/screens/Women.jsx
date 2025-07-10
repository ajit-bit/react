import { Heart, ShoppingBag, Star } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import women1 from '../assets/images/women1.jpg';
import women2 from '../assets/images/women2.jpg';
import women3 from '../assets/images/women3.jpg';
import ring1 from '../assets/images/ring1.jpg';
import styles from '../styles/Women.module.css';

const Women = ({ user }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentReviewSlide, setCurrentReviewSlide] = useState(0);
  const [likedProducts, setLikedProducts] = useState(new Set());
  const [loading, setLoading] = useState({});
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const navigate = useNavigate();
  const sessionId = localStorage.getItem('sessionId') || uuidv4();

  const sliderImages = [
    { src: women1, alt: 'Women Jewelry Slide 1', text: 'Discover effortlessly elegant jewelry made for modern women — delicate rings, dainty chains, and versatile charms.' },
    { src: women2, alt: 'Women Jewelry Slide 2', text: 'Refined designs in warm gold tones — perfect for layering or wearing solo. Shine with subtle sophistication.' },
    { src: women3, alt: 'Women Jewelry Slide 3', text: 'From bridal sets to festive picks, elevate your style with pieces that make every moment unforgettable.' },
  ];

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
    ],
  ];

  const collections = [
    {
      name: 'Signature Silver Collection',
      products: [
        { id: '507f1f77bcf86cd799439071', name: 'Elegant Rose Ring', originalPrice: 1200, currentPrice: 949, reviews: 14, rating: 5, image: ring1, hoverImage: women1, description: 'A delicate rose gold ring with intricate floral detailing.', category: 'rings' },
        { id: '507f1f77bcf86cd799439072', name: 'Pearl Stud Necklace', originalPrice: 1000, currentPrice: 799, reviews: 9, rating: 4, image: ring1, hoverImage: women1, description: 'Elegant pearl stud necklace for a classic look.', category: 'necklaces' },
        { id: '507f1f77bcf86cd799439073', name: 'Crystal Charm Bracelet', originalPrice: 950, currentPrice: 749, reviews: 6, rating: 4, image: ring1, hoverImage: women1, description: 'Sparkling crystal charm bracelet for everyday wear.', category: 'bracelets' },
        { id: '507f1f77bcf86cd799439074', name: 'Golden Glow Earrings', originalPrice: 850, currentPrice: 699, reviews: 5, rating: 3, image: ring1, hoverImage: women1, description: 'Radiant gold earrings with a modern twist.', category: 'earrings' },
      ],
    },
    {
      name: 'Celestial Glow Collection',
      products: [
        { id: '507f1f77bcf86cd799439075', name: 'Opal Shine Necklace', originalPrice: 1100, currentPrice: 949, reviews: 11, rating: 4, image: ring1, hoverImage: women1, description: 'Opal-accented necklace with a celestial glow.', category: 'necklaces' },
        { id: '507f1f77bcf86cd799439076', name: 'Twilight Gold Ring', originalPrice: 1150, currentPrice: 849, reviews: 8, rating: 4, image: ring1, hoverImage: women1, description: 'Gold ring inspired by twilight hues.', category: 'rings' },
        { id: '507f1f77bcf86cd799439077', name: 'Crystal Drop Earrings', originalPrice: 990, currentPrice: 799, reviews: 7, rating: 3, image: ring1, hoverImage: women1, description: 'Elegant crystal drop earrings for special occasions.', category: 'earrings' },
        { id: '507f1f77bcf86cd799439078', name: 'Luna Silver Cuff', originalPrice: 1250, currentPrice: 999, reviews: 12, rating: 5, image: ring1, hoverImage: women1, description: 'Bold silver cuff with lunar-inspired design.', category: 'bracelets' },
      ],
    },
    {
      name: 'Most Loved by Her',
      products: [
        { id: '507f1f77bcf86cd799439079', name: 'Opal Shine Necklace', originalPrice: 1100, currentPrice: 949, reviews: 11, rating: 4, image: ring1, hoverImage: women1, description: 'Opal-accented necklace with a celestial glow.', category: 'necklaces' },
        { id: '507f1f77bcf86cd799439080', name: 'Twilight Gold Ring', originalPrice: 1150, currentPrice: 849, reviews: 8, rating: 4, image: ring1, hoverImage: women1, description: 'Gold ring inspired by twilight hues.', category: 'rings' },
        { id: '507f1f77bcf86cd799439081', name: 'Crystal Drop Earrings', originalPrice: 990, currentPrice: 799, reviews: 7, rating: 3, image: ring1, hoverImage: women1, description: 'Elegant crystal drop earrings for special occasions.', category: 'earrings' },
        { id: '507f1f77bcf86cd799439082', name: 'Luna Silver Cuff', originalPrice: 1250, currentPrice: 999, reviews: 12, rating: 5, image: ring1, hoverImage: women1, description: 'Bold silver cuff with lunar-inspired design.', category: 'bracelets' },
      ],
    },
    {
      name: 'Festive Dazzle Picks',
      products: [
        { id: '507f1f77bcf86cd799439083', name: 'Opal Shine Necklace', originalPrice: 1100, currentPrice: 949, reviews: 11, rating: 4, image: ring1, hoverImage: women1, description: 'Opal-accented necklace with a celestial glow.', category: 'necklaces' },
        { id: '507f1f77bcf86cd799439084', name: 'Twilight Gold Ring', originalPrice: 1150, currentPrice: 849, reviews: 8, rating: 4, image: ring1, hoverImage: women1, description: 'Gold ring inspired by twilight hues.', category: 'rings' },
        { id: '507f1f77bcf86cd799439085', name: 'Crystal Drop Earrings', originalPrice: 990, currentPrice: 799, reviews: 7, rating: 3, image: ring1, hoverImage: women1, description: 'Elegant crystal drop earrings for special occasions.', category: 'earrings' },
        { id: '507f1f77bcf86cd799439086', name: 'Luna Silver Cuff', originalPrice: 1250, currentPrice: 999, reviews: 12, rating: 5, image: ring1, hoverImage: women1, description: 'Bold silver cuff with lunar-inspired design.', category: 'bracelets' },
      ],
    },
    {
      name: 'The Luxe Essentials',
      products: [
        { id: '507f1f77bcf86cd799439087', name: 'Opal Shine Necklace', originalPrice: 1100, currentPrice: 949, reviews: 11, rating: 4, image: ring1, hoverImage: women1, description: 'Opal-accented necklace with a celestial glow.', category: 'necklaces' },
        { id: '507f1f77bcf86cd799439088', name: 'Twilight Gold Ring', originalPrice: 1150, currentPrice: 849, reviews: 8, rating: 4, image: ring1, hoverImage: women1, description: 'Gold ring inspired by twilight hues.', category: 'rings' },
        { id: '507f1f77bcf86cd799439089', name: 'Crystal Drop Earrings', originalPrice: 990, currentPrice: 799, reviews: 7, rating: 3, image: ring1, hoverImage: women1, description: 'Elegant crystal drop earrings for special occasions.', category: 'earrings' },
        { id: '507f1f77bcf86cd799439090', name: 'Luna Silver Cuff', originalPrice: 1250, currentPrice: 999, reviews: 12, rating: 5, image: ring1, hoverImage: women1, description: 'Bold silver cuff with lunar-inspired design.', category: 'bracelets' },
      ],
    },
  ];

  useEffect(() => {
    if (!localStorage.getItem('sessionId')) {
      localStorage.setItem('sessionId', sessionId);
    }
    const sliderInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    }, 5000);

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(sliderInterval);
      window.removeEventListener('resize', handleResize);
    };
  }, [sliderImages.length]);

  const addToCart = async (productId) => {
    const product = collections.flatMap(c => c.products).find(p => p.id === productId);
    if (!product) {
      toast.error('Product not found', { className: styles['women-theme-toast'] });
      return;
    }

    setLoading(prev => ({ ...prev, [productId]: true }));
    try {
      const token = localStorage.getItem('token');
      const headers = token ? { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } : { 'Content-Type': 'application/json' };
      const body = user
        ? { productId, name: product.name, price: product.currentPrice, imageUrl: product.image }
        : { productId, name: product.name, price: product.currentPrice, imageUrl: product.image, sessionId };
      const response = await fetch('http://localhost:5000/api/cart/add', {
        method: 'POST',
        headers,
        credentials: 'include',
        body: JSON.stringify(body),
      });
      if (response.ok) {
        toast.success('Added to Cart!', {
          className: styles['women-theme-toast'],
        });
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add to cart');
      }
    } catch (err) {
      console.error('Error adding to cart:', err);
      toast.error(err.message || 'Failed to add to cart', {
        className: styles['women-theme-toast'],
      });
    } finally {
      setLoading(prev => ({ ...prev, [productId]: false }));
    }
  };

  const addToWishlist = async (productId) => {
    const product = collections.flatMap(c => c.products).find(p => p.id === productId);
    if (!product) {
      toast.error('Product not found', { className: styles['women-theme-toast'] });
      return;
    }

    setLoading(prev => ({ ...prev, [productId]: true }));
    try {
      const token = localStorage.getItem('token');
      const headers = token ? { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } : { 'Content-Type': 'application/json' };
      const endpoint = likedProducts.has(productId) ? '/api/liked/remove' : '/api/liked/add';
      const body = user
        ? { productId, name: product.name, price: product.currentPrice, imageUrl: product.image }
        : { productId, name: product.name, price: product.currentPrice, imageUrl: product.image, sessionId };
      const response = await fetch(`http://localhost:5000${endpoint}`, {
        method: 'POST',
        headers,
        credentials: 'include',
        body: JSON.stringify(body),
      });
      if (response.ok) {
        setLikedProducts(prev => {
          const newSet = new Set(prev);
          if (likedProducts.has(productId)) {
            newSet.delete(productId);
          } else {
            newSet.add(productId);
          }
          return newSet;
        });
        toast.success(likedProducts.has(productId) ? 'Removed from Wishlist!' : 'Added to Wishlist!', {
          className: styles['women-theme-toast'],
        });
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update wishlist');
      }
    } catch (err) {
      console.error('Error updating wishlist:', err);
      toast.error(err.message || 'Failed to update wishlist', {
        className: styles['women-theme-toast'],
      });
    } finally {
      setLoading(prev => ({ ...prev, [productId]: false }));
    }
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`${styles.star} ${
          i < Math.floor(rating)
            ? styles.filled
            : i < rating
            ? styles['half-filled']
            : ''
        }`}
      />
    ));
  };

  return (
    <div className={styles['women-page']}>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <section className={styles.slider}>
        <div className={styles.carouselInner} style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
          {sliderImages.map((slide, index) => (
            <div
              key={index}
              className={`${styles.carouselItem} ${currentSlide === index ? styles.active : ''}`}
            >
              <div className={styles.carouselContent}>
                <img src={slide.src} alt={slide.alt} className={styles.carouselImage} />
                <div className={styles.text}>
                  <h4>Curated for Her</h4>
                  <h1>{index === 0 ? 'EVERYDAY GLAM' : index === 1 ? 'GOLDEN GRACE' : 'STATEMENT SETS'}</h1>
                  <p>{slide.text}</p>
                  <button onClick={() => navigate('/products')}>Shop now</button>
                </div>
              </div>
            </div>
          ))}
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
      {collections.map((collection, collectionIndex) => (
        <div key={collectionIndex} className={styles.collection}>
          <h2>{collection.name}</h2>
          <button className={styles['view-more']} onClick={() => navigate('/collections')}>View All</button>
          <div className={styles['products-grid']}>
            {collection.products.map((product) => (
              <div 
                key={product.id} 
                className={styles['product-card']} 
                onClick={() => navigate(`/product/${product.id}`)}
                style={{ cursor: 'pointer' }}
              >
                <div className={styles['product-image-container']}>
                  <div className={styles['product-image-wrapper']}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className={`${styles['product-image']} ${styles['main-image']}`}
                    />
                    <img
                      src={product.hoverImage}
                      alt={`${product.name} - alternate view`}
                      className={`${styles['product-image']} ${styles['hover-image']}`}
                    />
                  </div>
                </div>
                <div className={styles['product-content']}>
                  <h3 className={styles['product-name']}>{product.name}</h3>
                  <div className={styles['rating-container']}>
                    <div className={styles['stars-container']}>{renderStars(product.rating)}</div>
                    <span className={styles['reviews-text']}>{product.reviews} reviews</span>
                  </div>
                  <div className={styles['price-container']}>
                    <div className={styles['price-wrapper']}>
                      <span className={styles['current-price']}>Rs. {product.currentPrice.toFixed(2)}</span>
                      <span className={styles['original-price']}>Rs. {product.originalPrice.toFixed(2)}</span>
                    </div>
                  </div>
                  <div className={styles['action-buttons']} onClick={(e) => e.stopPropagation()}>
                    <button
                      className={styles['add-to-bag-button']}
                      onClick={() => addToCart(product.id)}
                      disabled={loading[product.id]}
                    >
                      <ShoppingBag className={styles['bag-icon']} />
                      <span>{loading[product.id] ? 'Adding...' : 'Add to Bag'}</span>
                    </button>
                    <button
                      onClick={() => addToWishlist(product.id)}
                      className={`${styles['like-button']} ${likedProducts.has(product.id) ? styles.liked : ''}`}
                      disabled={loading[product.id]}
                    >
                      <Heart
                        className={`${styles['heart-icon']} ${likedProducts.has(product.id) ? styles.liked : ''}`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
      <div className={styles['shop-love']}>
        <h2>Shop by Category</h2>
        <div className={styles['shop-love-slider']}>
          {['Necklaces', 'Bracelets', 'Earrings', 'Rings'].map((category, index) => (
            <div
              key={index}
              className={styles.card}
              onClick={() => navigate(`/${category.toLowerCase()}`)}
            >
              <div className={styles['product-image-container']}>
                <div className={styles['product-image-wrapper']}>
                  <img src={ring1} alt={category} className={styles['product-image']} />
                </div>
              </div>
              <div className={styles['card-content']}>
                <h3>{category}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.reviews}>
        <h2>Our Shoppers ♥ Us</h2>
        <div className={styles['review-carousel']}>
          <div
            className={styles['review-slides-container']}
            style={{
              position: 'relative',
              width: '100%',
              overflow: isMobile ? 'auto' : 'hidden',
              scrollSnapType: isMobile ? 'x mandatory' : 'none',
              scrollBehavior: isMobile ? 'smooth' : 'auto',
            }}
          >
            <div
              className={styles['review-inner']}
              style={{
                display: 'flex',
                transition: isMobile ? 'none' : 'transform 0.5s ease-in-out',
                transform: isMobile ? 'none' : `translateX(-${currentReviewSlide * 100}%)`,
              }}
            >
              {reviewSlides.map((slideGroup, slideIndex) => (
                <div
                  key={slideIndex}
                  className={styles['review-slide']}
                  style={{
                    minWidth: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '30px',
                    flexShrink: 0,
                    scrollSnapAlign: isMobile ? 'start' : 'none',
                  }}
                >
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
            </div>
          </div>
          {!isMobile && (
            <div className={styles['review-indicators']}>
              {reviewSlides.map((_, index) => (
                <div
                  key={index}
                  className={`${styles['review-indicator']} ${currentReviewSlide === index ? styles.active : ''}`}
                  onClick={() => setCurrentReviewSlide(index)}
                ></div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Women;