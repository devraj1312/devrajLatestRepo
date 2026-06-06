import { FaSearch } from "react-icons/fa";
import AutocompleteInput from "../../AutocompleteInput";
import "./HotelSearch.scss";

const HotelSearch = ({
  hotelLocation,
  setHotelLocation,
}) => {

  return (
    <div className="hotel-search-wrapper">

      <div className="hotel-search-box">

        <div className="hotel-fields">

          {/* Location */}

          <div className="hotel-field">

            <label>Location</label>

            <AutocompleteInput
              placeholder="Enter city or hotel"
              value={hotelLocation}
              setValue={setHotelLocation}
            />

          </div>

          {/* Check In */}

          <div className="hotel-field">

            <label>Check-in</label>

            <div className="hotel-input-group">
              <input type="date" />
            </div>

          </div>

          {/* Check Out */}

          <div className="hotel-field">

            <label>Check-out</label>

            <div className="hotel-input-group">
              <input type="date" />
            </div>

          </div>

          {/* Search */}

          <div className="hotel-btn-box">

            <button className="hotel-search-btn">
              <FaSearch />
              Search
            </button>

          </div>

        </div>

      </div>

    </div>
  );
};

export default HotelSearch;