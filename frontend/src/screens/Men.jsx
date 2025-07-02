import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

const Men = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentReviewSlide, setCurrentReviewSlide] = useState(0);
  const navigate = useNavigate();

  const sliderImages = [
    { src: men1, alt: 'Men Jewelry Slide 1' },
    { src: men2, alt: 'Men Jewelry Slide 2' },
    { src: men3, alt: 'Men Jewelry Slide 3' }
  ];

  const reviewSlides = [
    [
      {
        stars: 5,
        text: "Pretty good stuff salty! They are helpful, and go the extra mile to ensure customer satisfaction. It's refreshing to find a brand that truly values its customers.",
        author: "Dixtia Patel",
        title: "Fashion Influencer",
        image: ring1
      },
      {
        stars: 5,
        text: "Omg! Everything is just superb and high quality, can wait to try more. they are perfect for lounging on the beach or by the pool. I wore those chains and studs in my goa trip.",
        author: "Md Shad",
        title: "Content Creator",
        image: ring1
      },
      {
        stars: 5,
        text: "I'm obsessed with the quality of the accessories from Salty. The materials used are durable and long-lasting! And also they have great customer support",
        author: "Laakshi Pathak",
        title: "Makeup Artist",
        image: ring1
      }
    ],
    [
      {
        stars: 5,
        text: "Amazing quality and fast delivery. The jewelry looks exactly like the pictures and feels premium. Highly recommended!",
        author: "Customer Review",
        title: "Verified Buyer",
        image: ring1
      },
      {
        stars: 5,
        text: "I'm obsessed with the quality of the accessories from Salty. The materials used are durable and long-lasting! And also they have great customer support",
        author: "Laakshi Pathak",
        title: "Makeup Artist",
        image: ring1
      },
      {
        stars: 5,
        text: "I'm obsessed with the quality of the accessories from Salty. The materials used are durable and long-lasting! And also they have great customer support",
        author: "Laakshi Pathak",
        title: "Makeup Artist",
        image: ring1
      }
    ]
  ];

  useEffect(() => {
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

  const handleWishlistClick = (e) => {
    e.preventDefault();
    const button = e.target.closest(`.${styles.wishlistIcon}`);
    if (button.textContent === '♡') {
      button.textContent = '♥';
      button.style.color = 'red';
    } else {
      button.textContent = '♡';
      button.style.color = 'black';
    }
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  const renderStars = (count) => {
    return '★'.repeat(count) + '☆'.repeat(5 - count);
  };

  return (
    <div className={styles.menPage}>
      <section className={styles.slider}>
        <div className={`${styles.slide} ${currentSlide === 0 ? styles.active : ''}`}>
          <div className={styles.text}>
            <h4>Curated for Him</h4>
            <h1>BOLD STATEMENTS</h1>
            <p>Discover powerful jewelry made for modern men — statement chains, sleek rings, and versatile accessories.</p>
            <button onClick={() => handleNavigation('/products')}>Shop now</button>
          </div>
          <img src={sliderImages[0].src} alt={sliderImages[0].alt} />
        </div>

        <div className={`${styles.slide} ${currentSlide === 1 ? styles.active : ''}`}>
          <div className={styles.text}>
            <h4>Season's Best</h4>
            <h1>SILVER EDGE</h1>
            <p>Refined designs in cool silver tones — perfect for layering or wearing solely solo. Command attention with confidence.</p>
            <button onClick={() => handleNavigation('/products')}>Shop now</button>
          </div>
          <img src={sliderImages[1].src} alt={sliderImages[1].alt} />
        </div>

        <div className={`${styles.slide} ${currentSlide === 2 ? styles.active : ''}`}>
          <div className={styles.text}>
            <h4>Urban Appeal</h4>
            <h1>STREET STYLE</h1>
            <p>From casual wear to special occasions, elevate your style with pieces that make every moment count.</p>
            <button onClick={() => handleNavigation('/products')}>Shop now</button>
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

      <div className={styles.collection}>
        <h2>Alpha Sports Collection</h2>
        <button className={styles.viewMore} onClick={() => handleNavigation('/collections')}>View All</button>
        <div className={styles.cards}>
          {[
            { name: 'Silver Voltage Necklace', originalPrice: 720, currentPrice: 549, reviews: 12, rating: 4 },
            { name: 'Black Voltage Necklace', originalPrice: 900, currentPrice: 599, reviews: 4, rating: 4 },
            { name: 'Bag Mitts Golden Chain', originalPrice: 1050, currentPrice: 749, reviews: 2, rating: 3 },
            { name: 'Bag Mitts Silver Cuff', originalPrice: 1300, currentPrice: 699, reviews: 4, rating: 2 }
          ].map((product, index) => (
            <div key={index} className={styles.card}>
              <button className={styles.wishlistIcon} onClick={handleWishlistClick}>♡</button>
              <img src={ring1} alt={product.name} />
              <div className={styles.cardContent}>
                <h3>{product.name}</h3>
                <div className={styles.cardRating}>
                  <div className={styles.stars}>{renderStars(product.rating)}</div>
                  <p className={styles.reviewCount}>{product.reviews} reviews</p>
                </div>
                <div className={styles.price}>
                  <span className={styles.originalPrice}>Rs. {product.originalPrice}.00</span>
                  <span className={styles.currentPrice}>Rs. {product.currentPrice}.00</span>
                </div>
                <button className={styles.addToCart}>Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {[
        'Icy and Spicy Jewellery',
        'Alpha BestSellers',
        'The Halloween Collection',
        'The Sicko Jewellery Collection'
      ].map((collectionName, collectionIndex) => (
        <div key={collectionIndex} className={styles.jeweler}>
          <h2>{collectionName}</h2>
          <button className={styles.viewMore} onClick={() => handleNavigation('/collections')}>View All</button>
          <div className={styles.cards}>
            {[
              { name: 'Ak 47 Silver Chain', originalPrice: 630, currentPrice: 549, reviews: 21, rating: 4 },
              { name: 'Ak 47 Golden Chain', originalPrice: 630, currentPrice: 549, reviews: 13, rating: 3 },
              { name: 'Diamond Golden Tidbit Earrings', originalPrice: 900, currentPrice: 699, reviews: 6, rating: 3 },
              { name: 'Cannabis Leaf Silver Chain', originalPrice: 1050, currentPrice: 799, reviews: 9, rating: 5 }
            ].map((product, index) => (
              <div key={index} className={styles.card}>
                <button className={styles.wishlistIcon} onClick={handleWishlistClick}>♡</button>
                <img src={ring1} alt={product.name} />
                <div className={styles.cardContent}>
                  <h3>{product.name}</h3>
                  <div className={styles.cardRating}>
                    <div className={styles.stars}>{renderStars(product.rating)}</div>
                    <span className={styles.reviewCount}>{product.reviews} reviews</span>
                  </div>
                  <div className={styles.price}>
                    <span className={styles.originalPrice}>Rs. {product.originalPrice}.00</span>
                    <span className={styles.currentPrice}>Rs. {product.currentPrice}.00</span>
                  </div>
                  <button className={styles.addToCart}>Add to Cart</button>
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
            <div key={index} className={styles.card} onClick={() => handleNavigation(`/category/${category.toLowerCase()}`)}>
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
                <button onClick={() => handleNavigation('/social/facebook')}><i className="fab fa-facebook-f"></i></button>
                <button onClick={() => handleNavigation('/social/instagram')}><i className="fab fa-instagram"></i></button>
                <button onClick={() => handleNavigation('/social/pinterest')}><i className="fab fa-pinterest-p"></i></button>
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
                <li><button onClick={() => handleNavigation('/dashboard')}>Dashboard</button></li>
                <li><button onClick={() => handleNavigation('/orders')}>Orders</button></li>
                <li><button onClick={() => handleNavigation('/wishlist')}>Wishlist</button></li>
                <li><button onClick={() => handleNavigation('/addresses')}>Addresses</button></li>
              </ul>
            </div>

            <div className={styles.footerSection}>
              <h3>Help</h3>
              <ul>
                <li><button onClick={() => handleNavigation('/about')}>About Us</button></li>
                <li><button onClick={() => handleNavigation('/contact')}>Contact Support</button></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Men;