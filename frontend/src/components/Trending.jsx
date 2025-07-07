// src/components/Trending.jsx

import goldring from '../assets/images/goldring.jpg';
import silvernecklace from '../assets/images/silvernecklace.jpg';
import chain1 from '../assets/images/chain.png';
import bracelet1 from '../assets/images/bracelet1.jpg';
import ring1 from '../assets/images/ring1.jpg';

const Trending = () => {
  return (
    <section className="trending-section">
      <h2 className="section-title"> Trending Jewelry </h2>
      <div className="jewelry-container">
        <div className="jewelry-card">
          <img src={goldring} alt="Gold Ring" />
          <h3>Elegant Gold Ring</h3>
        </div>
        <div className="jewelry-card">
          <img src={silvernecklace} alt="Silver Necklace" />
          <h3>Silver Necklace</h3>
        </div>
        <div className="jewelry-card">
          <img src={chain1} alt="Diamond Earrings" />
          <h3>Diamond Earrings</h3>
        </div>
        <div className="jewelry-card">
          <img src={bracelet1} alt="Gold Bracelet" />
          <h3>Gold Bracelet</h3>
        </div>
        <div className="jewelry-card">
          <img src={ring1} alt="Silver Bracelet" />
          <h3>Silver Bracelet</h3>
        </div>
      </div>
    </section>
  );
};

export default Trending;