import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import styles from '../styles/Trending.module.css'; 
import goldring from '../assets/images/goldring.jpg';
import silvernecklace from '../assets/images/silvernecklace.jpg';
import chain1 from '../assets/images/chain.png';
import bracelet1 from '../assets/images/bracelet1.jpg';
import ring1 from '../assets/images/ring1.jpg';

const trendingItems = [
    { img: goldring, title: "Elegant Gold Ring" },
    { img: silvernecklace, title: "Silver Necklace" },
    { img: chain1, title: "Diamond Earrings" },
    { img: bracelet1, title: "Gold Bracelet" },
    { img: ring1, title: "Silver Bracelet" },
    { img: goldring, title: "Silver Ring" },
];

const Trending = () => {
  return (
    <Container as="section" className={`${styles.trendingSection} text-center my-5`}>
      <h2 className={styles.sectionTitle}>Trending Jewelry</h2>
      <Row className="justify-content-center g-4 mt-3">
        {trendingItems.map((item, index) => (
          <Col key={index} xs={6} sm={6} md={4} lg={2}>
            <Card className={`${styles.jewelryCard} border-0 shadow-sm h-100`}>
              <Card.Img variant="top" src={item.img} />
              <Card.Body>
                <Card.Title as="h3">{item.title}</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Trending;