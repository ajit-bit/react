import React from 'react';

import { Container, Row, Col } from 'react-bootstrap';
import Marquee from "react-fast-marquee";
import useMediaQuery from '../hooks/useMediaQuery'; 
import '../styles/Features.css';

const featuresData = [
  { icon: "fas fa-truck", title: "Free Shipping", text: "On orders over ₹1999" },
  { icon: "fas fa-undo", title: "30 Days Return", text: "Exchange product easily" },
  { icon: "fas fa-lock", title: "Secure Payment", text: "Payment Cards Accepted" },
  { icon: "fas fa-headset", title: "24/7 Support", text: "Contact us Anytime" },
];

const FeatureItem = ({ feature }) => (
  <div className="feature-item text-center">
    <div className="icon-circle mx-auto mb-3">
      <i className={feature.icon}></i>
    </div>
    <h4 className="fw-bold">{feature.title}</h4>
    <p className="text-muted">{feature.text}</p>
  </div>
);

const Features = () => {

  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <section className="feature-section py-5">
      <Container>
        {isMobile ? (
          <Marquee pauseOnHover={true} speed={50} gradient={false}>
            {featuresData.map((feature, index) => (
              <div key={index} className="feature-item-marquee">
                <FeatureItem feature={feature} />
              </div>
            ))}
          </Marquee>
        ) : (
          <Row className="g-4">
            {featuresData.map((feature, index) => (
              <Col key={index} md={6} lg={3}>
                <FeatureItem feature={feature} />
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </section>
  );
};

export default Features;