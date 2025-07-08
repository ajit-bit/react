import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../styles/Features.css';

const featuresData = [
  { icon: "fas fa-truck", title: "Free Shipping", text: "On orders over ₹1999" },
  { icon: "fas fa-undo", title: "30 Days Return", text: "Exchange product easily" },
  { icon: "fas fa-lock", title: "Secure Payment", text: "Payment Cards Accepted" },
  { icon: "fas fa-headset", title: "24/7 Support", text: "Contact us Anytime" },
];

const Features = () => {
  return (
    <section className="feature-section py-5">
      <Container>
        <Row className="g-4">
          {featuresData.map((feature, index) => (
            <Col key={index} sm={6} lg={3} className="text-center feature-item">
              <div className="icon-circle mx-auto mb-3">
                <i className={feature.icon}></i>
              </div>
              <h4 className="fw-bold">{feature.title}</h4>
              <p className="text-muted">{feature.text}</p>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default Features;