import React from 'react';
import { Container, Row, Col, Form, Button, InputGroup } from 'react-bootstrap';
import styles from '../styles/Newsletter.module.css';
import immg2 from '../assets/images/immg2.png';

const Newsletter = () => {
  return (
    // 2. Apply the main scoped class to the section
    <section className={`${styles.newsletterSection} my-5`}>
      <Container fluid="lg">
        <Row className="align-items-center g-0">
          <Col md={6} className={`text-center p-5 ${styles.newsletterContent}`}>
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
                {/* 3. Apply the scoped class to the button */}
                <Button type="submit" variant="dark" className={styles.submitArrow}>→</Button>
              </InputGroup>
            </Form>
          </Col>
          <Col md={6} className={`d-none d-md-block ${styles.newsletterImageCol}`}>
             <img src={immg2} alt="Newsletter Promo" className={styles.newsletterImage} />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Newsletter;