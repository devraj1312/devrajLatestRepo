import "./PoojaDetailCard.scss";
import {
  FaClock,
  FaCheckCircle,
  FaUserTie,
  FaOm,
  FaShieldAlt,
} from "react-icons/fa";

const PoojaDetailCard = ({
  pooja,
  buttonText = "+ Add",
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

          <div className="duration">
            <FaClock />
            <span>{pooja.duration}</span>
          </div>

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

          <div className="price">
            ₹{pooja.price}
            <span>/ Pooja</span>
          </div>

          <button>
            {buttonText}
          </button>

        </div>

      </div>

    </div>
  );
};

export default PoojaDetailCard;