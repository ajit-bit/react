import React from 'react';
import { Container, Row, Col, Button, Image } from 'react-bootstrap';
import ring1 from '../assets/images/ring1.jpg';
import watch from '../assets/images/watch.jpg';
import '../styles/PromoSection.css'; // Import the new dedicated CSS file

const PromoSection = () => {
    return (
        // The hero class handles the diagonal background stripe
        <section className="promo-section-hero">
            <Container fluid>
                <Row>
                    {/* Promo Card 1 */}
                    <Col lg={6} className="promo-card promo-card-1 p-md-5 p-4">
                        <div className="d-lg-flex align-items-center justify-content-center">
                            <Image src={ring1} alt="Wedding Ring" className="promo-image" />
                            <div className="promo-content text-lg-start text-center mt-4 mt-lg-0">
                                <p className="promo-subtitle">New Collection</p>
                                <h2 className="promo-title">Wedding Rings</h2>
                                <p className="promo-text">
                                    Celebrate your love with our exquisite collection of wedding rings.
                                </p>
                                <Button href="#" variant="outline-dark" className="discover-button">
                                    Discover more
                                </Button>
                            </div>
                        </div>
                    </Col>
                    {/* Promo Card 2 */}
                    <Col lg={6} className="promo-card promo-card-2 p-md-5 p-4">
                        <div className="d-lg-flex align-items-center justify-content-center">
                            <Image src={watch} alt="Luxury Watch" className="promo-image" />
                            <div className="promo-content text-lg-start text-center mt-4 mt-lg-0">
                                <p className="promo-subtitle">Timeless Beauty</p>
                                <h2 className="promo-title">Luxury Watches</h2>
                                <p className="promo-text">
                                    Discover the perfect accessory that defines your unique sense of luxury.
                                </p>
                                <Button href="#" variant="outline-dark" className="discover-button">
                                    Discover more
                                </Button>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default PromoSection;