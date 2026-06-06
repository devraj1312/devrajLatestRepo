import { FaSearch } from "react-icons/fa";
import AutocompleteInput from "../../AutocompleteInput";
import "./CabSearch.scss";

const CabSearch = ({
  travelDate,
  setTravelDate,
  pickupLocation,
  setPickupLocation,
  dropLocation,
  setDropLocation,
  handleCabSearch,
}) => {
  return (
    <div className="cab-search-wrapper">
      <div className="cab-search-box">
        <div className="cab-fields">
          <div className="cab-field">
            <label>Travel Date</label>

            <div className="cab-input-group">
              <input
                type="date"
                value={travelDate}
                onChange={(e) =>
                  setTravelDate(e.target.value)
                }
              />
            </div>
          </div>

          <div className="cab-field">
            <label>Pickup Location</label>

            <AutocompleteInput
              placeholder="Pickup location"
              value={pickupLocation}
              setValue={setPickupLocation}
            />
          </div>

          <div className="cab-field">
            <label>Drop Location</label>

            <AutocompleteInput
              placeholder="Drop location"
              value={dropLocation}
              setValue={setDropLocation}
            />
          </div>

          <div className="cab-btn-box">
            <button
              className="cab-search-btn"
              onClick={handleCabSearch}
            >
              <FaSearch />
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CabSearch;