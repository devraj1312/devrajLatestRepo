import "./HeroSection.scss";

import bgImage from "../../assets/images/ujjain12.png";
import TempleSearchWrapper from "../TempleSearchWrapper/TempleSearchWrapper";

import { useState } from "react";

import {
  FaShieldAlt,
  FaHeadset,
  FaUsers,
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

  return (
    <>
        <section
        className="hero"
        style={{
            backgroundImage: `url(${bgImage})`,
        }}
        >
        <div className="overlay">

            <div className="hero-content">

                <h1>
                    Experience Divine
                    <span> Ujjain</span>
                </h1>

                <p>
                    Plan your spiritual journey with our
                    <br />
                    customized Pooja, Darshan,
                    Stay & Travel Services.
                </p>

                {/* STATS */}

                <div className="divine-stats-bar">

                    <div className="divine-stat-item">
                    <div className="divine-stat-icon">
                        <FaUsers />
                    </div>

                    <div className="divine-stat-content">
                        <h4>
                        500K+ Happy Devotees
                        </h4>
                    </div>
                    </div>

                    <div className="divine-stat-item">
                    <div className="divine-stat-icon">
                        <FaShieldAlt />
                    </div>

                    <div className="divine-stat-content">
                        <h4>
                        Best Price Guarantee
                        </h4>
                    </div>
                    </div>

                    <div className="divine-stat-item">
                    <div className="divine-stat-icon">
                        <FaHeadset />
                    </div>

                    <div className="divine-stat-content">
                        <h4>
                        24x7 Support
                        </h4>
                    </div>
                    </div>

                </div>

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

        {/* <div className="feature-item">
            <div className="icon">
            <FaHeadset />
            </div>

            <div className="text">
            <h4>24x7 Customer</h4>
            <p>Support</p>
            </div>
        </div> */}

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