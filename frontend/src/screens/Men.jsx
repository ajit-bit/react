import { Heart, ShoppingBag, Star } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import men1 from '../assets/images/men1.jpg';
import men2 from '../assets/images/men2.jpg';
import men3 from '../assets/images/men3.jpg';
import ring1 from '../assets/images/ring1.jpg';
import styles from '../styles/Men.module.css';

const Men = ({ setCartItems, setLikedItems }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [likedProducts, setLikedProducts] = useState(new Set());
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState({});
  const navigate = useNavigate();
  const sessionId = localStorage.getItem('sessionId') || uuidv4();
  const shopLoveRef = useRef(null);
  const reviewRef = useRef(null);
  const carouselRef = useRef(null);

  const sliderImages = [
    { src: men1, alt: 'Men Jewelry Slide 1 - Aaiisha House Silverware', text: 'Discover unique handmade jewelry bracelets with elegant silver accessories from Aaiisha House deals. A stylish wristband and trendy adornment for a chic, luxurious look.' },
    { src: men2, alt: 'Men Jewelry Slide 2 - Season Best Offer', text: 'Shop the season’s best sale with premium quality silver edge ornaments. Enjoy a discount offer on durable, polished chain links and a free gift with purchase.' },
    { src: men3, alt: 'Men Jewelry Slide 3 - Exclusive Design', text: 'Explore exclusive handmade artisan-crafted wrist jewelry. This special edition metallic gleam accessory is a valuable keepsake and statement piece for modern fashion.' },
  ];

  const shopLoveItems = [
    { src: ring1, alt: 'Bracelets - Stylish Wristband', category: 'Bracelets', text: 'Handcrafted bracelets, a trendy fashion accessory with elegant design and shiny polish.' },
    { src: ring1, alt: 'Chains - Elegant Chain Link', category: 'Chains', text: 'Luxurious chains with metallic gleam, a durable and stylish ornament for any occasion.' },
    { src: ring1, alt: 'Rings - Refined Adornment', category: 'Rings', text: 'Exquisite rings, a refined silverware piece with intricate details and timeless appeal.' },
    { src: ring1, alt: 'Earrings - Cool Tone Accessory', category: 'Earrings', text: 'Chic earrings with a cool tone, a unique decorative item for a sophisticated look.' },
  ];

  const reviewItems = [
    {
      stars: 5,
      text: "Amazing Aaiisha House silver edge accessories! The handmade jewelry was a cherished gift with fast, free delivery. Highly recommended by this verified buyer.",
      author: "Dixtia Patel",
      title: "Fashion Influencer",
      image: ring1,
    },
    {
      stars: 5,
      text: "Superb quality from Aaiisha House! The trendy wristband was a delightful purchase with a discount offer. Excellent customer service and a free gift touch!",
      author: "Md Shad",
      title: "Content Creator",
      image: ring1,
    },
    {
      stars: 5,
      text: "Outstanding handmade chain links! The luxurious design and reliable craftsmanship made this a treasured keepsake. Great value and satisfaction guaranteed.",
      author: "Laakshi Pathak",
      title: "Makeup Artist",
      image: ring1,
    },
    {
      stars: 4,
      text: "Impressed with the elegant silverware from Aaiisha House. The shiny polish and sturdy build exceeded my expectations as a verified shopper.",
      author: "Customer Review",
      title: "Verified Buyer",
      image: ring1,
    },
  ];

  const collections = [
    {
      name: 'Alpha Sports Collection',
      products: [
        { id: '507f1f77bcf86cd799439051', name: 'Silver Voltage Necklace', originalPrice: 720, currentPrice: 549, reviews: 12, rating: 4, image: ring1, hoverImage: men1, description: 'Bold silver necklace with a modern design.', category: 'necklaces' },
        { id: '507f1f77bcf86cd799439052', name: 'Black Voltage Necklace', originalPrice: 900, currentPrice: 599, reviews: 4, rating: 4, image: ring1, hoverImage: men1, description: 'Sleek black necklace for a bold statement.', category: 'necklaces' },
        { id: '507f1f77bcf86cd799439053', name: 'Bag Mitts Golden Chain', originalPrice: 1050, currentPrice: 749, reviews: 2, rating: 3, image: ring1, hoverImage: men1, description: 'Golden chain with a sporty edge.', category: 'chains' },
        { id: '507f1f77bcf86cd799439054', name: 'Bag Mitts Silver Cuff', originalPrice: 1300, currentPrice: 699, reviews: 4, rating: 2, image: ring1, hoverImage: men1, description: 'Silver cuff for a rugged look.', category: 'bracelets' },
      ],
    },
    {
      name: 'Icy and Spicy Jewellery',
      products: [
        { id: '507f1f77bcf86cd799439055', name: 'Ak 47 Silver Chain', originalPrice: 630, currentPrice: 549, reviews: 21, rating: 4, image: ring1, hoverImage: men1, description: 'Edgy silver chain with a bold design.', category: 'chains' },
        { id: '507f1f77bcf86cd799439056', name: 'Ak 47 Golden Chain', originalPrice: 630, currentPrice: 549, reviews: 13, rating: 3, image: ring1, hoverImage: men1, description: 'Golden chain with a striking look.', category: 'chains' },
        { id: '507f1f77bcf86cd799439057', name: 'Diamond Golden Tidbit Earrings', originalPrice: 900, currentPrice: 699, reviews: 6, rating: 3, image: ring1, hoverImage: men1, description: 'Golden earrings with diamond accents.', category: 'earrings' },
        { id: '507f1f77bcf86cd799439058', name: 'Cannabis Leaf Silver Chain', originalPrice: 1050, currentPrice: 799, reviews: 9, rating: 5, image: ring1, hoverImage: men1, description: 'Unique silver chain with a leaf motif.', category: 'chains' },
      ],
    },
    {
      name: 'Alpha BestSellers',
      products: [
        { id: '507f1f77bcf86cd799439059', name: 'Ak 47 Silver Chain', originalPrice: 630, currentPrice: 549, reviews: 21, rating: 4, image: ring1, hoverImage: men1, description: 'Edgy silver chain with a bold design.', category: 'chains' },
        { id: '507f1f77bcf86cd799439060', name: 'Ak 47 Golden Chain', originalPrice: 630, currentPrice: 549, reviews: 13, rating: 3, image: ring1, hoverImage: men1, description: 'Golden chain with a striking look.', category: 'chains' },
        { id: '507f1f77bcf86cd799439061', name: 'Diamond Golden Tidbit Earrings', originalPrice: 900, currentPrice: 699, reviews: 6, rating: 3, image: ring1, hoverImage: men1, description: 'Golden earrings with diamond accents.', category: 'earrings' },
        { id: '507f1f77bcf86cd799439062', name: 'Cannabis Leaf Silver Chain', originalPrice: 1050, currentPrice: 799, reviews: 9, rating: 5, image: ring1, hoverImage: men1, description: 'Unique silver chain with a leaf motif.', category: 'chains' },
      ],
    },
    {
      name: 'The Halloween Collection',
      products: [
        { id: '507f1f77bcf86cd799439063', name: 'Ak 47 Silver Chain', originalPrice: 630, currentPrice: 549, reviews: 21, rating: 4, image: ring1, hoverImage: men1, description: 'Edgy silver chain with a bold design.', category: 'chains' },
        { id: '507f1f77bcf86cd799439064', name: 'Ak 47 Golden Chain', originalPrice: 630, currentPrice: 549, reviews: 13, rating: 3, image: ring1, hoverImage: men1, description: 'Golden chain with a striking look.', category: 'chains' },
        { id: '507f1f77bcf86cd799439065', name: 'Diamond Golden Tidbit Earrings', originalPrice: 900, currentPrice: 699, reviews: 6, rating: 3, image: ring1, hoverImage: men1, description: 'Golden earrings with diamond accents.', category: 'earrings' },
        { id: '507f1f77bcf86cd799439066', name: 'Cannabis Leaf Silver Chain', originalPrice: 1050, currentPrice: 799, reviews: 9, rating: 5, image: ring1, hoverImage: men1, description: 'Unique silver chain with a leaf motif.', category: 'chains' },
      ],
    },
    {
      name: 'The Sicko Jewellery Collection',
      products: [
        { id: '507f1f77bcf86cd799439067', name: 'Ak 47 Silver Chain', originalPrice: 630, currentPrice: 549, reviews: 21, rating: 4, image: ring1, hoverImage: men1, description: 'Edgy silver chain with a bold design.', category: 'chains' },
        { id: '507f1f77bcf86cd799439068', name: 'Ak 47 Golden Chain', originalPrice: 630, currentPrice: 549, reviews: 13, rating: 3, image: ring1, hoverImage: men1, description: 'Golden chain with a striking look.', category: 'chains' },
        { id: '507f1f77bcf86cd799439069', name: 'Diamond Golden Tidbit Earrings', originalPrice: 900, currentPrice: 699, reviews: 6, rating: 3, image: ring1, hoverImage: men1, description: 'Golden earrings with diamond accents.', category: 'earrings' },
        { id: '507f1f77bcf86cd799439070', name: 'Cannabis Leaf Silver Chain', originalPrice: 1050, currentPrice: 799, reviews: 9, rating: 5, image: ring1, hoverImage: men1, description: 'Unique silver chain with a leaf motif.', category: 'chains' },
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
    return () => clearInterval(sliderInterval);
  }, [sliderImages.length]);

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
        theme="light"
      />
      <section className={styles.slider} ref={carouselRef}>
        <div className={styles.carouselInner} style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
          {sliderImages.map((slide, index) => (
            <div
              key={index}
              className={`${styles.carouselItem} ${currentSlide === index ? styles.active : ''}`}
            >
              <div className={styles.carouselContent}>
                <img src={slide.src} alt={slide.alt} className={styles.carouselImage} />
                <div className={styles.text}>
                  <h4>Curated for Him - Aaiisha House</h4>
                  <h1>Bold Statements in Silver</h1>
                  <p>{slide.text}</p>
                  <button onClick={() => navigate('/products')} className="btn btn-outline-dark">Shop Exclusive Deals</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      {collections.map((collection, collectionIndex) => (
        <div key={collectionIndex} className={styles.collection}>
          <h2>{collection.name}</h2>
          <button className={styles.viewMore} onClick={() => navigate('/collections')}>View All</button>
          <div className={styles.productsGrid}>
            {collection.products.map((product) => (
              <div 
                key={product.id} 
                className={styles.productCard} 
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
      <div className={styles.shopLove}>
        <h2>Shop What You Love - Aaiisha House Deals</h2>
        <div className={styles.shopLoveSlider} ref={shopLoveRef}>
          {shopLoveItems.map((item, index) => (
            <div key={index} className={styles.shopLoveCard}>
              <div className={styles['product-image-container']}>
                <div className={styles['product-image-wrapper']}>
                  <img src={item.src} alt={item.alt} className={styles['product-image']} />
                </div>
              </div>
              <div className={styles.cardContent}>
                <h3>{item.category}</h3>
                <p className={styles.reviewText}>{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.reviews}>
        <h2>Our Customers ♥ Us - Aaiisha House Reviews</h2>
        <div className={styles.reviewCarousel} ref={reviewRef}>
          {reviewItems.map((review, index) => (
            <div key={index} className={styles.reviewCard}>
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
      </div>
    </div>
  );
};

export default Men;