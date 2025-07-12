import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import styles from '../styles/ShopByPrice.module.css';

const ShopByPrice = () => {
  return (
    <section className={`${styles.shopByPriceSection} py-5`}>
      <Container>
        <h2 className={`${styles.sectionTitle} text-center`}>Shop by Price</h2>
        <Row className="justify-content-center g-4 mt-3">
          <Col xs={6} sm={6} md={3}>
            <Card className={`${styles.priceCard} text-center shadow-sm`}>
              <Card.Body>
                <p className={styles.priceLabel}>Under</p>
                <p className={styles.priceValue}>₹999</p>
                <button className={styles.priceBtn} aria-label="Shop under 999">
                  <i className="fas fa-chevron-right"></i>
                </button>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={6} sm={6} md={3}>
            <Card className={`${styles.priceCard} text-center shadow-sm`}>
              <Card.Body>
                <p className={styles.priceLabel}>Under</p>
                <p className={styles.priceValue}>₹2999</p>
                <button className={styles.priceBtn} aria-label="Shop under 2999">
                  <i className="fas fa-chevron-right"></i>
                </button>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={6} sm={6} md={3}>
            <Card className={`${styles.priceCard} text-center shadow-sm`}>
              <Card.Body>
                <p className={styles.priceLabel}>Under</p>
                <p className={styles.priceValue}>₹4999</p>
                <button className={styles.priceBtn} aria-label="Shop under 4999">
                  <i className="fas fa-chevron-right"></i>
                </button>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={6} sm={6} md={3}>
            <Card className={`${styles.priceCard} ${styles.premium} text-center shadow-sm`}>
              <Card.Body>
                <p className={styles.priceLabel}>Premium</p>
                <p className={styles.priceValue}>Gifts</p>
                <button className={styles.priceBtn} aria-label="Shop premium gifts">
                  <i className="fas fa-chevron-right"></i>
                </button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ShopByPrice;