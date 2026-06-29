import { FaClock } from "react-icons/fa";
import "./DarshanCard.scss";
import { useNavigate } from "react-router-dom";

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
              <span>/ Person</span>
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
                <button className="darshan-details-btn"
                onClick={() => navigate("/darshan")}>
                  Details
                </button>

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