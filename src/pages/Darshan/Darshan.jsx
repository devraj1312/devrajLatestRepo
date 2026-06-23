import { useState, useRef } from "react";
import DarshanSearch from "../../components/search/DarshanSearch/DarshanSearch";
import DarshanDetailCard from "../../components/DarshanCards/DarshanDetailCard/DarshanDetailCard";
import "./Darshan.scss";
import { darshanData } from "../../data/darshanData";
import { useNavigate } from "react-router-dom";

const Darshan = () => {

  const [darshanType, setDarshanType] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedPackages, setSelectedPackages] = useState([]);
  const summaryRef = useRef(null);
  const navigate = useNavigate();
  const [searchResult, setSearchResult] = useState(darshanData);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setDarshanType(value);

    if (!value.trim()) {
      setSuggestions([]);
      setSearchResult(darshanData);
      return;
    }

    const filtered = darshanData.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );

    setSuggestions(filtered);
  };

  const handleAddPackage = (darshan) => {
    const alreadySelected = selectedPackages.find(
      item => item.id === darshan.id
    );

    if (alreadySelected) {
      return;
    }

    setSelectedPackages([
      ...selectedPackages,
      darshan
    ]);
  };

  const totalAmount = selectedPackages.reduce(
    (total, item) => total + Number(item.price),
    0
  );

  const handleRemovePackage = (id) => {
    setSelectedPackages(
      selectedPackages.filter(
        item => item.id !== id
      )
    );

  };

  const handleDarshanSearch = (searchValue = darshanType) => {
    const filtered = darshanData.filter((item) =>
      item.name.toLowerCase().includes(searchValue.toLowerCase())
    );

    setSearchResult(filtered);
  };

  const handleSuggestionClick = (selectedDarshan) => {
    setDarshanType(selectedDarshan.name);
    setSuggestions([]);

    setSearchResult(
      darshanData.filter(
        (item) => item.id === selectedDarshan.id
      )
    );
  };

  const scrollToSummary = () => {
    summaryRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

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
                suggestions={suggestions}
                setSuggestions={setSuggestions}
                handleSearchChange={handleSearchChange}
                handleDarshanSearch={handleDarshanSearch}
                handleSuggestionClick={handleSuggestionClick}
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

                  {searchResult.length > 0 ? (
                    searchResult.map((darshan) => (
                      <DarshanDetailCard
                        key={darshan.id}
                        darshan={darshan}
                        onAdd={handleAddPackage}
                        onNext={scrollToSummary}
                        isAdded={
                          selectedPackages.some(
                            (item) => item.id === darshan.id
                          )
                        }
                      />
                    ))
                  ) : (
                    <div className="no-darshan-found">
                      <div className="empty-icon">🛕</div>

                      <h3>No Darshan Found</h3>

                      <p>
                        The darshan you searched for is not available.
                        Create a custom spiritual journey according
                        to your requirements.
                      </p>

                      <button
                        className="custom-planner-btn"
                        onClick={() => navigate("/custom-darshan-planner")}
                      >
                        Create Custom Plan
                      </button>
                    </div>
                  )}
                </div>   
              </div>
    
              {/* RIGHT */}
    
              <aside className="darshan-booking-summary">   
                <div className="summary-card" ref={summaryRef}>
    
                  <h3>Your Darshan Plan</h3>
    
                  <p className="selected-count">
                    {selectedPackages.length} Packages Selected
                  </p>
    
                  {selectedPackages.map((item) => (
                    <div
                      key={item.id}
                      className="selected-item"
                    >
                      <span>{item.name}</span>
                      <div className="selected-price">
                        <strong>
                          ₹{item.price}
                        </strong>

                        <button
                          className="remove-package-btn"
                          onClick={() =>
                            handleRemovePackage(item.id)
                          }
                        >
                          ✕
                        </button>

                      </div>
                    </div>
                  ))}

                  <div className="summary-total">
                    <span>Total</span>
                    <strong> ₹{totalAmount}</strong>
                  </div>
    
                  <button
                    disabled={!selectedPackages.length}
                    className="continue-btn"
                    onClick={() => {
                      navigate("/inquiry-form", {
                        state: {
                          category: "Darshan",
                          selectedPackages,
                          totalAmount,
                        },
                      });
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
                    onClick={() =>
                      navigate("/custom-darshan-planner")
                    }
                  >
                    Create Custom Plan
                  </button>
    
                </div>
    
              </aside>
    
            </div>
    
          </div>
    
      </div>
    </>
  );
};

export default Darshan;