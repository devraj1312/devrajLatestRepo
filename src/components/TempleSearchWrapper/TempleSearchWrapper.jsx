import {
  FaHotel,
  FaCar,
  FaSearch,
  FaChevronDown,
  FaPray,
  FaPlaceOfWorship,
} from "react-icons/fa";

import AutocompleteInput from "../AutocompleteInput";
import "./TempleSearchWrapper.scss";

const TempleSearchWrapper = ({
  activeTab,
  setActiveTab,
  handleCabSearch,
  travelDate,
  setTravelDate,
  pickupLocation,
  setPickupLocation,
  dropLocation,
  setDropLocation,
  hotelLocation,
  setHotelLocation,
}) => {
  return (
    <div className="temple-search-wrapper">

      <div className="temple-search-box">

        {/* TABS */}
        <div className="temple-tabs">

          <button
            className={activeTab === "cabs" ? "active" : ""}
            onClick={() => setActiveTab("cabs")}
          >
            <FaCar /> Cab
          </button>

          <button
            className={activeTab === "pooja" ? "active" : ""}
            onClick={() => setActiveTab("pooja")}
          >
            <FaPray /> Pooja
          </button>

          <button
            className={activeTab === "darshan" ? "active" : ""}
            onClick={() => setActiveTab("darshan")}
          >
            <FaPlaceOfWorship />
            Darshan
          </button>

          {/* <button
            className={activeTab === "hotels" ? "active" : ""}
            onClick={() => setActiveTab("hotels")}
          >
            <FaHotel /> Hotel
          </button> */}

        </div>
      
        {/* INPUTS */}

        <div className="temple-fields">

          {/* CABS */}

          {activeTab === "cabs" && (
            <>
              <div className="temple-field">

                <label>Travel Date</label>

                <div className="temple-input-group">

                  <input
                    type="date"
                    value={travelDate}
                    onChange={(e) =>
                      setTravelDate(e.target.value)
                    }
                  />

                </div>

              </div>

              <div className="temple-field">

                <label>Pickup</label>

                <AutocompleteInput
                  placeholder="Pickup location"
                  value={pickupLocation}
                  setValue={setPickupLocation}
                />

              </div>

              <div className="temple-field">

                <label>Drop</label>

                <AutocompleteInput
                  placeholder="Drop location"
                  value={dropLocation}
                  setValue={setDropLocation}
                />

              </div>

              <button
                className="temple-search-btn"
                onClick={handleCabSearch}
              >
                <FaSearch />
                Search
              </button>
            </>
          )}

          {/* POOJA */}

          {activeTab === "pooja" && (
            <>
              <div className="temple-field">
                <label>Select Pooja</label>

                <div className="temple-input-group temple-select-group">
                  <select defaultValue="">
                    <option value="" disabled>
                      Select Pooja
                    </option>

                    <option>Mahakal Bhasma Aarti</option>
                    <option>Rudrabhishek</option>
                    <option>Mahamrityunjaya Jaap</option>
                  </select>

                  <FaChevronDown className="select-arrow" />
                </div>
              </div>

              <div className="temple-field">
                <label>Pooja Date</label>

                <div className="temple-input-group">
                  <input
                    type="date"
                    min={new Date().toISOString().split("T")[0]}
                  />
                </div>
              </div>

              <div className="temple-field">
                <label>Devotees</label>

                <div className="temple-input-group temple-select-group">
                  <select defaultValue="">
                    <option value="" disabled>
                      Select Person
                    </option>

                    <option>1 Person</option>
                    <option>2 Person</option>
                    <option>Family</option>
                  </select>

                  <FaChevronDown className="select-arrow" />
                </div>
              </div>

              <button className="temple-search-btn">
                <FaSearch /> Search
              </button>
            </>
          )}

          {/* DARSHAN */}

          {activeTab === "darshan" && (
            <>
              <div className="temple-field">
                <label>Temple</label>

                <div className="temple-input-group temple-select-group">
                  <select defaultValue="">
                    <option value="" disabled>
                      Select Temple
                    </option>

                    <option>Mahakaleshwar</option>
                    <option>Kal Bhairav</option>
                    <option>Harsiddhi Mata</option>
                  </select>

                  <FaChevronDown className="select-arrow" />
                </div>
              </div>

              <div className="temple-field">
                <label>Darshan Date</label>

                <div className="temple-input-group">
                  <input
                    type="date"
                    min={new Date().toISOString().split("T")[0]}
                  />
                </div>
              </div>

              <div className="temple-field">
                <label>Members</label>

                <div className="temple-input-group temple-select-group">
                  <select defaultValue="">
                    <option value="" disabled>
                      Select Menbers
                    </option>

                    <option>1 Member</option>
                    <option>2 Members</option>
                    <option>Group</option>
                  </select>

                  <FaChevronDown className="select-arrow" />
                </div>
              </div>

              <div className="temple-btn-box">
                <button className="temple-search-btn">
                  <FaSearch /> Search
                </button>
              </div>
            </>
          )}

          {/* HOTELS */}

          {activeTab === "hotels" && (
            <>
              <div className="temple-field">

                <label>Location</label>

                <AutocompleteInput
                  placeholder="Enter city or hotel"
                  value={hotelLocation}
                  setValue={setHotelLocation}
                />

              </div>

              <div className="temple-field">

                <label>Check-in</label>

                <div className="temple-input-group">
                  <input type="date" />
                </div>

              </div>

              <div className="temple-field">

                <label>Check-out</label>

                <div className="temple-input-group">
                  <input type="date" />
                </div>

              </div>

              <button className="temple-search-btn">
                <FaSearch />
                Search
              </button>
            </>
          )}

        </div>
      </div>

    </div>
  );
};

export default TempleSearchWrapper;