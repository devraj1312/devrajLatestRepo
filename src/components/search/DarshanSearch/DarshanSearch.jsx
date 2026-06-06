import { FaSearch, FaChevronDown } from "react-icons/fa";
import "./DarshanSearch.scss";

const DarshanSearch = ({
  darshanType,
  setDarshanType,
  darshanDate,
  setDarshanDate,
  devotees,
  setDevotees,
  handleDarshanSearch,
}) => {
  return (
    <div className="darshan-search-wrapper">
      <div className="darshan-search-box">
        <div className="darshan-fields">

          {/* Darshan Type */}
          <div className="darshan-field">
            <label>Select Darshan</label>

            <div className="darshan-input-group darshan-select-group">
              <select
                value={darshanType}
                onChange={(e) => setDarshanType(e.target.value)}
              >
                <option value="">
                  Select Darshan
                </option>

                <option value="Bhasma Aarti Darshan">
                  Bhasma Aarti Darshan
                </option>

                <option value="VIP Darshan">
                  VIP Darshan
                </option>

                <option value="Sheeghra Darshan">
                  Sheeghra Darshan
                </option>

                <option value="General Darshan">
                  General Darshan
                </option>
              </select>

              <FaChevronDown className="select-arrow" />
            </div>
          </div>

          {/* Date */}
          <div className="darshan-field">
            <label>Darshan Date</label>

            <div className="darshan-input-group">
              <input
                type="date"
                min={new Date().toISOString().split("T")[0]}
                value={darshanDate}
                onChange={(e) => setDarshanDate(e.target.value)}
              />
            </div>
          </div>

          {/* Devotees */}
          <div className="darshan-field">
            <label>Devotees</label>

            <div className="darshan-input-group darshan-select-group">
              <select
                value={devotees}
                onChange={(e) => setDevotees(e.target.value)}
              >
                <option value="">
                  Select Person
                </option>

                <option value="1 Person">
                  1 Person
                </option>

                <option value="2 Person">
                  2 Person
                </option>

                <option value="3 Person">
                  3 Person
                </option>

                <option value="Family">
                  Family
                </option>
              </select>

              <FaChevronDown className="select-arrow" />
            </div>
          </div>

          {/* Search Button */}
          <div className="darshan-btn-box">
            <button
              className="darshan-search-btn"
              onClick={handleDarshanSearch}
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

export default DarshanSearch;