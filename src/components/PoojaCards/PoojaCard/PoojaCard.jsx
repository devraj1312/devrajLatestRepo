import "./PoojaCard.scss";

const PoojaCard = ({
  pooja,
  buttonText = "+ Add",
}) => {

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
          Duration: {pooja.duration}
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

            <button className="booking-details-btn">
            Details
            </button>

            <button className="booking-book-btn">
            {buttonText}
            </button>

        </div>

        </div>

      </div>

    </div>
  );
};

export default PoojaCard;