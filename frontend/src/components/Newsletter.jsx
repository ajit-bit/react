import React from 'react';
import { Container, Row, Col, Form, Button, InputGroup } from 'react-bootstrap';
import immg2 from '../assets/images/immg2.png';
import '../styles/Newsletter.css';

const Newsletter = () => {
  return (
    <section className="newsletter-section my-5">
      <Container fluid="lg">
        <Row className="align-items-center g-0">
          <Col md={6} className="text-center p-5 newsletter-content">
            <h2 className="fw-bold">15% DISCOUNT</h2>
            <p>
              Subscribe to our newsletter to get a 15% discount on your first purchase.
            </p>
            <Form>
              <InputGroup className="mt-4 mx-auto" style={{ maxWidth: '400px' }}>
                <Form.Control
                  type="email"
                  placeholder="Email address"
                  aria-label="Email address"
                  required
                />
                <Button type="submit" variant="dark" className="submit-arrow">→</Button>
              </InputGroup>
            </Form>
          </Col>
          <Col md={6} className="d-none d-md-block newsletter-image-col">
             <img src={immg2} alt="Newsletter Promo" className="newsletter-image" />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Newsletter;