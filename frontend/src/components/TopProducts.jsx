import { useState } from 'react';
import chain1 from '../assets/images/chain.png';
import goldring from '../assets/images/goldring.jpg';

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

const TopProducts = () => {
  const [activeTab, setActiveTab] = useState('rings');

  const handleAddToCart = async (e, card) => {
    e.stopPropagation();
    const { name, price, image } = card;

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
    const { name, price, image } = card;

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

  return (
    <>
      <h1 className="shop-heading">TOP PRODUCTS</h1>
      <ul className="shop-tabs">
        <li className={`shop-tab ${activeTab === 'rings' ? 'active' : ''}`} onClick={() => setActiveTab('rings')}>Rings</li>
        <li className={`shop-tab ${activeTab === 'earrings' ? 'active' : ''}`} onClick={() => setActiveTab('earrings')}>Earrings</li>
        <li className={`shop-tab ${activeTab === 'necklaces' ? 'active' : ''}`} onClick={() => setActiveTab('necklaces')}>Necklaces</li>
      </ul>

      <section className={`shop-section active`} id={activeTab}>
        <div className="shop-grid">
          {productData[activeTab].map((product, index) => (
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
    </>
  );
};

export default TopProducts;