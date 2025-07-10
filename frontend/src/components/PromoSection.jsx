import React from 'react';
import { Container, Row, Col, Button, Image } from 'react-bootstrap';
import styles from '../styles/PromoSection.module.css';
import ring1 from '../assets/images/ring1.jpg';
import watch from '../assets/images/watch.jpg';

const PromoSection = () => {
    return (
        <section className={styles.promoSectionHero}>
            <Container fluid>
                <Row>
                    {/* Promo Card 1 */}
                    <Col lg={6} className={`${styles.promoCard} ${styles.promoCard1} p-md-5 p-4`}>
                        <div className="d-lg-flex align-items-center justify-content-center">
                            <Image src={ring1} alt="Wedding Ring" className={styles.promoImage} />
                            <div className={`${styles.promoContent} text-lg-start text-center mt-4 mt-lg-0`}>
                                <p className={styles.promoSubtitle}>New Collection</p>
                                <h2 className={styles.promoTitle}>Wedding Rings</h2>
                                <p className={styles.promoText}>
                                    Celebrate your love with our exquisite collection of wedding rings.
                                </p>
                                <Button href="#" variant="outline-dark" className={styles.discoverButton}>
                                    Discover more
                                </Button>
                            </div>
                        </div>
                    </Col>
                    {/* Promo Card 2 */}
                    <Col lg={6} className={`${styles.promoCard} ${styles.promoCard2} p-md-5 p-4`}>
                        <div className="d-lg-flex align-items-center justify-content-center">
                            <Image src={watch} alt="Luxury Watch" className={styles.promoImage} />
                            <div className={`${styles.promoContent} text-lg-start text-center mt-4 mt-lg-0`}>
                                <p className={styles.promoSubtitle}>Timeless Beauty</p>
                                <h2 className={styles.promoTitle}>Luxury Watches</h2>
                                <p className={styles.promoText}>
                                    Discover the perfect accessory that defines your unique sense of luxury.
                                </p>
                                <Button href="#" variant="outline-dark" className={styles.discoverButton}>
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