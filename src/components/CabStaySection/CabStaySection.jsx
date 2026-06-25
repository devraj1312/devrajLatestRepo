import "./CabStaySection.scss";
import { useNavigate } from "react-router-dom";

import cabImg from "../../assets/images/cab3.png";
import roomImg from "../../assets/images/hotel3.png";
import { LuCarFront, LuBuilding } from "react-icons/lu";

const CabStaySection = () => {

  const navigate = useNavigate();

  return (
    <section className="cabstay-section">

      <div className="container">

        {/* Cab Service */}
        <div className="cabstay-card">

          <div className="cabstay-content">

            <div className="cabstay-header">

              <div className="cabstay-icon">
                <LuCarFront />
              </div>

              <div>

                <h3>Cab Services</h3>

                <p>
                  Safe, clean & comfortable rides across Ujjain.
                </p>

              </div>

            </div>

            <ul className="cabstay-list">

              <li>Well-maintained cabs</li>

              <li>Verified & professional drivers</li>

              <li>24x7 Availability</li>

              <li>Affordable & transparent pricing</li>

            </ul>

            <button className="cabstay-btn"
            onClick={() => navigate("/cabs")}>
              BOOK CAB NOW →
            </button>

          </div>

          <div className="cabstay-image">
            <img src={cabImg} alt="Cab Service" />
          </div>

        </div>

        {/* Stay Service */}
        <div className="cabstay-card">

          <div className="cabstay-content">

            <div className="cabstay-header">

              <div className="cabstay-icon">
                <LuBuilding />
              </div>

              <div>

                <h3>Stay Services</h3>

                <p>
                  Comfortable stays for a peaceful journey.
                </p>

              </div>

            </div>

            <ul className="cabstay-list">

              <li>Clean & Spacious Rooms</li>

              <li>Prime Locations near temples</li>

              <li>Best Amenities</li>

              <li>Best Price Guarantee</li>

            </ul>

            <button className="cabstay-btn">
              COMING SOON →
            </button>

          </div>

          <div className="cabstay-image">
            <img src={roomImg} alt="Stay Service" />
          </div>

        </div>

      </div>

    </section>
  );
};

export default CabStaySection;