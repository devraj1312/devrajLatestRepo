import { FaSearch, FaChevronDown } from "react-icons/fa";
import "./PoojaSearch.scss";

const PoojaSearch = ({
  poojaType,
  setPoojaType,
  poojaDate,
  setPoojaDate,
  devotees,
  setDevotees,
  handlePoojaSearch,
}) => {
  return (
    <div className="pooja-search-wrapper">
      <div className="pooja-search-box">
        <div className="pooja-fields">

          {/* Pooja Type */}
          <div className="pooja-field">
            <label>Select Pooja</label>

            <div className="pooja-input-group pooja-select-group">
              <select
                value={poojaType}
                onChange={(e) => setPoojaType(e.target.value)}
              >
                <option value="">
                  Select Pooja
                </option>

                <option value="Mahakal Bhasma Aarti">
                  Mahakal Bhasma Aarti
                </option>

                <option value="Rudrabhishek">
                  Rudrabhishek
                </option>

                <option value="Mahamrityunjaya Jaap">
                  Mahamrityunjaya Jaap
                </option>

                <option value="Laghu Rudra Pooja">
                  Laghu Rudra Pooja
                </option>
              </select>

              <FaChevronDown className="select-arrow" />
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
              Search
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PoojaSearch;