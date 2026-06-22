import "./CustomDarshanPlanner.scss";

const CustomDarshanPlanner = () => {
  return (
    <div className="container">
        <div className="custom-darshan-planner">

        <div className="planner-header">
            <h2>Custom Darshan Planner</h2>
            <p>Plan your own spiritual journey</p>
        </div>

        <div className="planner-grid">

            {/* Places */}
            <div className="planner-card places-card">
            <h4>Select Places</h4>

            <input
                type="text"
                placeholder="Search places..."
            />

            <div className="places-list">
                <label>
                <input type="checkbox" />
                Mahakaleshwar Temple
                </label>

                <label>
                <input type="checkbox" />
                Kal Bhairav Temple
                </label>

                <label>
                <input type="checkbox" />
                Harsiddhi Temple
                </label>

                <label>
                <input type="checkbox" />
                Omkareshwar Jyotirlinga
                </label>
            </div>

            <button>+ Add Custom Place</button>
            </div>

            {/* Itinerary */}
            <div className="planner-card itinerary-card">
            <h4>Your Itinerary</h4>

            <div className="itinerary-item">
                <span>1</span>

                <div>
                <h5>Mahakaleshwar Temple</h5>
                <p>2-3 Hours</p>
                </div>
            </div>

            <button>+ Add Another Place</button>
            </div>

            {/* Trip Details */}
            <div className="planner-card trip-card">
            <h4>Trip Details</h4>

            <select>
                <option>2 Days</option>
            </select>

            <select>
                <option>SUV</option>
            </select>

            <select>
                <option>Hotel Required</option>
            </select>

            <select>
                <option>Veg</option>
            </select>

            <select>
                <option>Guide Required</option>
            </select>
            </div>

            {/* Summary */}
            <div className="planner-card summary-card">
            <h4>Trip Summary</h4>

            <ul>
                <li>4 Places Selected</li>
                <li>2 Days / 1 Night</li>
                <li>SUV Included</li>
                <li>Hotel Included</li>
                <li>Guide Included</li>
            </ul>

            <div className="cost">
                ₹11,999
            </div>

            <button className="save-btn">
                Save & Continue
            </button>
            </div>

        </div>

        </div>
    </div>
  );
};

export default CustomDarshanPlanner;