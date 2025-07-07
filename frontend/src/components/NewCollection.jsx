import immg1 from '../assets/images/immg1.png';
import immg2 from '../assets/images/immg2.png';
import immg3 from '../assets/images/immg3.png';
import immg4 from '../assets/images/immg4.png';

const NewCollection = () => {
  return (
    <div className="container">
      <h1 className="main-title">New Collection</h1>
      <div className="title-divider"></div>
      <div className="layout-wrapper">
        <div className="left-section">
          <div className="image-container main-model">
            <img src={immg1} alt="Elegant Model" className="jewelry-image" />
          </div>
        </div>
        <div className="right-section">
          <div className="right-top">
            <div className="image-container ring-model">
              <img src={immg2} alt="Ring" className="jewelry-image" />
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
                <img src={immg3} alt="Heart Necklace" className="jewelry-image" />
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
  );
};

export default NewCollection;