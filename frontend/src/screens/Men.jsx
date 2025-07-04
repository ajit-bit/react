
import { Heart, ShoppingBag, Star } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import men1 from '../images/men1.jpg';
import men2 from '../images/men2.jpg';
import men3 from '../images/men3.jpg';
import menAmericanExpress from '../images/menamericanexpress.svg';
import menGooglePay from '../images/mengooglepay.svg';
import menMastercard from '../images/menmastercard.svg';
import menPaytm from '../images/menpaytm.svg';
import menVisa from '../images/menvisa.svg';
import ring1 from '../images/ring1.jpg';
import styles from '../styles/Men.module.css';

const Men = ({ setCartItems, setLikedItems }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentReviewSlide, setCurrentReviewSlide] = useState(0);
  const [likedProducts, setLikedProducts] = useState(new Set());
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState({});
  const navigate = useNavigate();
  const sessionId = localStorage.getItem('sessionId') || uuidv4();

  const sliderImages = [
    { src: men1, alt: 'Men Jewelry Slide 1' },
    { src: men2, alt: 'Men Jewelry Slide 2' },
    { src: men3, alt: 'Men Jewelry Slide 3' },
  ];

  const reviewSlides = [
    [
      {
        stars: 5,
        text: "Pretty good stuff salty! They are helpful, and go the extra mile to ensure customer satisfaction. It's refreshing to find a brand that truly values its customers.",
        author: "Dixtia Patel",
        title: "Fashion Influencer",
        image: ring1,
      },
      {
        stars: 5,
        text: "Omg! Everything is just superb and high quality, can wait to try more. they are perfect for lounging on the beach or by the pool. I wore those chains and studs in my goa trip.",
        author: "Md Shad",
        title: "Content Creator",
        image: ring1,
      },
      {
        stars: 5,
        text: "I'm obsessed with the quality of the accessories from Salty. The materials used are durable and long-lasting! And also they have great customer support",
        author: "Laakshi Pathak",
        title: "Makeup Artist",
        image: ring1,
      },
    ],
    [
      {
        stars: 5,
        text: "Amazing quality and fast delivery. The jewelry looks exactly like the pictures and feels premium. Highly recommended!",
        author: "Customer Review",
        title: "Verified Buyer",
        image: ring1,
      },
      {
        stars: 5,
        text: "I'm obsessed with the quality of the accessories from Salty. The materials used are durable and long-lasting! And also they have great customer support",
        author: "Laakshi Pathak",
        title: "Makeup Artist",
        image: ring1,
      },
      {
        stars: 5,
        text: "I'm obsessed with the quality of the accessories from Salty. The materials used are durable and long-lasting! And also they have great customer support",
        author: "Laakshi Pathak",
        title: "Makeup Artist",
        image: ring1,
      },
    ],
  ];

  const collections = [
    {
      name: 'Alpha Sports Collection',
      products: [
        { id: '507f1f77bcf86cd799439051', name: 'Silver Voltage Necklace', originalPrice: 720, currentPrice: 549, reviews: 12, rating: 4, image: ring1, hoverImage: men1 },
        { id: '507f1f77bcf86cd799439052', name: 'Black Voltage Necklace', originalPrice: 900, currentPrice: 599, reviews: 4, rating: 4, image: ring1, hoverImage: men1 },
        { id: '507f1f77bcf86cd799439053', name: 'Bag Mitts Golden Chain', originalPrice: 1050, currentPrice: 749, reviews: 2, rating: 3, image: ring1, hoverImage: men1 },
        { id: '507f1f77bcf86cd799439054', name: 'Bag Mitts Silver Cuff', originalPrice: 1300, currentPrice: 699, reviews: 4, rating: 2, image: ring1, hoverImage: men1 },
      ],
    },
    {
      name: 'Icy and Spicy Jewellery',
      products: [
        { id: '507f1f77bcf86cd799439055', name: 'Ak 47 Silver Chain', originalPrice: 630, currentPrice: 549, reviews: 21, rating: 4, image: ring1, hoverImage: men1 },
        { id: '507f1f77bcf86cd799439056', name: 'Ak 47 Golden Chain', originalPrice: 630, currentPrice: 549, reviews: 13, rating: 3, image: ring1, hoverImage: men1 },
        { id: '507f1f77bcf86cd799439057', name: 'Diamond Golden Tidbit Earrings', originalPrice: 900, currentPrice: 699, reviews: 6, rating: 3, image: ring1, hoverImage: men1 },
        { id: '507f1f77bcf86cd799439058', name: 'Cannabis Leaf Silver Chain', originalPrice: 1050, currentPrice: 799, reviews: 9, rating: 5, image: ring1, hoverImage: men1 },
      ],
    },
    {
      name: 'Alpha BestSellers',
      products: [
        { id: '507f1f77bcf86cd799439059', name: 'Ak 47 Silver Chain', originalPrice: 630, currentPrice: 549, reviews: 21, rating: 4, image: ring1, hoverImage: men1 },
        { id: '507f1f77bcf86cd799439060', name: 'Ak 47 Golden Chain', originalPrice: 630, currentPrice: 549, reviews: 13, rating: 3, image: ring1, hoverImage: men1 },
        { id: '507f1f77bcf86cd799439061', name: 'Diamond Golden Tidbit Earrings', originalPrice: 900, currentPrice: 699, reviews: 6, rating: 3, image: ring1, hoverImage: men1 },
        { id: '507f1f77bcf86cd799439062', name: 'Cannabis Leaf Silver Chain', originalPrice: 1050, currentPrice: 799, reviews: 9, rating: 5, image: ring1, hoverImage: men1 },
      ],
    },
    {
      name: 'The Halloween Collection',
      products: [
        { id: '507f1f77bcf86cd799439063', name: 'Ak 47 Silver Chain', originalPrice: 630, currentPrice: 549, reviews: 21, rating: 4, image: ring1, hoverImage: men1 },
        { id: '507f1f77bcf86cd799439064', name: 'Ak 47 Golden Chain', originalPrice: 630, currentPrice: 549, reviews: 13, rating: 3, image: ring1, hoverImage: men1 },
        { id: '507f1f77bcf86cd799439065', name: 'Diamond Golden Tidbit Earrings', originalPrice: 900, currentPrice: 699, reviews: 6, rating: 3, image: ring1, hoverImage: men1 },
        { id: '507f1f77bcf86cd799439066', name: 'Cannabis Leaf Silver Chain', originalPrice: 1050, currentPrice: 799, reviews: 9, rating: 5, image: ring1, hoverImage: men1 },
      ],
    },
    {
      name: 'The Sicko Jewellery Collection',
      products: [
        { id: '507f1f77bcf86cd799439067', name: 'Ak 47 Silver Chain', originalPrice: 630, currentPrice: 549, reviews: 21, rating: 4, image: ring1, hoverImage: men1 },
        { id: '507f1f77bcf86cd799439068', name: 'Ak 47 Golden Chain', originalPrice: 630, currentPrice: 549, reviews: 13, rating: 3, image: ring1, hoverImage: men1 },
        { id: '507f1f77bcf86cd799439069', name: 'Diamond Golden Tidbit Earrings', originalPrice: 900, currentPrice: 699, reviews: 6, rating: 3, image: ring1, hoverImage: men1 },
        { id: '507f1f77bcf86cd799439070', name: 'Cannabis Leaf Silver Chain', originalPrice: 1050, currentPrice: 799, reviews: 9, rating: 5, image: ring1, hoverImage: men1 },
      ],
    },
  ];

  useEffect(() => {
    if (!localStorage.getItem('sessionId')) {
      localStorage.setItem('sessionId', sessionId);
    }
    checkLoginStatus();
    const sliderInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    }, 5000);
    const reviewInterval = setInterval(() => {
      setCurrentReviewSlide((prev) => (prev + 1) % reviewSlides.length);
    }, 7000);
    return () => {
      clearInterval(sliderInterval);
      clearInterval(reviewInterval);
    };
  }, [sliderImages.length, reviewSlides.length]);

  const checkLoginStatus = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setUser(null);
        await fetchCartItems(sessionId);
        await fetchLikedItems(sessionId);
        return;
      }
      const res = await fetch("http://localhost:5000/api/auth/me", {
        credentials: "include",
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
        await fetchCartItems(data.user.id);
        await fetchLikedItems(data.user.id);
      } else {
        localStorage.removeItem('token');
        setUser(null);
        await fetchCartItems(sessionId);
        await fetchLikedItems(sessionId);
        toast.error("Session expired, please log in again", {
          className: styles['men-theme-toast'],
        });
      }
    } catch (err) {
      console.error("Error checking login status", err);
      setUser(null);
      await fetchCartItems(sessionId);
      await fetchLikedItems(sessionId);
      toast.error("Failed to check login status", {
        className: styles['men-theme-toast'],
      });
    }
  };

  const fetchCartItems = async (identifier) => {
    try {
      const token = localStorage.getItem('token');
      const headers = token ? { 'Authorization': `Bearer ${token}` } : {};
      const response = await fetch(`http://localhost:5000/api/cart/${identifier}`, {
        credentials: "include",
        headers,
      });
      if (response.ok) {
        const data = await response.json();
        const normalizedItems = data.map(item => ({
          id: item.productId || item._id,
          name: item.name || 'Unnamed Product',
          price: parseFloat(item.price || 0),
          imageUrl: item.imageUrl || '/images/default-product.jpg',
          quantity: item.quantity || 1,
        }));
        setCartItems(normalizedItems);
      } else {
        throw new Error("Failed to fetch cart items");
      }
    } catch (err) {
      console.error("Error fetching cart items:", err);
      setCartItems([]);
      toast.error("Failed to fetch cart items", {
        className: styles['men-theme-toast'],
      });
    }
  };

  const fetchLikedItems = async (identifier) => {
    try {
      const token = localStorage.getItem('token');
      const headers = token ? { 'Authorization': `Bearer ${token}` } : {};
      const response = await fetch(`http://localhost:5000/api/liked/${identifier}`, {
        credentials: "include",
        headers,
      });
      if (response.ok) {
        const data = await response.json();
        const normalizedItems = data.map(item => ({
          id: item.productId || item._id,
          name: item.name || 'Unnamed Product',
          price: parseFloat(item.price || 0),
          imageUrl: item.imageUrl || '/images/default-product.jpg',
        }));
        setLikedItems(normalizedItems);
        setLikedProducts(new Set(normalizedItems.map(item => item.id)));
      } else {
        throw new Error("Failed to fetch liked items");
      }
    } catch (err) {
      console.error("Error fetching liked items:", err);
      setLikedItems([]);
      toast.error("Failed to fetch liked items", {
        className: styles['men-theme-toast'],
      });
    }
  };

  const addToCart = async (productId) => {
    const product = collections.flatMap(c => c.products).find(p => p.id === productId);
    if (!product) {
      toast.error("Product not found", { className: styles['men-theme-toast'] });
      return;
    }

    setLoading(prev => ({ ...prev, [productId]: true }));
    try {
      const token = localStorage.getItem('token');
      const headers = token ? { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' } : { 'Content-Type': 'application/json' };
      const body = user
        ? { productId, name: product.name, price: product.currentPrice, imageUrl: product.image }
        : { productId, name: product.name, price: product.currentPrice, imageUrl: product.image, sessionId };
      const response = await fetch("http://localhost:5000/api/cart/add", {
        method: "POST",
        headers,
        credentials: "include",
        body: JSON.stringify(body),
      });
      if (response.ok) {
        await fetchCartItems(user ? user.id : sessionId);
        toast.success("Added to Cart!", {
          className: styles['men-theme-toast'],
        });
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add to cart");
      }
    } catch (err) {
      console.error("Error adding to cart:", err);
      toast.error(err.message || "Failed to add to cart", {
        className: styles['men-theme-toast'],
      });
    } finally {
      setLoading(prev => ({ ...prev, [productId]: false }));
    }
  };

  const addToWishlist = async (productId) => {
    const product = collections.flatMap(c => c.products).find(p => p.id === productId);
    if (!product) {
      toast.error("Product not found", { className: styles['men-theme-toast'] });
      return;
    }

    setLoading(prev => ({ ...prev, [productId]: true }));
    try {
      const token = localStorage.getItem('token');
      const headers = token ? { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' } : { 'Content-Type': 'application/json' };
      const endpoint = likedProducts.has(productId) ? "/api/liked/remove" : "/api/liked/add";
      const body = user
        ? { productId, name: product.name, price: product.currentPrice, imageUrl: product.image }
        : { productId, name: product.name, price: product.currentPrice, imageUrl: product.image, sessionId };
      const response = await fetch(`http://localhost:5000${endpoint}`, {
        method: "POST",
        headers,
        credentials: "include",
        body: JSON.stringify(body),
      });
      if (response.ok) {
        await fetchLikedItems(user ? user.id : sessionId);
        toast.success(likedProducts.has(productId) ? "Removed from Wishlist!" : "Added to Wishlist!", {
          className: styles['men-theme-toast'],
        });
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update wishlist");
      }
    } catch (err) {
      console.error("Error updating wishlist:", err);
      toast.error(err.message || "Failed to update wishlist", {
        className: styles['men-theme-toast'],
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
    <div className={styles.menPage}>
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
        theme="dark"
      />
      <section className={styles.slider}>
        <div className={`${styles.slide} ${currentSlide === 0 ? styles.active : ''}`}>
          <div className={styles.text}>
            <h4>Curated for Him</h4>
            <h1>BOLD STATEMENTS</h1>
            <p>Discover powerful jewelry made for modern men — statement chains, sleek rings, and versatile accessories.</p>
            <button onClick={() => navigate('/products')}>Shop now</button>
          </div>
          <img src={sliderImages[0].src} alt={sliderImages[0].alt} />
        </div>
        <div className={`${styles.slide} ${currentSlide === 1 ? styles.active : ''}`}>
          <div className={styles.text}>
            <h4>Season's Best</h4>
            <h1>SILVER EDGE</h1>
            <p>Refined designs in cool silver tones — perfect for layering or wearing solely solo. Command attention with confidence.</p>
            <button onClick={() => navigate('/products')}>Shop now</button>
          </div>
          <img src={sliderImages[1].src} alt={sliderImages[1].alt} />
        </div>
        <div className={`${styles.slide} ${currentSlide === 2 ? styles.active : ''}`}>
          <div className={styles.text}>
            <h4>Urban Appeal</h4>
            <h1>STREET STYLE</h1>
            <p>From casual wear to special occasions, elevate your style with pieces that make every moment count.</p>
            <button onClick={() => navigate('/products')}>Shop now</button>
          </div>
          <img src={sliderImages[2].src} alt={sliderImages[2].alt} />
        </div>
        <div className={styles.sliderNav}>
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
          <button className={styles.viewMore} onClick={() => navigate('/collections')}>View All</button>
          <div className={styles['products-grid']}>
            {collection.products.map((product) => (
              <div key={product.id} className={styles['product-card']}>
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
                  <div className={styles['action-buttons']}>
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
      <div className={styles.shopLove}>
        <h2>Shop What You Love</h2>
        <div className={styles.cards}>
          {['Bracelets', 'Chains', 'Rings', 'Earrings'].map((category, index) => (
            <div key={index} className={styles.card} onClick={() => navigate('/products')}>
              <img src={ring1} alt={category} />
              <div className={styles.cardContent}>
                <h3>{category}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.reviews}>
        <h2>Our Customers ♥ Us</h2>
        <div className={styles.reviewCarousel}>
          {reviewSlides.map((slideGroup, slideIndex) => (
            <div key={slideIndex} className={`${styles.reviewSlide} ${currentReviewSlide === slideIndex ? styles.active : ''}`}>
              {slideGroup.map((review, reviewIndex) => (
                <div key={reviewIndex} className={styles.reviewCard}>
                  <div className={styles.reviewStars}>{renderStars(review.stars)}</div>
                  <p className={styles.reviewText}>{review.text}</p>
                  <div className={styles.reviewer}>
                    <img src={review.image} alt={review.author} />
                    <div className={styles.reviewerInfo}>
                      <h4>{review.author}</h4>
                      <p>{review.title}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
          <div className={styles.reviewIndicators}>
            {reviewSlides.map((_, index) => (
              <div
                key={index}
                className={`${styles.reviewIndicator} ${currentReviewSlide === index ? styles.active : ''}`}
                onClick={() => setCurrentReviewSlide(index)}
              ></div>
            ))}
          </div>
        </div>
      </div>
      <footer className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.footerContent}>
            <div className={styles.footerBrand}>
              <div className={styles.logos}>
                <div className={styles.logosIcon}></div>
                <div>
                  <div className={styles.logosText}>AAISHA</div>
                  <div className={styles.logosSubtext}>HOUSE OF SILVER</div>
                </div>
              </div>
              <p className={styles.brandDescription}>
                Unleash the radiance of your inner beauty with our premium silver jewelry brand - a perfect blend of sophistication and style.
              </p>
              <div className={styles.customSocialIcons}>
                <button onClick={() => navigate('/social/facebook')}><i className="fab fa-facebook-f"></i></button>
                <button onClick={() => navigate('/social/instagram')}><i className="fab fa-instagram"></i></button>
                <button onClick={() => navigate('/social/pinterest')}><i className="fab fa-pinterest-p"></i></button>
              </div>
              <div className={styles.footerBottom}>
                <div className={styles.paymentMethods}>
                  <img src={menPaytm} alt="Paytm" className={styles.paymentIcon} />
                  <img src={menGooglePay} alt="Google Pay" className={styles.paymentIcon} />
                  <img src={menVisa} alt="Visa" className={styles.paymentIcon} />
                  <img src={menMastercard} alt="Mastercard" className={styles.paymentIcon} />
                  <img src={menAmericanExpress} alt="American Express" className={styles.paymentIcon} />
                </div>
              </div>
            </div>
            <div className={styles.footerSection}>
              <h3>Account</h3>
              <ul>
                <li><button onClick={() => navigate('/dashboard')}>Dashboard</button></li>
                <li><button onClick={() => navigate('/orders')}>Orders</button></li>
                <li><button onClick={() => navigate('/wishlist')}>Wishlist</button></li>
                <li><button onClick={() => navigate('/addresses')}>Addresses</button></li>
              </ul>
            </div>
            <div className={styles.footerSection}>
              <h3>Help</h3>
              <ul>
                <li><button onClick={() => navigate('/about')}>About Us</button></li>
                <li><button onClick={() => navigate('/contact')}>Contact Support</button></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Men;
