import { useState, useRef } from "react";
import PoojaSearch from "../../components/search/PoojaSearch/PoojaSearch";
import PoojaDetailCard from "../../components/PoojaCards/PoojaDetailCard/PoojaDetailCard";
import "./Pooja.scss";
import { poojaData } from "../../data/poojaData";
import { useNavigate } from "react-router-dom";

const Pooja = () => {

  const [poojaType, setPoojaType] = useState("");
  const [poojaDate, setPoojaDate] = useState("");
  const [devotees, setDevotees] = useState("");
  const navigate = useNavigate();
  const [selectedPoojas, setSelectedPoojas] = useState([]);
  const summaryRef = useRef(null);
  const [suggestions, setSuggestions] = useState([]);
  const [searchResult, setSearchResult] = useState(poojaData);

  const handleAddPooja = (pooja) => {
    const alreadyAdded = selectedPoojas.find(
      (item) => item.id === pooja.id
    );

    if (alreadyAdded) return;

    setSelectedPoojas([
      ...selectedPoojas,
      pooja,
    ]);
  };

  const handleRemovePooja = (id) => {
    setSelectedPoojas(
      selectedPoojas.filter(
        (item) => item.id !== id
      )
    );
  };

  const totalAmount = selectedPoojas.reduce(
    (total, item) => total + Number(item.price),
    0
  );

  const scrollToSummary = () => {
    summaryRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;

    setPoojaType(value);

    if (!value.trim()) {
      setSuggestions([]);
      setSearchResult(poojaData);
      return;
    }

    const filtered = poojaData.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );

    setSuggestions(filtered);
  };

  const handlePoojaSearch = (
    searchValue = poojaType
  ) => {

    const value =
      typeof searchValue === "string"
        ? searchValue
        : poojaType;

    const filtered = poojaData.filter((item) =>
      item.name
        .toLowerCase()
        .includes(value.toLowerCase())
    );

    setSearchResult(filtered);
  };

  const handleSuggestionClick = (
    selectedPooja
  ) => {
    setPoojaType(selectedPooja.name);

    setSuggestions([]);

    setSearchResult(
      poojaData.filter(
        (item) => item.id === selectedPooja.id
      )
    );
  };
 
  return (
    <>

      {/* Hero Section */}
      <section className="pooja-hero">

        <img
          src="/src/assets/images/pooja2.png"
          alt="Pooja Services"
        />

        <div className="hero-overlay">
          <div className="container">
            <div className="hero-content">

              <span className="hero-tag">
                Rituals • Blessings • Spiritual Guidance
              </span>

              <h1>
                Book Sacred Pooja Services
              </h1>

              <p>
                Connect with experienced pandits and
                perform divine rituals for prosperity,
                peace and spiritual well-being.
              </p>

            </div>

            <PoojaSearch
              poojaType={poojaType}
              setPoojaType={setPoojaType}
              suggestions={suggestions}
              setSuggestions={setSuggestions}
              handleSearchChange={handleSearchChange}
              handlePoojaSearch={handlePoojaSearch}
              handleSuggestionClick={handleSuggestionClick}
              poojaDate={poojaDate}
              setPoojaDate={setPoojaDate}
              devotees={devotees}
              setDevotees={setDevotees}
            />

          </div>
        </div>
      </section>

      {/* Page Content */}
      <div className="container">
        <div className="pooja-booking-page">
          <div className="section-heading">
          <h2>
              Choose Your <span>Spiritual Service</span>
          </h2>

          {/* <p>
              Select from a variety of traditional poojas
              performed by verified and experienced priests.
          </p> */}
          </div>

          <div className="pooja-booking-layout">

          {/* LEFT SIDE */}
          <div className="pooja-services">
            <div className="pooja-booking-grid">

              {searchResult.length > 0 ? (

                searchResult.map((pooja) => (
                  <PoojaDetailCard
                    key={pooja.id}
                    pooja={pooja}
                    onAdd={handleAddPooja}
                    onNext={scrollToSummary}
                    isAdded={
                      selectedPoojas.some(
                        (item) => item.id === pooja.id
                      )
                    }
                  />
                ))

              ) : (

                <div className="no-darshan-found">

                  <div className="empty-icon">
                    🕉️
                  </div>

                  <h3>No Pooja Found</h3>

                  <p>
                    The pooja you searched for is not available.
                    Create a custom pooja request according
                    to your spiritual requirements.
                  </p>

                  <button
                    className="custom-planner-btn"
                    onClick={() =>
                      navigate("/custom-darshan-planner")
                    }
                  >
                    Create Custom Request
                  </button>

                </div>

              )}

            </div>
          </div>

          {/* RIGHT SIDE */}
          <aside className="pooja-booking-summary">
            <div
              className="summary-card"
              ref={summaryRef}
            >
              <h3>Your Pooja Plan</h3>

              <p className="selected-count">
                {selectedPoojas.length} Poojas Selected
              </p>

              {selectedPoojas.map((item) => (
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
                        handleRemovePooja(item.id)
                      }
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}

              <div className="summary-total">
                <span>Total</span>
                <strong>₹{totalAmount}</strong>
              </div>

              <button
                disabled={!selectedPoojas.length}
                className="continue-btn"
                onClick={() => {
                  navigate("/inquiry-form", {
                    state: {
                      category: "Pooja",
                      selectedPoojas,
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
                🕉️
              </div>

              <h4>Need a Personalized Pooja?</h4>

              <p>
                Create a custom pooja request based on your
                spiritual needs, rituals, and preferred schedule.
              </p>
                <button 
                  onClick={() =>
                    navigate("/custom-darshan-planner")
                  }
                >
                  Create Custom Request
                </button>
            </div>

          </aside>

          </div>
        </div>
      </div>
    </>
  );
};

export default Pooja;