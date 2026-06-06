import "./DarshanDetailCard.scss";
import {
  FaClock,
  FaCheckCircle,
  FaCar,
  FaMapMarkerAlt,
  FaUserTie,
  FaShieldAlt,
} from "react-icons/fa";

const DarshanDetailCard = ({
  darshan,
  buttonText = "+ Add",
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

          <h3>{darshan.name}</h3>

          <div className="duration">
            <FaClock />
            <span>{darshan.duration}</span>
          </div>

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

          <div className="price">
            ₹{darshan.price}
            <span>/ Person</span>
          </div>

          <button>
            {buttonText}
          </button>

        </div>

      </div>

    </div>
  );
};

export default DarshanDetailCard;