import { Link } from "react-router-dom";
import {
  FaStar,
  FaMapMarkerAlt,
  FaWifi,
  FaParking,
} from "react-icons/fa";
import "./HotelCard.scss";

const HotelCard = ({ hotel }) => {
  return (
    <div className="hotel-card">
      <div className="card-image">
        <img src={hotel.image} alt={hotel.name} />
      </div>

      <div className="card-content">
        <div className="hotel-info">
          <h3>{hotel.name}</h3>

          <div className="location">
            <FaMapMarkerAlt />
            <span>{hotel.location}</span>
          </div>

          <div className="rating-badge">
            <FaStar />
            <span>{hotel.rating}</span>
          </div>

          <div className="amenities">
            <FaWifi />
            <FaParking />
          </div>
        </div>

        <div className="hotel-price">
          <div className="price">
            ₹{hotel.price}
            <span>/ night</span>
          </div>

          <Link to={`/hotels/${hotel.id}`}>
            <button>View Details</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;