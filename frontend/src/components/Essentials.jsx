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
      <Row className="g-4 mt-3">
        {essentialsData.map((item, index) => (
          <Col key={index} xs={6} md={6} lg={3}>
            <Card className={`${styles.cardEssentials} border-0 shadow-lg h-100`}>
              <Card.Img variant="top" src={item.img} />
              <Card.Body className="d-flex flex-column">
                <Card.Title as="h2">{item.title}</Card.Title>
                <Button variant="dark" className={`mt-auto ${styles.discoverBtn}`}>Discover</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Essentials;