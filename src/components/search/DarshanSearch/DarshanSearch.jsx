import { FaSearch, FaChevronDown } from "react-icons/fa";
import "./DarshanSearch.scss";



const DarshanSearch = ({
  darshanType,
  setDarshanType,
  suggestions,
  setSuggestions,
  handleSearchChange,
  handleDarshanSearch,
  handleSuggestionClick,
}) => {
  return (
    <div className="darshan-search-wrapper">
      <div className="darshan-search-box">
        <div className="darshan-fields">

          {/* Darshan Type */}
          <div className="darshan-field">
            <label className="darshan-label">
              Search Darshan
            </label>

            <div className="darshan-input-group">
              <input
                type="text"
                value={darshanType}
                onChange={handleSearchChange}
                placeholder="Search Darshan..."
              />

              {suggestions.length > 0 && (
                <div className="suggestions-dropdown">
                  {suggestions.slice(0, 3).map((item) => (
                    <div
                      key={item.id}
                      className="suggestion-item"
                      onClick={() => handleSuggestionClick(item)}
                    >
                      {item.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Date */}
          <div className="darshan-field">
            <label>Darshan Date</label>

            <div className="darshan-input-group">
              <input
                type="date"
                min={new Date().toISOString().split("T")[0]}
              />
            </div>
          </div>

          {/* Devotees */}
          <div className="darshan-field">
            <label>Devotees</label>

            <div className="darshan-input-group darshan-select-group">
              <select>
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
              onClick={() => handleDarshanSearch()}
            >
              <FaSearch />
              <span>Search</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default DarshanSearch;