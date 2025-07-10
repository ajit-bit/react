import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import styles from '../styles/NewCollection.module.css';
import immg1 from '../assets/images/immg1.png';
import immg2 from '../assets/images/immg2.png';
import immg3 from '../assets/images/immg3.png';
import immg4 from '../assets/images/immg4.png'; 

const NewCollection = () => {
  return (
    <Container as="section" className={`${styles.newCollectionContainer} my-5`}>
      <h1 className={styles.mainTitle}>New Collection</h1>
      <div className={styles.titleDivider}></div>
      <Row className="g-4">
        {/* Left Column */}
        <Col lg={6}>
          <div className={`${styles.imageContainer} h-100`}>
            <img src={immg1} alt="Elegant Model" className={styles.jewelryImage} />
          </div>
        </Col>
        {/* Right Column */}
        <Col lg={6}>
          <Row className="g-4">
            {/* Right Top */}
            <Col xs={12}>
              <div className={styles.imageContainer}>
                <img src={immg2} alt="Ring" className={styles.jewelryImage} />
                <div className={styles.textOverlay}>
                  <div className={styles.overlayTitle}>Timeless Elegance</div>
                  <div className={styles.overlaySubtitle}>New Arrivals</div>
                  <a href="#" className={styles.discoverBtn}>Discover more</a>
                </div>
              </div>
            </Col>
            {/* Right Bottom */}
            <Col xs={12}>
              <Row className="g-4">
                <Col md={6}>
                  <div className={styles.imageContainer}>
                    <img src={immg3} alt="Heart Necklace" className={styles.jewelryImage} />
                    <div className={styles.textOverlay}>
                      <div className={styles.overlayTitles}>Jewellery Tells</div>
                      <div className={styles.overlaySubtitle}>A Great Story</div>
                      <a href="#" className={styles.discoverBtn}>Discover more</a>
                    </div>
                  </div>
                </Col>
                <Col md={6}>
                  <div className={styles.imageContainer}>
                    <img src={immg4} alt="Statement Necklace" className={styles.jewelryImage} />
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