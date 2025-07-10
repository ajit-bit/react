import React from 'react';
import { Container, Card, Image, Carousel, Row, Col } from 'react-bootstrap';
import styles from '../styles/Testimonials.module.css';
import testimonial1 from '../assets/images/testimonial-1.jpg';
import testimonial2 from '../assets/images/testimonial-2.jpg';
import testimonial3 from '../assets/images/testimonial-3.jpg';

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
  },
];


const chunkArray = (array, size) => {
  const chunkedArr = [];
  for (let i = 0; i < array.length; i += size) {
    chunkedArr.push(array.slice(i, i + size));
  }
  return chunkedArr;
};

const Testimonials = () => {
  const testimonialChunks = chunkArray(testimonialsData, 3);

  const renderTestimonialCard = (item) => (
    <Card className={`${styles.testimonialCard} border-0 shadow-sm h-100`}>
      <Card.Body>
        <div className={styles.testimonialRating}>★★★★★</div>
        <Card.Text className={styles.testimonialText}>{item.text}</Card.Text>
        <div className="d-flex align-items-center mt-4">
          <Image src={item.img} roundedCircle className={styles.authorImage} />
          <div className="ms-3 text-start">
            <p className={`${styles.authorName} mb-0`}>{item.name}</p>
            <p className={`${styles.authorTitle} mb-0`}>{item.title}</p>
          </div>
        </div>
      </Card.Body>
    </Card>
  );

  return (
    <Container as="section" className={`${styles.testimonialsSection} text-center my-5`}>
      <h1 className="fw-light">WHAT OUR CLIENTS SAY</h1>
      <div className={`${styles.titleDivider} mx-auto`}></div>

      {/* Desktop Carousel */}
      <div className="d-none d-md-block">
        <Carousel variant="dark" indicators={false} interval={null} className="mt-4">
          {testimonialChunks.map((chunk, index) => (
            <Carousel.Item key={index}>
              <Row className="g-4 justify-content-center">
                {chunk.map((item, itemIndex) => (
                  <Col key={itemIndex} md={4}>
                    {renderTestimonialCard(item)}
                  </Col>
                ))}
              </Row>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>

      {/* Mobile Carousel */}
      <div className="d-block d-md-none">
        <Carousel variant="dark" indicators={false} interval={null} className="mt-4">
          {testimonialsData.map((item, index) => (
            <Carousel.Item key={index}>
              <div className="d-flex justify-content-center py-4">
                <div className={styles.testimonialContainer}>
                  {renderTestimonialCard(item)}
                </div>
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    </Container>
  );
};

export default Testimonials;