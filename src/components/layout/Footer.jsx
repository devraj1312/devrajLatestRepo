import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

import { Link } from "react-router-dom";
import "./Footer.scss";

const Footer = () => {
  return (
    <footer className="footer">

      <div className="container">

        <div className="footer-grid">

          {/* Company Info */}
          <div className="footer-column company-info">

            <div className="footer-logo">
              <img
                src="/src/assets/images/logo2.png"
                alt="Ujjain Yatra"
              />

              <div>
                <h3>Ujjain</h3>
                <span>Spiritual Journey</span>
              </div>
            </div>

            <p>
              Your trusted partner for spiritual journeys,
              pooja bookings, hotel stays and cab services
              in Ujjain.
            </p>

            <div className="social-icons">
              <a href="#"><FaFacebookF /></a>
              <a href="#"><FaInstagram /></a>
              <a href="#"><FaTwitter /></a>
              <a href="#"><FaYoutube /></a>
            </div>

          </div>

          {/* Quick Links */}

          <div className="footer-column quick-links-column">

            <h4>Quick Links</h4>

            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/hotels">Hotels</Link></li>
              <li><Link to="/cabs">Cabs</Link></li>
              <li><Link to="/pooja">Pooja</Link></li>
              <li><Link to="/darshan">Darshan Packages</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
            </ul>

          </div>

          {/* Services */}

          <div className="footer-column services-column">

            <h4>Our Services</h4>

            <ul>
              <li><Link to="/hotels">Hotel Bookings</Link></li>
              <li><Link to="/cabs">Cab Services</Link></li>
              <li><Link to="/pooja">Pooja Bookings</Link></li>
              <li><Link to="/darshan">Darshan Packages</Link></li>
              <li><Link to="/custom-pooja">Custom Pooja</Link></li>
              <li><Link to="/group-booking">Group Bookings</Link></li>
            </ul>

          </div>

          {/* Support */}

          <div className="footer-column">

            <h4>Support</h4>

            <ul>
              <li><Link to="/help">Help Center</Link></li>
              <li><Link to="/faq">FAQs</Link></li>
              <li><Link to="/cancellation">Cancellation Policy</Link></li>
              <li><Link to="/terms">Terms & Conditions</Link></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
            </ul>

          </div>

          {/* Contact */}

          <div className="footer-column">

            <h4>Contact Us</h4>

            <ul className="contact-info">

              <li>
                <FaPhoneAlt />
                +91 123 456 7890
              </li>

              <li>
                <FaEnvelope />
                info@ujjainyatra.com
              </li>

              <li>
                <FaMapMarkerAlt />
                123, Mahakal Marg,
                Ujjain, Madhya Pradesh
              </li>

            </ul>

          </div>

        </div>

        <div className="footer-bottom">

          <span>
            © 2026 UjjainYatra. All Rights Reserved.
          </span>

          <span>
            Made with ❤️ for Devotees
          </span>

        </div>

      </div>

    </footer>
  );
};

export default Footer;