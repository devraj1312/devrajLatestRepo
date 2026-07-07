import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.scss";
import {
  FaHome,
  FaTaxi,
  FaPrayingHands,
  FaPlaceOfWorship,
} from "react-icons/fa";
import logo2 from "../../assets/images/logo2.png";
import { FaWhatsapp } from "react-icons/fa";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <>
      <nav className="navbar">
        <div className="navbar-content">

          <div
            className="nav-logo"
            onClick={() => navigate("/")}
          >
            <img src={logo2} alt="Logo 2" />
          </div>

          <div className= "nav-menu">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/cabs">Cabs</NavLink>
            <NavLink to="/pooja">Pooja</NavLink>
            <NavLink to="/darshan">Darshan</NavLink>
            <NavLink to="/about">About Us</NavLink>
            <NavLink to="/help">Help Us</NavLink>
          </div>

          <a
            href="https://wa.me/917470922939"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-whatsapp"
            aria-label="Chat on WhatsApp"
          >
            <FaWhatsapp />
          </a>
          
        </div>
      </nav>

      <div className="mobile-bottom-nav">
        <NavLink to="/">
          <FaHome />
          <span>Home</span>
        </NavLink>

        <NavLink to="/cabs">
          <FaTaxi />
          <span>Cabs</span>
        </NavLink>

        <NavLink to="/pooja">
          <FaPrayingHands />
          <span>Pooja</span>
        </NavLink>

        <NavLink to="/darshan">
          <FaPlaceOfWorship />
          <span>Darshan</span>
        </NavLink>
      </div>
    </>
  );
};

export default Navbar;