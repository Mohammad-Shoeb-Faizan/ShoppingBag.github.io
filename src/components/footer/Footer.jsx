import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 col-md-6 col-sm-12">
            <h5>About Us</h5>
            <p style={{fontSize:"16px"}}>
            Shopping Bag is your ultimate online shopping destination. We strive to provide a seamless and enjoyable shopping experience for our customers. With a wide range of high-quality products, from fashion and accessories to electronics and home essentials, we have something for everyone.
            </p>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12">
            <h5>Contact</h5>
            <p style={{fontSize:"16px"}}>Email: info@shoppingbag.com</p>
            <p style={{fontSize:"16px"}}>Phone: +1 123 456 7890</p>
          </div>
          <div className="col-lg-4 col-md-12 col-sm-12">
            <h5>Follow Us</h5>
            <div className="social-icons">
              <a href="https://www.facebook.com/shoebfaizan00/"  target='_blank' className="icon">
                <FontAwesomeIcon icon={faFacebook} />
              </a>
              <a href="https://twitter.com/ShoebFaizan71" target='_blank' className="icon">
                <FontAwesomeIcon icon={faTwitter} />
              </a>
              <a href="https://www.instagram.com/mohammad_shoeb_faizan/" target='_blank' className="icon">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
