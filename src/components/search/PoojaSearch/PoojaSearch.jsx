import { FaSearch, FaChevronDown } from "react-icons/fa";
import "./PoojaSearch.scss";

const PoojaSearch = ({
  poojaType,
  setPoojaType,
  suggestions,
  setSuggestions,
  handleSearchChange,
  handlePoojaSearch,
  handleSuggestionClick,
  poojaDate,
  setPoojaDate,
  devotees,
  setDevotees,
}) => {
  return (
    <div className="pooja-search-wrapper">
      <div className="pooja-search-box">
        <div className="pooja-fields">

          {/* Pooja Type */}
          <div className="pooja-field">
            <label className="pooja-label">
              Search Pooja
            </label>

            <div className="pooja-input-group">
              <input
                type="text"
                value={poojaType}
                onChange={handleSearchChange}
                placeholder="Search Pooja..."
              />

              {suggestions.length > 0 && (
                <div className="pooja-suggestions-dropdown">
                  {suggestions
                    .slice(0, 3)
                    .map((item) => (
                      <div
                        key={item.id}
                        className="pooja-suggestion-item"
                        onClick={() =>
                          handleSuggestionClick(item)
                        }
                      >
                        {item.name}
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>

          {/* Date */}
          <div className="pooja-field">
            <label>Pooja Date</label>

            <div className="pooja-input-group">
              <input
                type="date"
                min={new Date().toISOString().split("T")[0]}
                value={poojaDate}
                onChange={(e) => setPoojaDate(e.target.value)}
              />
            </div>
          </div>

          {/* Devotees */}
          <div className="pooja-field">
            <label>Devotees</label>

            <div className="pooja-input-group pooja-select-group">
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
          <div className="pooja-btn-box">
            <button
              className="pooja-search-btn"
              onClick={handlePoojaSearch}
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

export default PoojaSearch;