import "./DarshanDetailCard.scss";
import {
  FaClock,
  FaCheckCircle,
  FaMapMarkerAlt,
  FaUserTie,
  FaShieldAlt,
  FaWhatsapp,
  FaPhoneAlt,
} from "react-icons/fa";

const DarshanDetailCard = ({
  darshan,
  onAdd,
  onNext,
  isAdded,
}) => {

  return (
    <div className="darshan-detail-card">

      <div className="card-image">
        <img
          src={darshan.image}
          alt={darshan.name}
        />
      </div>

      <div className="card-content">

        <div className="darshan-info">

          <h3>{darshan.name} </h3>

          {darshan.description && (
            <p className="description">
              {darshan.description}
            </p>
          )}

          <div className="darshan-meta">

            <div className="info-section">

              <h4>Our Specialities</h4>

              <ul>

                {(darshan.specialities || []).map((item, index) => {

                  const icons = [
                    <FaMapMarkerAlt />,
                    <FaUserTie />,
                    <FaShieldAlt />
                  ];

                  return (
                    <li key={index}>
                      {icons[index] || <FaShieldAlt />}
                      <span>{item}</span>
                    </li>
                  );
                })}

              </ul>

            </div>

            <div className="info-section">

              <h4>Includes</h4>

              <ul>

                {(darshan.includes || []).map((item, index) => (
                  <li key={index}>
                    <FaCheckCircle />
                    {item}
                  </li>
                ))}

              </ul>

            </div>

          </div>

        </div>

        <div className="darshan-price">

          <div className="duration">
            <FaClock />
            <span>{darshan.duration}</span>
          </div>

          <div className="bottom-section">
            <div className="price">
              ₹{darshan.price}
              <span>/ Cab</span>
            </div>

            <div className="darshan-contact-buttons">
              <a
                href="https://wa.me/917804025072"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-btn whatsapp-btn"
              >
                <FaWhatsapp />
              </a>

              <a
                href="tel:+917804025072"
                className="contact-btn call-btn"
              >
                <FaPhoneAlt />
              </a>

              <button
                className={isAdded ? "added-btn" : ""}
                onClick={() => {
                  if (isAdded) onNext();
                  else onAdd(darshan);
                }}
              >
                {isAdded ? "Next" : "+ Add"}
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default DarshanDetailCard;