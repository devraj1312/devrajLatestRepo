import {
  FaUsers,
  FaSnowflake,
  FaMusic,
  FaUserTie
} from "react-icons/fa";

import { FaIndianRupeeSign } from "react-icons/fa6";

import "./CabCard.scss";

const CabCard = ({ cab }) => {
  return (
    <div className="cab-card">

      {/* Car Image */}
      <div className="card-image">
        <img src={cab.image} alt={cab.name} />
      </div>

      {/* Car Details */}
      <div className="card-content">
        <div className="content-top">
          <h3 className="cab-name">{cab.name}</h3>
          <p className="cab-description">{cab.description}</p>
        </div>

        <div className="content-bottom">
          <div className="cab-capacity">
            <FaUsers />
            <span>{cab.capacity} Seater</span>
          </div>

          <div className="cab-features">
            <span>
              <FaSnowflake />
              AC
            </span>

            <span>
              <FaMusic />
              Music
            </span>

            <span>
              <FaUserTie />
              Driver Allowance
            </span>
          </div>
        </div>
      </div>

      {/* Price & Button */}
      <div className="card-action">
        <div className="price">
          <FaIndianRupeeSign />
          {cab.price} / km
        </div>

        <button className="view-btn">
          View Details
        </button>
      </div>

    </div>
  );
};

export default CabCard;