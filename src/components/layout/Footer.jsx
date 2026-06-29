import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { HiOutlineChevronRight } from "react-icons/hi2"; 
import footerlogo from "../../assets/images/logo4.png";

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
                src={footerlogo}
                alt="footer logo"
              />
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

          {/* Services */}

          <div className="footer-column services-column">

            <h4>Our Services</h4>

            <ul>
              <li><Link to="/cabs">Cab Services</Link></li>
              <li><Link to="/pooja">Pooja Bookings</Link></li>
              <li><Link to="/darshan">Darshan Packages</Link></li>
              <li><Link to="/custom-pooja">Custom Pooja</Link></li>
            </ul>

          </div>

          {/* Support */}

          <div className="footer-column">

            <h4>Support</h4>

            <ul>
              <li>
                <HiOutlineChevronRight className="footer-icon" />
                <Link to="/help">Help Center</Link>
              </li>
              <li>
                <HiOutlineChevronRight className="footer-icon" />
                <Link to="/help">FAQs</Link>
              </li>
              <li>
                <HiOutlineChevronRight className="footer-icon" />
                <Link to="/about">About US</Link>
              </li>
              <li>
                <HiOutlineChevronRight className="footer-icon" />
                <Link to="/help">Terms & Conditions</Link>
              </li>
              <li>
                <HiOutlineChevronRight className="footer-icon" />
                <Link to="/help">Reviews</Link>
              </li>
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
            © 2026 UjjainTirthYatra. All Rights Reserved.
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