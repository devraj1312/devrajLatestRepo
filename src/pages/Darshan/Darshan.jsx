import { useState, useRef } from "react";
import DarshanSearch from "../../components/search/DarshanSearch/DarshanSearch";
import DarshanDetailCard from "../../components/DarshanCards/DarshanDetailCard/DarshanDetailCard";
import "./Darshan.scss";

const darshans = [
  {
    id: 1,
    image: "/src/assets/images/dershan1.png",
    name: "Mahakal VIP Darshan",
    duration: "2 Hours",
    description:
      "Priority darshan with dedicated assistance and smooth temple entry.",

    specialities: [
      "Priority Entry",
      "Expert Guide",
      "Full Assistance",
    ],

    includes: [
      "VIP Entry",
      "Guide",
      "Temple Assistance",
      "Support Team",
    ],

    price: 1499,
  },

  {
    id: 2,
    image: "/src/assets/images/ujjain2.png",
    name: "Kal Bhairav Darshan",
    duration: "Half Day",

    description:
      "Visit the famous Kal Bhairav temple with spiritual guidance.",

    specialities: [
      "Temple Visit",
      "Guide Support",
      "Comfort Journey",
    ],

    includes: [
      "Temple Entry",
      "Guide",
      "Travel Support",
    ],

    price: 899,
  },

  {
    id: 3,
    image: "/src/assets/images/ujjain3.png",
    name: "Omkareshwar Darshan",
    duration: "Full Day",

    description:
      "Complete darshan experience at Omkareshwar Jyotirlinga.",

    specialities: [
      "Jyotirlinga Visit",
      "Guide",
      "Premium Support",
    ],

    includes: [
      "Darshan",
      "Guide",
      "Temple Assistance",
      "Support Team",
    ],

    price: 2499,
  },
];

const Darshan = () => {

  const [darshanType, setDarshanType] = useState("");
  const [darshanDate, setDarshanDate] = useState("");
  const [devotees, setDevotees] = useState("");
  const [showCustomForm, setShowCustomForm] = useState(false);
  const [selectedDarshan, setSelectedDarshan] = useState(null);
  const customFormRef = useRef(null);

  return (
    <>

      {/* Hero Section */}
      <section className="darshan-hero">

        <img
          src="/src/assets/images/darshan1.png"
          alt="Darshan Services"
        />

        <div className="hero-overlay">

          <div className="container">

            <div className="hero-content">

              <span className="hero-tag">
                Temple Visits • VIP Entry • Spiritual Experience
              </span>

              <h1>
                Book Divine Darshan Packages
              </h1>

              <p>
                Experience sacred temple visits with
                hassle-free darshan arrangements,
                guided assistance and comfortable travel.
              </p>

            </div>

            <DarshanSearch
              darshanType={darshanType}
              setDarshanType={setDarshanType}
              darshanDate={darshanDate}
              setDarshanDate={setDarshanDate}
              devotees={devotees}
              setDevotees={setDevotees}
              // handleDarshanSearch={handleDarshanSearch}
            />

          </div>

        </div>

      </section>

        <div className="container">
      
            <div className="darshan-booking-page">
      
              <div className="section-heading">
      
                <h2>
                  Choose Your <span>Darshan Package</span>
                </h2>
      
              </div>
      
              <div className="darshan-booking-layout">
      
                {/* LEFT */}
      
                <div className="darshan-services">
      
                  <div className="darshan-booking-grid">
      
                    {darshans.map((darshan) => (
                      <DarshanDetailCard
                        key={darshan.id}
                        darshan={darshan}
                      />
                    ))}
      
                  </div>
      
                </div>
      
                {/* RIGHT */}
      
                <aside className="darshan-booking-summary">
      
                  <div className="summary-card">
      
                    <h3>Your Darshan Plan</h3>
      
                    <p className="selected-count">
                      2 Packages Selected
                    </p>
      
                    <div className="selected-item">
                      <span>Mahakal VIP Darshan</span>
                      <strong>₹1499</strong>
                    </div>
      
                    <div className="selected-item">
                      <span>Omkareshwar Darshan</span>
                      <strong>₹2499</strong>
                    </div>
      
                    <div className="summary-total">
                      <span>Total</span>
                      <strong>₹3998</strong>
                    </div>
      
                    <button
                      className="continue-btn"
                      onClick={() => {
                        setSelectedDarshan("selected");
      
                        setShowCustomForm(true);
      
                        setTimeout(() => {
                          customFormRef.current?.scrollIntoView({
                            behavior: "smooth",
                          });
                        }, 100);
                      }}
                    >
                      Continue
                    </button>
      
                  </div>
      
                  <div className="custom-request-card">
      
                    <div className="request-icon">
                      🛕
                    </div>
      
                    <h4>
                      Need a Custom Darshan Plan?
                    </h4>
      
                    <p>
                      Create your personalized temple visit
                      package with travel and guide support.
                    </p>
      
                    <button
                      onClick={() => {
                        setSelectedDarshan(null);
      
                        setShowCustomForm(true);
      
                        setTimeout(() => {
                          customFormRef.current?.scrollIntoView({
                            behavior: "smooth",
                          });
                        }, 100);
                      }}
                    >
                      Create Custom Plan
                    </button>
      
                  </div>
      
                </aside>
      
              </div>
      
              {showCustomForm && (
      
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

      <button>
        + Add Custom Place
      </button>
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

      <div className="itinerary-item">
        <span>2</span>

        <div>
          <h5>Kal Bhairav Temple</h5>
          <p>1-2 Hours</p>
        </div>
      </div>

      <button>
        + Add Another Place
      </button>

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
      
              )}
      
            </div>
      
        </div>

    </>
  );
};

export default Darshan;