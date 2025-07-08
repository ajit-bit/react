import React from 'react';
import { Container, Tabs, Tab, Card, Button } from 'react-bootstrap';
import chain1 from '../assets/images/chain.png';
import goldring from '../assets/images/goldring.jpg';
import '../styles/TopProducts.css';

const productData = {
  rings: [
    { name: "9CT WHITE GOLD 0.33CT DIAMOND ETERNITY", price: 2799, image: chain1, badge: "Sale", rating: "★★★★★", count: 1 },
    { name: "9CT WHITE GOLD 0.25CT DIAMOND SOLITAIRE", price: 3799, image: chain1, rating: "★★★★★", count: 2 },
    { name: "9CT WHITE GOLD DIAMOND TWISTED ETERNITY", price: 5699, image: chain1, rating: "★★★★☆", count: 5 },
    { name: "9CT WHITE GOLD CUBIC ZIRCONIA SOLITAIRE", price: 4399, image: chain1, badge: "Popular", rating: "★★★★★", count: 8 },
    { name: "9CT WHITE GOLD I LOVE YOU RING", price: 3699, image: chain1, rating: "★★★★★", count: 3 }
  ],
  earrings: [
    { name: "9CT YELLOW GOLD DIAMOND DROP EARRINGS", price: 1999, image: goldring, badge: "Sale", rating: "★★★★★", count: 4 },
    { name: "9CT WHITE GOLD PEARL STUD EARRINGS", price: 2499, image: goldring, rating: "★★★★★", count: 6 },
    { name: "9CT ROSE GOLD HOOP EARRINGS", price: 3299, image: goldring, badge: "Popular", rating: "★★★★☆", count: 3 },
  ],
  necklaces: [
    { name: "9CT WHITE GOLD DIAMOND PENDANT NECKLACE", price: 3999, image: goldring, badge: "Sale", rating: "★★★★★", count: 5 },
    { name: "9CT YELLOW GOLD HEART LOCKET NECKLACE", price: 4599, image: goldring, rating: "★★★★★", count: 3 },
  ]
};

const TopProducts = () => {
  const handleAddToCart = (e, card) => {
    e.stopPropagation();
    // Your existing logic
    alert(`${card.name} added to cart!`);
  };

  const handleLike = (e, card) => {
    e.stopPropagation();
    // Your existing logic
    alert(`${card.name} added to wishlist!`);
  };

  const renderProductGrid = (products) => (
    <div className="d-flex flex-row flex-nowrap overflow-auto py-3 shop-grid">
      {products.map((product, index) => (
        <div key={index} className="shop-card-wrapper">
            <Card className="shop-card h-100">
            {product.badge && <div className={`badge ${product.badge.toLowerCase()}`}>{product.badge}</div>}
            <div className="img-box">
                <Card.Img className="product-img default" src={product.image} alt={product.name} />
                <Card.Img className="product-img hover" src={product.image} alt={`${product.name} alt`} />
            </div>
            <Card.Body className="d-flex flex-column text-center">
                <Card.Title as="p" className="prod-title">{product.name}</Card.Title>
                <p className="rating">{product.rating} <span className="count">({product.count})</span></p>
                <p className="price">₹{product.price.toLocaleString()}</p>
                <div className="actions mt-auto">
                <Button className="btn-cart" onClick={(e) => handleAddToCart(e, product)}>Add to Cart</Button>
                <Button className="btn-like" onClick={(e) => handleLike(e, product)}><i className="far fa-heart"></i></Button>
                </div>
            </Card.Body>
            </Card>
        </div>
      ))}
    </div>
  );

  return (
    <Container as="section" className="text-center my-5 top-products-section">
      <h1 className="shop-heading">TOP PRODUCTS</h1>
      <Tabs defaultActiveKey="rings" id="top-products-tabs" className="justify-content-center" unmountOnExit>
        <Tab eventKey="rings" title="Rings">
          {renderProductGrid(productData.rings)}
        </Tab>
        <Tab eventKey="earrings" title="Earrings">
          {renderProductGrid(productData.earrings)}
        </Tab>
        <Tab eventKey="necklaces" title="Necklaces">
          {renderProductGrid(productData.necklaces)}
        </Tab>
      </Tabs>
    </Container>
  );
};

export default TopProducts;