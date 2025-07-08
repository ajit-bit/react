import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import '../styles/ShopByPrice.css';

const ShopByPrice = () => {
  return (
    <section className="shop-by-price-section py-5">
      <Container>
        <h2 className="section-title text-center">Shop by Price</h2>
        <Row className="justify-content-center g-4 mt-3">
          <Col xs={12} sm={6} md={3}>
            <Card className="price-card text-center shadow-sm">
              <Card.Body>
                <p className="price-label">Under</p>
                <p className="price-value">₹999</p>
                <Button className="price-btn"><i className="fas fa-chevron-right"></i></Button>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} sm={6} md={3}>
            <Card className="price-card text-center shadow-sm">
              <Card.Body>
                <p className="price-label">Under</p>
                <p className="price-value">₹2999</p>
                <Button className="price-btn"><i className="fas fa-chevron-right"></i></Button>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} sm={6} md={3}>
            <Card className="price-card text-center shadow-sm">
              <Card.Body>
                <p className="price-label">Under</p>
                <p className="price-value">₹4999</p>
                <Button className="price-btn"><i className="fas fa-chevron-right"></i></Button>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} sm={6} md={3}>
            <Card className="price-card premium text-center shadow-sm">
              <Card.Body>
                <p className="price-label">Premium</p>
                <p className="price-value">Gifts</p>
                <Button className="price-btn"><i className="fas fa-chevron-right"></i></Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ShopByPrice;