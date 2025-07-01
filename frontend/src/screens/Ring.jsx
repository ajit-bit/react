import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import '../styles/Ring.css';

const Ring = () => {
  const jewelryItems = Array(9).fill({
    name: "Rose Gold Infinity Ring",
    price: "₹1,200",
    image: "https://via.placeholder.com/200",
  });

  return (
    <div className="ring-container">
      <Navbar />
      <div className="ring-content">
        {/* Hero Section */}
        <div className="hero-section">
          <h1 className="hero-title">Discover Your Edge</h1>
          <p className="hero-description">
            Handpicked silver and stainless-steel jewelry crafted for the modern man.
          </p>
          <button className="hero-button">Shop Now</button>
        </div>

        <div className="content-grid">
          {/* Filters */}
          <div className="filters">
            <h3 className="filter-title">Shop by Category</h3>
            <ul className="filter-list">
              <li><a href="#" className="filter-link">Necklace</a></li>
              <li><a href="#" className="filter-link">Rings</a></li>
              <li><a href="#" className="filter-link">Earrings</a></li>
              <li><a href="#" className="filter-link">Bracelet</a></li>
            </ul>
            <h3 className="filter-title">Price Range (₹)</h3>
            <div className="price-range">
              <input type="number" placeholder="Min: ₹100" className="price-input" />
              <input type="number" placeholder="Max: ₹10000" className="price-input" />
            </div>
            <h3 className="filter-title">Occasion</h3>
            <ul className="filter-list">
              <li><a href="#" className="filter-link">Wedding</a></li>
              <li><a href="#" className="filter-link">Casual</a></li>
              <li><a href="#" className="filter-link">Festive</a></li>
            </ul>
          </div>

          {/* Product Grid */}
          <div className="product-grid">
            <div className="products">
              {jewelryItems.map((item, index) => (
                <div key={index} className="product-card">
                  <img src={item.image} alt={item.name} className="product-image" />
                  <h4 className="product-name">{item.name}</h4>
                  <p className="product-price">{item.price}</p>
                  <button className="product-button">Add to Bag</button>
                </div>
              ))}
            </div>
            {/* Pagination */}
            <div className="pagination">
              <button className="pagination-button">1</button>
              <button className="pagination-button">2</button>
              <button className="pagination-button">3</button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Ring;