import React, { useState, useEffect } from 'react';
import '../styles/Home.css';
// Import all images
import slide1 from '../../images/slide1.png';
import slide2 from '../../images/slide2.png';
import slide3 from '../../images/slide3.png';
import ring1 from '../../images/ring1.jpg';
import immg1 from '../../images/immg1.png';
import immg2 from '../../images/immg2.png';
import immg3 from '../../images/immg3.png';
import immg4 from '../../images/immg4.png';
import goldring from '../../images/goldring.jpg';
import silvernecklace from '../../images/silvernecklace.jpg';
import chain1 from '../../images/chain.png';
import bracelet1 from '../../images/bracelet1.jpg';
import watch from '../../images/watch.jpg';
import essentialsVacation from '../../images/essentials-vacation.jpg';
import essentialsWork from '../../images/essentials-work.jpg';
import essentialsCasual from '../../images/essentials-casual.jpg';
import essentialsWedding from '../../images/essentials-wedding.jpg';
import earing1 from '../../images/earing1.jpg';
import neck from '../../images/neck.jpg';
import myntra from '../../images/myntra.png';
import testimonial1 from '../../images/testimonial-1.jpg';
import testimonial2 from '../../images/testimonial-2.jpg';
import testimonial3 from '../../images/testimonial-3.jpg';



const App = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('rings');

  
  // Slider functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlideIndex(prev => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Carousel functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCarouselIndex(prev => (prev > 2) ? 0 : prev + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentSlideIndex(prev => (prev + 1) % 3);
  };

  const prevSlide = () => {
    setCurrentSlideIndex(prev => (prev - 1 + 3) % 3);
  };

  const nextCarouselSlide = () => {
    setCarouselIndex(prev => (prev > 2) ? 0 : prev + 1);
  };

  

  const handleAddToCart = async (e, card) => {
    e.stopPropagation();
    const name = card.name;
    const price = card.price;
    const image = card.image;

    if (!name || !image) {
      alert('Error: Product details not found.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/cart/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, price, image })
      });
      if (!response.ok) throw new Error('Network response was not ok');
      alert(`${name} added to cart!`);
    } catch (err) {
      console.error('Cart add error:', err);
      alert('Failed to add to cart. Using demo mode: Item added locally.');
    }
  };

  const handleLike = async (e, card) => {
    e.stopPropagation();
    const name = card.name;
    const price = card.price;
    const image = card.image;

    if (!name || !image) {
      alert('Error: Product details not found.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/liked/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, price, image })
      });
      if (!response.ok) throw new Error('Network response was not ok');
      alert(`${name} added to wishlist!`);
    } catch (err) {
      console.error('Wishlist error:', err);
      alert(`Failed to update wishlist. Using demo mode: ${name} added to wishlist locally.`);
    }
  };

  const productData = {
    rings: [
      { name: "9CT WHITE GOLD 0.33CT TOTAL DIAMOND ETERNITY", price: 2799, image: chain1, badge: "Sale", rating: "★★★★★", count: 1 },
      { name: "9CT WHITE GOLD 0.25CT TOTAL DIAMOND SOLITAIRE", price: 3799, image: chain1, rating: "★★★★★", count: 2 },
      { name: "9CT WHITE GOLD DIAMOND TWISTED ETERNITY RING", price: 5699, image: chain1, rating: "★★★★☆", count: 5 },
      { name: "9CT WHITE GOLD CUBIC ZIRCONIA SOLITAIRE RING", price: 4399, image: chain1, badge: "Popular", rating: "★★★★★", count: 8 },
      { name: "9CT WHITE GOLD I LOVE YOU RING", price: 3699, image: chain1, rating: "★★★★★", count: 3 }
    ],
    earrings: [
      { name: "9CT YELLOW GOLD DIAMOND DROP EARRINGS", price: 1999, image: goldring, badge: "Sale", rating: "★★★★★", count: 4 },
      { name: "9CT WHITE GOLD PEARL STUD EARRINGS", price: 2499, image: goldring, rating: "★★★★★", count: 6 },
      { name: "9CT ROSE GOLD HOOP EARRINGS", price: 3299, image: goldring, badge: "Popular", rating: "★★★★☆", count: 3 },
      { name: "9CT WHITE GOLD CUBIC ZIRCONIA STUDS", price: 1799, image:  goldring, rating: "★★★★★", count: 7 },
      { name: "9CT YELLOW GOLD CHANDELIER EARRINGS", price: 2699, image:goldring, rating: "★★★★★", count: 2 }
    ],
    necklaces: [
      { name: "9CT WHITE GOLD DIAMOND PENDANT NECKLACE", price: 3999, image: goldring, badge: "Sale", rating: "★★★★★", count: 5 },
      { name: "9CT YELLOW GOLD HEART LOCKET NECKLACE", price: 4599, image: goldring, rating: "★★★★★", count: 3 },
      { name: "9CT ROSE GOLD INFINITY NECKLACE", price: 5299, image: goldring, badge: "Popular", rating: "★★★★☆", count: 6 },
      { name: "9CT WHITE GOLD PEARL DROP NECKLACE", price: 3499, image: goldring, rating: "★★★★★", count: 4 },
      { name: "9CT YELLOW GOLD GEMSTONE NECKLACE", price: 4199, image: goldring, rating: "★★★★★", count: 2 }
    ]
  };

  return (
    <div className="App">

      <section className="slider">
        <div className={`slide ${currentSlideIndex === 0 ? 'active' : ''}`}>
          <div className="text">
            <h4>New Collection</h4>
            <h1>FANCY JEWELERY</h1>
            <p>Jewelry Joice is a fresh and conceptual in the world of jewelry. You will get a unique, one-of-a-kind decoration that will suit you better than any other.</p>
            <button>Shop now</button>
          </div>
          <img src={slide1} alt="Slide 1" />
        </div>
        <div className={`slide ${currentSlideIndex === 1 ? 'active' : ''}`}>
          <div className="text">
            <h4>New Arrivals</h4>
            <h1>GOLDEN GLAM</h1>
            <p>Discover the elegance of our latest collection – golden chains, earrings, and bracelets that shine as bright as you.</p>
            <button>Shop now</button>
          </div>
          <img src={slide2} alt="Slide 2" />
        </div>
        <div className={`slide ${currentSlideIndex === 2 ? 'active' : ''}`}>
          <div className="text">
            <h4>Limited Offer</h4>
            <h1>CLASSIC STYLE</h1>
            <p>Elegant and timeless designs that complement every outfit. Get the classic style you always dreamed of.</p>
            <button>Shop now</button>
          </div>
          <img src={slide3}alt="Slide 3" />
        </div>

        <div className="slider-nav">
          <button className="prev" onClick={prevSlide}></button>
          <button className="next" onClick={nextSlide}></button>
        </div>
      </section>

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
        <button className="next-btn" onClick={nextCarouselSlide}>&#10095;</button>
      </div>

      <div className="container">
        <h1 className="main-title">New Collection</h1>
        <div className="title-divider"></div>

        <div className="layout-wrapper">
          <div className="left-section">
            <div className="image-container main-model">
              <img src= {immg1} alt="Elegant Model" className="jewelry-image" />
            </div>
          </div>

          <div className="right-section">
            <div className="right-top">
              <div className="image-container ring-model">
                <img src= {immg2} alt="Ring" className="jewelry-image" />
                <div className="text-overlay discover-overlay">
                  <div className="overlay-title">Timeless Elegance</div>
                  <div className="overlay-subtitle">New Arrivals</div>
                  <a href="#" className="discover-btn">Discover more</a>
                </div>
              </div>
            </div>

            <div className="right-bottom">
              <div className="bottom-left">
                <div className="image-container heart-necklace">
                  <img src= {immg3} alt="Heart Necklace" className="jewelry-image" />
                  <div className="text-overlay story-overlay">
                    <div className="overlay-titles">Jewellery Tells</div>
                    <div className="overlay-subtitle">A Great Story</div>
                    <a href="#" className="discover-btn">Discover more</a>
                  </div>
                </div>
              </div>

              <div className="bottom-right">
                <div className="image-container statement-necklace">
                  <img src={immg4} alt="Statement Necklace" className="jewelry-image" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="trending-section">
        <h2 className="section-title"> Trending Jewelry </h2>
        <div className="jewelry-container">
          <div className="jewelry-card">
            <img src= {goldring} alt="Gold Ring" />
            <h3>Elegant Gold Ring</h3>
          </div>

          <div className="jewelry-card">
            <img src= {silvernecklace} alt="Silver Necklace" />
            <h3>Silver Necklace</h3>
          </div>

          <div className="jewelry-card">
            <img src={chain1} alt="Diamond Earrings" />
            <h3>Diamond Earrings</h3>
          </div>

          <div className="jewelry-card">
            <img src= {bracelet1} alt="Gold Bracelet" />
            <h3>Gold Bracelet</h3>
          </div>

          <div className="jewelry-card">
            <img src={ring1} alt="Silver Bracelet" />
            <h3>Silver Bracelet</h3>
          </div>
        </div>
      </section>

      <h1 className="shop-heading">TOP PRODUCTS</h1>

      <ul className="shop-tabs">
        <li className={`shop-tab ${activeTab === 'rings' ? 'active' : ''}`} onClick={() => setActiveTab('rings')}>Rings</li>
        <li className={`shop-tab ${activeTab === 'earrings' ? 'active' : ''}`} onClick={() => setActiveTab('earrings')}>Earrings</li>
        <li className={`shop-tab ${activeTab === 'necklaces' ? 'active' : ''}`} onClick={() => setActiveTab('necklaces')}>Necklaces</li>
      </ul>

      <section className={`shop-section ${activeTab === 'rings' ? 'active' : ''}`} id="rings">
        <div className="shop-grid">
          {activeTab === 'rings' && productData.rings.map((product, index) => (
            <article key={index} className="shop-card" data-price={product.price}>
              {product.badge && <div className={`badge ${product.badge.toLowerCase()}`}>{product.badge}</div>}
              <div className="img-box">
                <img className="product-img default" src={product.image} alt={`${product.name} front`} />
                <img className="product-img hover" src={product.image} alt={`${product.name} alt`} />
              </div>
              <div className="card-body">
                <p className="prod-title">{product.name}</p>
                <p className="rating">{product.rating} <span className="count">{product.count}</span></p>
                <p className="price">₹{product.price.toLocaleString()}</p>
                <div className="actions">
                  <button className="btn-cart" onClick={(e) => handleAddToCart(e, product)}>Add to Cart</button>
                  <button className="btn-like" onClick={(e) => handleLike(e, product)}><i className="far fa-heart"></i></button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={`shop-section ${activeTab === 'earrings' ? 'active' : ''}`} id="earrings">
        <div className="shop-grid">
          {activeTab === 'earrings' && productData.earrings.map((product, index) => (
            <article key={index} className="shop-card" data-price={product.price}>
              {product.badge && <div className={`badge ${product.badge.toLowerCase()}`}>{product.badge}</div>}
              <div className="img-box">
                <img className="product-img default" src={product.image} alt={`${product.name} front`} />
                <img className="product-img hover" src={product.image} alt={`${product.name} alt`} />
              </div>
              <div className="card-body">
                <p className="prod-title">{product.name}</p>
                <p className="rating">{product.rating} <span className="count">{product.count}</span></p>
                <p className="price">₹{product.price.toLocaleString()}</p>
                <div className="actions">
                  <button className="btn-cart" onClick={(e) => handleAddToCart(e, product)}>Add to Cart</button>
                  <button className="btn-like" onClick={(e) => handleLike(e, product)}><i className="far fa-heart"></i></button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={`shop-section ${activeTab === 'necklaces' ? 'active' : ''}`} id="necklaces">
        <div className="shop-grid">
          {activeTab === 'necklaces' && productData.necklaces.map((product, index) => (
            <article key={index} className="shop-card" data-price={product.price}>
              {product.badge && <div className={`badge ${product.badge.toLowerCase()}`}>{product.badge}</div>}
              <div className="img-box">
                <img className="product-img default" src={product.image} alt={`${product.name} front`} />
                <img className="product-img hover" src={product.image} alt={`${product.name} alt`} />
              </div>
              <div className="card-body">
                <p className="prod-title">{product.name}</p>
                <p className="rating">{product.rating} <span className="count">{product.count}</span></p>
                <p className="price">₹{product.price.toLocaleString()}</p>
                <div className="actions">
                  <button className="btn-cart" onClick={(e) => handleAddToCart(e, product)}>Add to Cart</button>
                  <button className="btn-like" onClick={(e) => handleLike(e, product)}><i className="far fa-heart"></i></button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="hero">
        <div className="card">
          <img src={ring1} alt="Wedding Ring" />
          <div className="content">
            <p className="subtitle">New Collection</p>
            <h2>Wedding Rings</h2>
            <p className="text">
              Celebrate your love with our exquisite collection of wedding rings
            </p>
            <a href="#" className="btn">Discover more</a>
          </div>
        </div>
        <div className="card">
          <img src= {watch} alt="Luxury Watch" />
          <div className="content">
            <p className="subtitle">Timeless Beauty</p>
            <h2>Luxury Watches</h2>
            <p className="text">
              Discover the perfect accessory that defines your unique sense of luxury.
            </p>
            <a href="#" className="btn">Discover more</a>
          </div>
        </div>
      </section>

      <section className="section-essentials">
        <h1 className="heading-essentials">Essentials For You</h1>

        <div className="grid-essentials">
          <div className="card-essentials">
            <img src= {essentialsVacation} alt="Vacation Essentials" />
            <h2>VACAY</h2>
            <button>Discover</button>
          </div>

          <div className="card-essentials">
            <img src= {essentialsWork} alt="Work Mode Essentials" />
            <h2>WORK</h2>
            <button>Discover</button>
          </div>

          <div className="card-essentials">
            <img src= {essentialsCasual} alt="Casual Essentials" />
            <h2>CASUAL</h2>
            <button>Discover</button>
          </div>

          <div className="card-essentials">
            <img src= {essentialsWedding} alt="Wedding Essentials" />
            <h2>WEDDING</h2>
            <button>Discover</button>
          </div>
        </div>
      </section>

      <section className="shop-by-price-section" id="shopbyprice">
        <h2 className="section-title">Shop by Price</h2>
        <div className="price-grid">
          <div className="price-card">
            <p className="price-label">Under</p>
            <p className="price-value">₹999</p>
            <button className="price-btn"><i className="fas fa-chevron-right"></i></button>
          </div>
          <div className="price-card">
            <p className="price-label">Under</p>
            <p className="price-value">₹2999</p>
            <button className="price-btn"><i className="fas fa-chevron-right"></i></button>
          </div>
          <div className="price-card">
            <p className="price-label">Under</p>
            <p className="price-value">₹4999</p>
            <button className="price-btn"><i className="fas fa-chevron-right"></i></button>
          </div>
          <div className="price-card premium">
            <p className="price-label">Premium</p>
            <p className="price-value">Gifts</p>
            <button className="price-btn"><i className="fas fa-chevron-right"></i></button>
          </div>
        </div>
      </section>

      <section className="newsletter-banner">
        <div className="banner-image">
          <img src= {immg2} alt="Newsletter Promo Image" />
        </div>
        <div className="banner-content">
          <h2>15% DISCOUNT</h2>
          <p></p>
          <form className="newsletter-form">
            <input type="email" placeholder="Email address" required />
            <button type="submit">→</button>
          </form>
        </div>
      </section>

      <div className="must-haves">
        <h3>Must Haves</h3>
        <div className="items-grid">
          <div className="item-card">
            <img src= {earing1} alt="Earrings" />
            <p>Elegant Earrings</p>
          </div>
          <div className="item-card">
            <img src= {neck} alt="Necklace" />
            <p>Classic Necklace</p>
          </div>
          <div className="item-card">
            <img src={ring1} alt="Ring" />
            <p>Stylish Ring</p>
          </div>
          <div className="item-card">
            <img src= {bracelet1} alt="Bracelet" />
            <p>Trendy Bracelet</p>
          </div>
          <div className="item-card">
            <img src={chain1} alt="Pendant" />
            <p>Delicate Pendant</p>
          </div>
        </div>
      </div>

      <section className="available-at-section">
        <h1>AVAILABLE AT</h1>
        <div className="title-divider"></div>
        
        <div className="marketplace-logos">
          <a href="#" className="marketplace-logo">
            <div className="logo-circle">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2560px-Amazon_logo.svg.png" alt="Amazon" className="marketplace-icon" />
            </div>
            <p>Amazon</p>
          </a>
          <a href="#" className="marketplace-logo">
            <div className="logo-circle">
              <img src="https://logos-world.net/wp-content/uploads/2020/11/Flipkart-Logo.png" alt="Flipkart" className="marketplace-icon" />
            </div>
            <p>Flipkart</p>
          </a>
          <a href="#" className="marketplace-logo">
            <div className="logo-circle">
              <img src= {myntra} alt="Myntra" className="marketplace-icon" style={{height: '50px'}} />
            </div>
            <p>Myntra</p>
          </a>
        </div>
      </section>

      <section className="testimonials-section">
        <h1>WHAT OUR CLIENTS SAY</h1>
        <div className="title-divider"></div>
        
        <div className="testimonials-grid">
          <div className="testimonial-card">
            <div className="testimonial-rating">★★★★★</div>
            <p className="testimonial-text">"The quality of the silver jewelry I received from AAISHA HOUSE OF SILVER was exceptional. The craftsmanship and attention to detail truly stands out. I've received so many compliments on my necklace!"</p>
            <div className="testimonial-author">
              <img src= {testimonial1} alt="Sarah J." className="author-image" />
              <div className="author-info">
                <p className="author-name">Sarah J.</p>
                <p className="author-title">Loyal Customer</p>
              </div>
            </div>
          </div>
          
          <div className="testimonial-card">
            <div className="testimonial-rating">★★★★★</div>
            <p className="testimonial-text">"I purchased a gift for my wife's anniversary from AAISHA HOUSE OF SILVER, and she absolutely loved it! The packaging was elegant and the ring was even more beautiful than in the pictures. Will definitely shop here again."</p>
            <div className="testimonial-author">
              <img src= {testimonial2} alt="Robert K." className="author-image" />
              <div className="author-info">
                <p className="author-name">Robert K.</p>
                <p className="author-title">Happy Customer</p>
              </div>
            </div>
          </div>
          
          <div className="testimonial-card">
            <div className="testimonial-rating">★★★★★</div>
            <p className="testimonial-text">"The customer service at AAISHA HOUSE OF SILVER is impeccable. They helped me find the perfect bracelet for my style and budget. The piece arrived promptly and was exactly what I wanted. Highly recommend!"</p>
            <div className="testimonial-author">
              <img src= {testimonial3} alt="Mia L." className="author-image" />
              <div className="author-info">
                <p className="author-name">Mia L.</p>
                <p className="author-title">Repeat Customer</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <br />
      <br />
      <br />

      <section className="feature-section">
        <div className="feature-container">
          <div className="feature-item">
            <div className="icon-circle"><i className="fas fa-truck"></i></div>
            <h4>Free Shipping</h4>
            <p>On orders over ₹1999</p>
          </div>
          <div className="feature-item">
            <div className="icon-circle"><i className="fas fa-undo"></i></div>
            <h4>30 Days Return</h4>
            <p>Exchange product easily</p>
          </div>
          <div className="feature-item">
            <div className="icon-circle"><i className="fas fa-lock"></i></div>
            <h4>Secure Payment</h4>
            <p>Payment Cards Accepted</p>
          </div>
          <div className="feature-item">
            <div className="icon-circle"><i className="fas fa-headset"></i></div>
            <h4>24/7 Support</h4>
            <p>Contact us Anytime</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      
    </div>
  );
};

export default App;