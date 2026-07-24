import "./PoojaDetailCard.scss";
import {
  FaClock,
  FaCheckCircle,
  FaUserTie,
  FaOm,
  FaShieldAlt,
  FaWhatsapp,
  FaPhoneAlt,
} from "react-icons/fa";

const PoojaDetailCard = ({
  pooja,
  onAdd,
  onNext,
  isAdded,
}) => {
  return (
    <div className="pooja-detail-card">

      <div className="card-image">
        <img
          src={pooja.image}
          alt={pooja.name}
        />
      </div>

      <div className="card-content">
        <div className="pooja-info">
          <h3>{pooja.name}</h3>

          {/* <div className="duration">
            <FaClock />
            <span>{pooja.duration}</span>
          </div> */}

          {pooja.description && (
            <p className="description">
              {pooja.description}
            </p>
          )}

            <div className="pooja-meta">
              <div className="info-section">

                  <h4>Our Specialities</h4>

                  <ul>
                    {(pooja.specialities || []).map((item, index) => {
                      const icons = [
                        <FaUserTie />,
                        <FaOm />,
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
                  {(pooja.includes || []).map((item, index) => (
                      <li key={index}>
                      <FaCheckCircle />
                      {item}
                      </li>
                  ))}
                  </ul>

              </div>
            </div>
        </div>

        <div className="pooja-price">

          <div className="duration">
            <FaClock />
            <span>{pooja.duration}</span>
          </div>

          <div className="bottom-section">

            <div className="price">
              ₹{pooja.price}
              <span>/ Pooja</span>
            </div>

            <div className="pooja-contact-buttons">

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

              <button
                className={isAdded ? "added-btn" : ""}
                onClick={() => {
                  if (isAdded) {
                    onNext();
                  } else {
                    onAdd(pooja);
                  }
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

export default PoojaDetailCard;