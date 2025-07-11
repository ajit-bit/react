import React from 'react';
import { useLocation } from 'react-router-dom';
import styles from '../styles/Footer.module.css';
import paytm from '../assets/images/paytm.svg';
import googlepay from '../assets/images/googlepay.svg';
import visa from '../assets/images/visa.svg';
import mastercard from '../assets/images/mastercard.svg';
import americanexpress from '../assets/images/americanexpress.svg';

const Footer = () => {
  const location = useLocation();
  const isMenSection = location.pathname === '/men';

  return (
    <footer className={`${styles.footer} ${isMenSection ? styles.darkTheme : ''}`}>
      <div className={styles.container}>
        <div className={styles.footerContent}>
          {/* Brand */}
          <div className={styles.footerBrand}>
            <div className={styles.logos}>
              <div className={styles.logosIcon}></div>
              <div>
                <div className={styles.logosText}>AAISHA</div>
                <div className={styles.logosSubtext}>HOUSE OF SILVER</div>
              </div>
            </div>
            <p className={styles.brandDescription}>
              Unleash the radiance of your inner beauty with our premium silver jewelry brand - a perfect blend of sophistication and style.
            </p>

            <div className={styles.customSocialIcons}>
              <a href="#" className={styles.socialLink}>
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className={styles.socialLink}>
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className={styles.socialLink}>
                <i className="fab fa-pinterest-p"></i>
              </a>
            </div>

            {/* Bottom Footer */}
            <div className={styles.footerBottom}>
              <div className={styles.paymentMethods}>
                <img src={paytm} alt="Paytm" className={styles.paymentIcon} />
                <img src={googlepay} alt="Google Pay" className={styles.paymentIcon} />
                <img src={visa} alt="Visa" className={styles.paymentIcon} />
                <img src={mastercard} alt="Mastercard" className={styles.paymentIcon} />
                <img src={americanexpress} alt="American Express" className={styles.paymentIcon} />
              </div>
            </div>
          </div>

          {/* Policy */}
          <div className={styles.footerSection}>
            <h3>Policy</h3>
            <ul>
              <li><a href="#">Shipping & Delivery Policy</a></li>
              <li><a href="#">Return & Exchange Policy</a></li>
              <li><a href="#">Payment Policy</a></li>
              <li><a href="#">Grievance Redressal Policy</a></li>
            </ul>
          </div>

          {/* Help */}
          <div className={styles.footerSection}>
            <h3>Help</h3>
            <ul>
              <li><a href="#">FAQ's</a></li>
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">Terms of Service</a></li>
              <li><a href="#">Privacy Policy</a></li>
            </ul>
          </div>

          {/* About Us */}
          <div className={styles.footerSection}>
            <h3>About Us</h3>
            <ul>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Blogs</a></li>
              <li><a href="#">Contact Us</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;