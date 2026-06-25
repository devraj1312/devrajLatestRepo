import {
  FaUsers,
  FaSnowflake,
  FaMusic,
  FaCheckCircle,
  FaCar
} from "react-icons/fa";

import "./CabCard.scss";

const CabCard = ({
  cab,
  isSelected,
  onNext,
  onAdd,
}) => {
  return (
    <div className="cab-card">

      <div className="cab-card-image">
        <img
          src={cab.image}
          alt={cab.name}
        />
      </div>

      <div className="card-content">

        <div className="cab-info">

          <h3>{cab.name}</h3>

          <p className="description">
            {cab.description}
          </p>

          <div className="cab-meta">

            <div className="info-section">

              <h4>Cab Details</h4>

              <ul>
                <li>
                  <FaUsers />
                  {cab.capacity} Seater
                </li>

                <li>
                  <FaSnowflake />
                  Air Conditioned
                </li>

                <li>
                  <FaMusic />
                  Music System
                </li>
              </ul>

            </div>

            <div className="info-section">

              <h4>Includes</h4>

              <ul>
                <li>
                  <FaCheckCircle />
                  Driver Allowance
                </li>

                <li>
                  <FaCheckCircle />
                  Comfortable Seats
                </li>

                <li>
                  <FaCheckCircle />
                  Local Assistance
                </li>
              </ul>

            </div>

          </div>

        </div>

        <div className="cab-price">

          <div className="cab-type">
            <FaCar />
            <span>{cab.type}</span>
          </div>

          <div className="price">
            ₹{cab.price}
            <span>/ km</span>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();

              if (isSelected) {
                onNext();
              } else {
                onAdd();
              }
            }}
          >
            {isSelected ? "Next" : "+ Add"}
          </button>

        </div>

      </div>

    </div>
  );
};

export default CabCard;