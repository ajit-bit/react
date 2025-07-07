// src/components/MustHaves.jsx

import React from 'react';
import earing1 from '../assets/images/earing1.jpg';
import neck from '../assets/images/neck.jpg';
import ring1 from '../assets/images/ring1.jpg';
import bracelet1 from '../assets/images/bracelet1.jpg';
import chain1 from '../assets/images/chain.png';

const MustHaves = () => {
  return (
    <div className="must-haves">
      <h3>Must Haves</h3>
      <div className="items-grid">
        <div className="item-card">
          <img src={earing1} alt="Earrings" />
          <p>Elegant Earrings</p>
        </div>
        <div className="item-card">
          <img src={neck} alt="Necklace" />
          <p>Classic Necklace</p>
        </div>
        <div className="item-card">
          <img src={ring1} alt="Ring" />
          <p>Stylish Ring</p>
        </div>
        <div className="item-card">
          <img src={bracelet1} alt="Bracelet" />
          <p>Trendy Bracelet</p>
        </div>
        <div className="item-card">
          <img src={chain1} alt="Pendant" />
          <p>Delicate Pendant</p>
        </div>
      </div>
    </div>
  );
};

export default MustHaves;