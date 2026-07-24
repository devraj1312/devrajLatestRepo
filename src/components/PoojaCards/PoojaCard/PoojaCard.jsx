import "./PoojaCard.scss";
import { useNavigate } from "react-router-dom";
import { FaWhatsapp, FaPhoneAlt, FaClock } from "react-icons/fa";

const PoojaCard = ({
  pooja,
  buttonText = "+ Add",
}) => {

  const navigate = useNavigate();

  return (
    <div className="booking-pooja-card">

      <div className="booking-pooja-image">
        <img
          src={pooja.image}
          alt={pooja.name}
        />
      </div>

      <div className="booking-pooja-content">

        <h3>{pooja.name}</h3>

        <span className="booking-duration">
          <FaClock />
          <span>Duration:</span>
          {pooja.duration}
        </span>

        {pooja.description && (
          <p>{pooja.description}</p>
        )}

        <div className="booking-pooja-footer">

        <div className="booking-price">
            ₹{pooja.price}

            <span>/ Pooja</span>
        </div>

        <div className="booking-pooja-actions">

            {/* <button className="booking-details-btn"
            onClick={() => navigate("/pooja")}>
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

            <button className="booking-book-btn"
            onClick={() => navigate("/pooja")}>
            {buttonText}
            </button>

        </div>

        </div>

      </div>

    </div>
  );
};

export default PoojaCard;