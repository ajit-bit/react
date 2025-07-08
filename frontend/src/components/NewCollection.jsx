import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import immg1 from '../assets/images/immg1.png';
import immg2 from '../assets/images/immg2.png';
import immg3 from '../assets/images/immg3.png';
import immg4 from '../assets/images/immg4.png';
import '../styles/NewCollection.css';

const NewCollection = () => {
  return (
    <Container as="section" className="new-collection-container my-5">
      <h1 className="main-title">New Collection</h1>
      <div className="title-divider"></div>
      <Row className="g-4">
        {/* Left Column */}
        <Col lg={6}>
          <div className="image-container h-100">
            <img src={immg1} alt="Elegant Model" className="jewelry-image" />
          </div>
        </Col>
        {/* Right Column */}
        <Col lg={6}>
          <Row className="g-4">
            {/* Right Top */}
            <Col xs={12}>
              <div className="image-container">
                <img src={immg2} alt="Ring" className="jewelry-image" />
                <div className="text-overlay">
                  <div className="overlay-title">Timeless Elegance</div>
                  <div className="overlay-subtitle">New Arrivals</div>
                  <a href="#" className="discover-btn">Discover more</a>
                </div>
              </div>
            </Col>
            {/* Right Bottom */}
            <Col xs={12}>
              <Row className="g-4">
                <Col md={6}>
                  <div className="image-container">
                    <img src={immg3} alt="Heart Necklace" className="jewelry-image" />
                    <div className="text-overlay">
                      <div className="overlay-titles">Jewellery Tells</div>
                      <div className="overlay-subtitle">A Great Story</div>
                      <a href="#" className="discover-btn">Discover more</a>
                    </div>
                  </div>
                </Col>
                <Col md={6}>
                  <div className="image-container">
                    <img src={immg4} alt="Statement Necklace" className="jewelry-image" />
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default NewCollection;