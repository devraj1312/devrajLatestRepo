import "./HeroSection.scss";

import bgImage from "../../assets/images/bgImage1.png";
import bgImage2 from "../../assets/images/bgImage2.png";
import logo4 from "../../assets/images/logo4.png";
import TempleSearchWrapper from "../TempleSearchWrapper/TempleSearchWrapper";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";

import {
  FaShieldAlt,
  FaTag,
  FaLock,
  FaClipboardCheck,
} from "react-icons/fa";

const HeroSection = ({
  handleCabSearch,
  travelDate,
  setTravelDate,
  pickupLocation,
  setPickupLocation,
  dropLocation,
  setDropLocation,
  hotelLocation,
  setHotelLocation,
}) => {

    const [activeTab, setActiveTab] = useState("cabs");
    const [bg, setBg] = useState(
    window.innerWidth <= 768 ? bgImage2 : bgImage
    );

    useEffect(() => {
    const handleResize = () => {
        setBg(window.innerWidth <= 768 ? bgImage2 : bgImage);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
    }, []);

    const navigate = useNavigate();


  return (
    <>
        <section
            className="hero"
            style={{ backgroundImage: `url(${bg})` }}
        >
        <div className="overlay">

            <div className="hero-content">

                <img
                    src={logo4}
                    alt="Ujjain Logo"
                    className="hero-logo"
                />

                <h1>
                    Ujjain's
                    <span>1st Trip Planner</span>
                    <small>& Travel Partner</small>

                    <div className="hero-divider">
                        ༺━━━━━━━━━━ ❖ ━━━━━━━━━━༻
                    </div>
                </h1>

                <p>
                    Plan Your Custom Trip, <span>Your Way.</span>
                </p>

                <button className="hero-btn" onClick={() => navigate("/custom-darshan-planner")}>
                    Plan Your Trip
                    <FiArrowRight />
                </button>


                {/* SEARCH */}

                <TempleSearchWrapper
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    handleCabSearch={handleCabSearch}
                    travelDate={travelDate}
                    setTravelDate={setTravelDate}
                    pickupLocation={pickupLocation}
                    setPickupLocation={setPickupLocation}
                    dropLocation={dropLocation}
                    setDropLocation={setDropLocation}
                    hotelLocation={hotelLocation}
                    setHotelLocation={setHotelLocation}
                />
            </div>
        </div>
        </section>

        {/* FEATURES STRIP */}
        <section className="hero-features">
        <div className="feature-item">
            <div className="icon">
            <FaTag />
            </div>

            <div className="text">
            <h4>Best Price</h4>
            <p>Guarantee</p>
            </div>
        </div>

        <div className="feature-item">
            <div className="icon">
            <FaShieldAlt />
            </div>

            <div className="text">
            <h4>Verified</h4>
            <p>Services</p>
            </div>
        </div>

        <div className="feature-item">
            <div className="icon">
            <FaLock />
            </div>

            <div className="text">
            <h4>Safe & Secure</h4>
            <p>Booking</p>
            </div>
        </div>

        <div className="feature-item">
            <div className="icon">
            <FaClipboardCheck />
            </div>

            <div className="text">
            <h4>Easy Booking</h4>
            <p>Process</p>
            </div>
        </div>
        </section>
    </>
  );
};

export default HeroSection;