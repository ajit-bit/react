import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import earing1 from '../assets/images/earing1.jpg';
import neck from '../assets/images/neck.jpg';
import ring1 from '../assets/images/ring1.jpg';
import bracelet1 from '../assets/images/bracelet1.jpg';
import chain1 from '../assets/images/chain.png';
import '../styles/MustHaves.css';

const mustHavesItems = [
    { img: earing1, title: 'Elegant Earrings' },
    { img: neck, title: 'Classic Necklace' },
    { img: ring1, title: 'Stylish Ring' },
    { img: bracelet1, title: 'Trendy Bracelet' },
    { img: chain1, title: 'Delicate Pendant' },
    { img: neck, title: 'Jewlery Set' },
];

const MustHaves = () => {
  return (
    <Container as="section" className="must-haves-section text-center my-5">
      <h3 className="section-title">Must Haves</h3>
      <Row className="justify-content-center g-4 mt-4">
        {mustHavesItems.map((item, index) => (
            <Col key={index} xs={6} md={4} lg={2}>
                 <Card className="item-card border-0">
                    <Card.Img variant="top" src={item.img} />
                    <Card.Body>
                        <Card.Text as="p">{item.title}</Card.Text>
                    </Card.Body>
                </Card>
            </Col>
        ))}
      </Row>
    </Container>
  );
};

export default MustHaves;