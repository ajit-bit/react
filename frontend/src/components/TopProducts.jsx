import React, { useState } from 'react';
import { Container, Card } from 'react-bootstrap';
import styles from '../styles/TopProducts.module.css';

const productData = {
  rings: [
    { 
      id: 1,
      name: "9CT WHITE GOLD 0.33CT DIAMOND ETERNITY", 
      price: 2799, 
      image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop", 
      hoverImage: "https://images.unsplash.com/photo-1614292264945-5b882e3b5f8e?w=400&h=400&fit=crop",
      badge: "Sale", 
      rating: "★★★★★", 
      count: 1 
    },
    { 
      id: 2,
      name: "9CT WHITE GOLD 0.25CT DIAMOND SOLITAIRE", 
      price: 3799, 
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop", 
      hoverImage: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=400&fit=crop",
      rating: "★★★★★", 
      count: 2 
    },
    { 
      id: 3,
      name: "9CT WHITE GOLD DIAMOND TWISTED ETERNITY", 
      price: 5699, 
      image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop", 
      hoverImage: "https://images.unsplash.com/photo-1614292264945-5b882e3b5f8e?w=400&h=400&fit=crop",
      rating: "★★★★☆", 
      count: 5 
    },
    { 
      id: 4,
      name: "9CT WHITE GOLD CUBIC ZIRCONIA SOLITAIRE", 
      price: 4399, 
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop", 
      hoverImage: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=400&fit=crop",
      badge: "Popular", 
      rating: "★★★★★", 
      count: 8 
    },
    { 
      id: 5,
      name: "9CT WHITE GOLD I LOVE YOU RING", 
      price: 3699, 
      image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop", 
      hoverImage: "https://images.unsplash.com/photo-1614292264945-5b882e3b5f8e?w=400&h=400&fit=crop",
      rating: "★★★★★", 
      count: 3 
    },
    { 
      id: 6,
      name: "9CT WHITE GOLD PRINCESS CUT DIAMOND", 
      price: 6299, 
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop", 
      hoverImage: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=400&fit=crop",
      rating: "★★★★★", 
      count: 7 
    },
    { 
      id: 7,
      name: "9CT WHITE GOLD EMERALD CUT DIAMOND", 
      price: 7899, 
      image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop", 
      hoverImage: "https://images.unsplash.com/photo-1614292264945-5b882e3b5f8e?w=400&h=400&fit=crop",
      badge: "New", 
      rating: "★★★★★", 
      count: 2 
    }
  ],
  earrings: [
    { 
      id: 8,
      name: "9CT YELLOW GOLD DIAMOND DROP EARRINGS", 
      price: 1999, 
      image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=400&fit=crop", 
      hoverImage: "https://images.unsplash.com/photo-1629639948084-1b6da5a9c3f4?w=400&h=400&fit=crop",
      badge: "Sale", 
      rating: "★★★★★", 
      count: 4 
    },
    { 
      id: 9,
      name: "9CT WHITE GOLD PEARL STUD EARRINGS", 
      price: 2499, 
      image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=400&fit=crop", 
      hoverImage: "https://images.unsplash.com/photo-1629639948084-1b6da5a9c3f4?w=400&h=400&fit=crop",
      rating: "★★★★★", 
      count: 6 
    },
    { 
      id: 10,
      name: "9CT ROSE GOLD HOOP EARRINGS", 
      price: 3299, 
      image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=400&fit=crop", 
      hoverImage: "https://images.unsplash.com/photo-1629639948084-1b6da5a9c3f4?w=400&h=400&fit=crop",
      badge: "Popular", 
      rating: "★★★★☆", 
      count: 3 
    },
    { 
      id: 11,
      name: "9CT WHITE GOLD DIAMOND HUGGIE EARRINGS", 
      price: 4599, 
      image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=400&fit=crop", 
      hoverImage: "https://images.unsplash.com/photo-1629639948084-1b6da5a9c3f4?w=400&h=400&fit=crop",
      rating: "★★★★★", 
      count: 5 
    },
    { 
      id: 12,
      name: "9CT YELLOW GOLD CHANDELIER EARRINGS", 
      price: 5299, 
      image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=400&fit=crop", 
      hoverImage: "https://images.unsplash.com/photo-1629639948084-1b6da5a9c3f4?w=400&h=400&fit=crop",
      badge: "New", 
      rating: "★★★★★", 
      count: 8 
    },
    { 
      id: 13,
      name: "9CT WHITE GOLD TEARDROP EARRINGS", 
      price: 3899, 
      image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=400&fit=crop", 
      hoverImage: "https://images.unsplash.com/photo-1629639948084-1b6da5a9c3f4?w=400&h=400&fit=crop",
      rating: "★★★★☆", 
      count: 6 
    }
  ],
  necklaces: [
    { 
      id: 14,
      name: "9CT WHITE GOLD DIAMOND PENDANT NECKLACE", 
      price: 3999, 
      image: "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=400&h=400&fit=crop", 
      hoverImage: "https://images.unsplash.com/photo-1612728264640-2d1c4b64e2c7?w=400&h=400&fit=crop",
      badge: "Sale", 
      rating: "★★★★★", 
      count: 5 
    },
    { 
      id: 15,
      name: "9CT YELLOW GOLD HEART LOCKET NECKLACE", 
      price: 4599, 
      image: "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=400&h=400&fit=crop", 
      hoverImage: "https://images.unsplash.com/photo-1612728264640-2d1c4b64e2c7?w=400&h=400&fit=crop",
      rating: "★★★★★", 
      count: 3 
    },
    { 
      id: 16,
      name: "9CT WHITE GOLD TENNIS NECKLACE", 
      price: 7899, 
      image: "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=400&h=400&fit=crop", 
      hoverImage: "https://images.unsplash.com/photo-1612728264640-2d1c4b64e2c7?w=400&h=400&fit=crop",
      badge: "Premium", 
      rating: "★★★★★", 
      count: 9 
    },
    { 
      id: 17,
      name: "9CT ROSE GOLD INFINITY NECKLACE", 
      price: 2899, 
      image: "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=400&h=400&fit=crop", 
      hoverImage: "https://images.unsplash.com/photo-1612728264640-2d1c4b64e2c7?w=400&h=400&fit=crop",
      rating: "★★★★☆", 
      count: 4 
    },
    { 
      id: 18,
      name: "9CT WHITE GOLD CROSS PENDANT NECKLACE", 
      price: 3299, 
      image: "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=400&h=400&fit=crop", 
      hoverImage: "https://images.unsplash.com/photo-1612728264640-2d1c4b64e2c7?w=400&h=400&fit=crop",
      rating: "★★★★★", 
      count: 7 
    },
    { 
      id: 19,
      name: "9CT YELLOW GOLD LAYERED CHAIN NECKLACE", 
      price: 5199, 
      image: "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=400&h=400&fit=crop", 
      hoverImage: "https://images.unsplash.com/photo-1612728264640-2d1c4b64e2c7?w=400&h=400&fit=crop",
      badge: "Trending", 
      rating: "★★★★★", 
      count: 12 
    }
  ]
};

const TopProducts = () => {
  const [activeTab, setActiveTab] = useState('rings');
  const [likedProducts, setLikedProducts] = useState(new Set());

  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    alert(`${product.name} added to cart!`);
  };

  const handleLike = (e, product) => {
    e.stopPropagation();
    const newLikedProducts = new Set(likedProducts);
    if (newLikedProducts.has(product.id)) {
      newLikedProducts.delete(product.id);
    } else {
      newLikedProducts.add(product.id);
    }
    setLikedProducts(newLikedProducts);
  };

  const renderProductGrid = (products) => (
    <div className={styles.shopGrid}>
      {products.map((product) => (
        <div key={product.id} className={styles.shopCardWrapper}>
          <Card className={`${styles.shopCard} h-100`}>
            {product.badge && (
              <div className={`${styles.badge} ${styles[product.badge.toLowerCase()]}`}>
                {product.badge}
              </div>
            )}
            <div className={styles.imgBox}>
              <Card.Img 
                className={`${styles.productImg} ${styles.default}`} 
                src={product.image} 
                alt={product.name}
              />
              <Card.Img 
                className={`${styles.productImg} ${styles.hover}`} 
                src={product.hoverImage || product.image} 
                alt={`${product.name} hover`}
              />
            </div>
            <Card.Body className="d-flex flex-column text-center">
              <Card.Title as="p" className={styles.prodTitle}>
                {product.name}
              </Card.Title>
              <p className={styles.rating}>
                {product.rating} 
                <span className={styles.count}>({product.count})</span>
              </p>
              <p className={styles.price}>
                ₹{product.price.toLocaleString()}
              </p>
              <div className={`${styles.actions} mt-auto`}>
                <button 
                  className={styles.btnCart} 
                  onClick={(e) => handleAddToCart(e, product)}
                >
                  Add to Cart
                </button>
                <button 
                  className={`${styles.btnLike} ${likedProducts.has(product.id) ? styles.liked : ''}`}
                  onClick={(e) => handleLike(e, product)}
                >
                  <i className={likedProducts.has(product.id) ? "fas fa-heart" : "far fa-heart"}></i>
                </button>
              </div>
            </Card.Body>
          </Card>
        </div>
      ))}
    </div>
  );

  return (
    <Container as="section" className={`${styles.topProductsSection} text-center my-5`}>
      <h1 className={styles.shopHeading}>TOP PRODUCTS</h1>
      
      {/* Custom Tab Navigation */}
      <div className={styles.customTabs}>
        <button 
          className={`${styles.tabButton} ${activeTab === 'rings' ? styles.active : ''}`}
          onClick={() => setActiveTab('rings')}
        >
          Rings
        </button>
        <button 
          className={`${styles.tabButton} ${activeTab === 'earrings' ? styles.active : ''}`}
          onClick={() => setActiveTab('earrings')}
        >
          Earrings
        </button>
        <button 
          className={`${styles.tabButton} ${activeTab === 'necklaces' ? styles.active : ''}`}
          onClick={() => setActiveTab('necklaces')}
        >
          Necklaces
        </button>
      </div>

      {/* Tab Content */}
      <div className={styles.tabContent}>
        {renderProductGrid(productData[activeTab])}
      </div>
    </Container>
  );
};

export default TopProducts;