import React from 'react';
import { Container, Row, Col, Card, Image } from 'react-bootstrap';
import testimonial1 from '../assets/images/testimonial-1.jpg';
import testimonial2 from '../assets/images/testimonial-2.jpg';
import testimonial3 from '../assets/images/testimonial-3.jpg';
import '../styles/Testimonials.css';

const testimonialsData = [
  {
    text: `"The quality of the silver jewelry... was exceptional. The craftsmanship and attention to detail truly stands out."`,
    img: testimonial1,
    name: "Sarah J.",
    title: "Loyal Customer"
  },
  {
    text: `"I purchased a gift for my wife's anniversary... and she absolutely loved it! The packaging was elegant and the ring was even more beautiful."`,
    img: testimonial2,
    name: "Robert K.",
    title: "Happy Customer"
  },
  {
    text: `"The customer service... is impeccable. They helped me find the perfect bracelet for my style and budget. Highly recommend!"`,
    img: testimonial3,
    name: "Mia L.",
    title: "Repeat Customer"
  }
];

const Testimonials = () => {
  return (
    <Container as="section" className="testimonials-section text-center my-5">
      <h1 className="fw-light">WHAT OUR CLIENTS SAY</h1>
      <div className="title-divider mx-auto"></div>
      <Row className="g-4 mt-4">
        {testimonialsData.map((item, index) => (
          <Col key={index} lg={4}>
            <Card className="testimonial-card border-0 shadow-sm h-100">
              <Card.Body>
                <div className="testimonial-rating">★★★★★</div>
                <Card.Text className="testimonial-text">
                  {item.text}
                </Card.Text>
                <div className="d-flex align-items-center mt-4">
                  <Image src={item.img} roundedCircle className="author-image" />
                  <div className="ms-3 text-start">
                    <p className="author-name mb-0">{item.name}</p>
                    <p className="author-title mb-0">{item.title}</p>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Testimonials;