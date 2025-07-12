import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import styles from '../styles/Essentials.module.css';
import essentialsVacation from '../assets/images/essentials-vacation.jpg';
import essentialsWork from '../assets/images/essentials-work.jpg';
import essentialsCasual from '../assets/images/essentials-casual.jpg';
import essentialsWedding from '../assets/images/essentials-wedding.jpg';

const essentialsData = [
  { img: essentialsVacation, title: "VACAY" },
  { img: essentialsWork, title: "WORK" },
  { img: essentialsCasual, title: "CASUAL" },
  { img: essentialsWedding, title: "WEDDING" },
];

const Essentials = () => {
  return (
    <Container as="section" className={`${styles.essentialsSection} my-5 text-center`}>
      <h1 className={styles.headingEssentials}>Essentials For You</h1>
      <Row xs={2} sm={2} md={4} lg={4} className="g-3 g-md-4">
        {essentialsData.map((item, index) => (
          <Col key={index}>
            <Card className={`${styles.cardEssentials} border-0 shadow h-100`}>
              <div className={styles.imageWrapper}>
                <Card.Img variant="top" src={item.img} alt={item.title} />
              </div>
              <Card.Body className="d-flex flex-column align-items-center">
                <Card.Title as="h2" className="mt-3">{item.title}</Card.Title>
                <Button 
                  variant="warning" 
                  className={`mt-auto ${styles.discoverBtn}`}
                >
                  Discover
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Essentials;