import React from 'react';
import styles from './footer.module.css';
import paytm from '../../images/paytm.svg';
import googlepay from '../../images/googlepay.svg';
import visa from '../../images/visa.svg';
import mastercard from '../../images/mastercard.svg';
import americanexpress from '../../images/americanexpress.svg';

const Footer = () => {
  return (
    <footer className={styles.footer}>
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

          {/* Account */}
          <div className={styles.footerSection}>
            <h3>Account</h3>
            <ul>
              <li><a href="#">Dashboard</a></li>
              <li><a href="#">Orders</a></li>
              <li><a href="#">Wishlist</a></li>
              <li><a href="#">Addresses</a></li>
            </ul>
          </div>

          {/* Help */}
          <div className={styles.footerSection}>
            <h3>Help</h3>
            <ul>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Contact Support</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;