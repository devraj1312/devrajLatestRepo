import { FaClock } from "react-icons/fa";
import "./DarshanCard.scss";
import { useNavigate } from "react-router-dom";
import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa";

const DarshanCard = ({ item }) => {

  const navigate = useNavigate();

  return (
    <div className="darshan-package-card">

      <div className="darshan-package-image">
        <img
          src={item.image}
          alt={item.title}
        />
      </div>

      <div className="darshan-package-content">

        <h3>{item.name}</h3>

        <span className="darshan-duration">
          <FaClock />
          <span>Duration:</span>
          {item.duration}
        </span>

        <p>{item.description}</p>

        <div className="darshan-package-footer">

          <div className="card-darshan-price">
            ₹{item.price}
            {item.price !== "Custom" && (
              <span>/ Cab</span>
            )}
          </div>

          <div className="darshan-action-buttons">

            {item.isCustom ? (
              <button className="darshan-create-btn"
              onClick={() => navigate("/custom-darshan-planner")}>
                Create Plan
              </button>
            ) : (
              <>
                {/* <button className="darshan-details-btn"
                onClick={() => navigate("/darshan")}>
                  Details
                </button> */}

                <div className="darshan-contact-buttons">
                  <a
                    href="https://wa.me/917804025072"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-btn whatsapp-btn"
                    aria-label="WhatsApp"
                  >
                    <FaWhatsapp />
                  </a>

                  <a
                    href="tel:+917804025072"
                    className="contact-btn call-btn"
                    aria-label="Call"
                  >
                    <FaPhoneAlt />
                  </a>
                </div>

                <button className="darshan-book-btn"
                onClick={() => navigate("/darshan")}>
                  Book Now
                </button>
              </>
            )}

          </div>

        </div>

      </div>

    </div>
  );
};

export default DarshanCard;