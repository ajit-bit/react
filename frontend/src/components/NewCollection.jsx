import React, { useEffect, useRef } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import styles from '../styles/NewCollection.module.css';
import immg1 from '../assets/images/immg1.png';
import immg2 from '../assets/images/immg2.png';
import immg3 from '../assets/images/immg3.png';
import immg4 from '../assets/images/immg4.png';

const NewCollection = () => {
  const imageRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.slideIn);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    imageRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      imageRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  return (
    <Container as="section" className={`${styles.newCollectionContainer} my-4 my-md-5`}>
      <h1 className={styles.mainTitle}>New Collection</h1>
      <div className={styles.titleDivider}></div>
      <Row className="g-3 g-md-4">
        {/* Left Column */}
        <Col xs={12} lg={6}>
          <div
            className={`${styles.imageContainer} h-100`}
            ref={(el) => (imageRefs.current[0] = el)}
          >
            <img src={immg1} alt="Elegant Model" className={`${styles.jewelryImage} img-fluid`} />
          </div>
        </Col>
        {/* Right Column */}
        <Col xs={12} lg={6}>
          <Row className="g-3 g-md-4">
            {/* Right Top */}
            <Col xs={12}>
              <div
                className={styles.imageContainer}
                ref={(el) => (imageRefs.current[1] = el)}
              >
                <img src={immg2} alt="Ring" className={`${styles.jewelryImage} img-fluid`} />
                <div className={styles.textOverlay}>
                  <div className={styles.overlayTitle}>Timeless Elegance</div>
                  <div className={styles.overlaySubtitle}>New Arrivals</div>
                  <a href="#" className={styles.discoverBtn}>Discover more</a>
                </div>
              </div>
            </Col>
            {/* Right Bottom */}
            <Col xs={12}>
              <Row className="g-3 g-md-4">
                <Col xs={12} md={6}>
                  <div
                    className={styles.imageContainer}
                    ref={(el) => (imageRefs.current[2] = el)}
                  >
                    <img src={immg3} alt="Heart Necklace" className={`${styles.jewelryImage} img-fluid`} />
                    <div className={styles.textOverlay}>
                      <div className={styles.overlayTitles}>Jewellery Tells</div>
                      <div className={styles.overlaySubtitle}>A Great Story</div>
                      <a href="#" className={styles.discoverBtn}>Discover more</a>
                    </div>
                  </div>
                </Col>
                <Col xs={12} md={6}>
                  <div
                    className={styles.imageContainer}
                    ref={(el) => (imageRefs.current[3] = el)}
                  >
                    <img src={immg4} alt="Statement Necklace" className={`${styles.jewelryImage} img-fluid`} />
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