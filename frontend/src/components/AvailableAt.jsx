import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import myntra from '../assets/images/myntra.png';
import styles from '../styles/AvailableAt.module.css';

const marketplaces = [
  { name: 'Amazon', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2560px-Amazon_logo.svg.png', style: {} },
  { name: 'Flipkart', logo: 'https://logos-world.net/wp-content/uploads/2020/11/Flipkart-Logo.png', style: {} },
  { name: 'Myntra', logo: myntra, style: { height: '50px' } },
];

const AvailableAt = () => {
  return (
    <Container as="section" className={`${styles.availableAtSection} text-center py-5`}>
      <h1 className={styles.sectionTitle}>AVAILABLE AT</h1>
      <div className={styles.titleDivider}></div>
      <Row className="justify-content-center align-items-center g-4 mt-4 flex-nowrap">
        {marketplaces.map((place, index) => (
          <Col key={index} xs="auto" className="d-flex flex-column align-items-center">
            <a href="#" className={styles.marketplaceLogo}>
              <div className={`${styles.logoCircle} shadow-sm`}>
                <img src={place.logo} alt={place.name} style={place.style} />
              </div>
              <p className={`${styles.marketplaceName} mt-2`}>{place.name}</p>
            </a>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default AvailableAt;