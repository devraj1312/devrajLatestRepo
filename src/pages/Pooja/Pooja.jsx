import { useState, useRef } from "react";
import PoojaSearch from "../../components/search/PoojaSearch/PoojaSearch";
import PoojaDetailCard from "../../components/PoojaCards/PoojaDetailCard/PoojaDetailCard";
import "./Pooja.scss";


const poojas = [
  {
    id: 1,
    name: "Kalsarp Dosh Shanti",
    duration: "2-3 Hours",

    description:
      "Special pooja for Kalsarp Special pooja and removal of obstacles.",

    specialities: [
      "Certified Vedic Pandits",
      "Traditional Rituals as per Scriptures",
      "End-to-End Pooja Arrangements",
    ],

    includes: [
      "Experienced Pandit",
      "Pooja Samagri",
      "Prasad Distribution",
    ],

    price: 5100,
    image: "/src/assets/images/pooja1.png",
  },

  {
    id: 2,
    name: "Mahamrityunjaya Jaap",
    duration: "3-4 Hours",

    description:
      "Powerful chanting for health, protection and longevity.",

    specialities: [
      "Certified Vedic Pandits",
      "Traditional Rituals as per Scriptures",
      "End-to-End Pooja Arrangements",
    ],

    includes: [
      "Experienced Pandit",
      "108 Jaap Ritual",
      "Pooja Samagri",
    ],

    price: 3100,
    image: "/src/assets/images/pooja1.png",
  },

  {
    id: 3,
    name: "Rudrabhishek",
    duration: "1-2 Hours",

    description:
      "Sacred abhishek dedicated to Lord Shiva.",

    specialities: [
      "Certified Vedic Pandits",
      "Traditional Rituals as per Scriptures",
      "End-to-End Pooja Arrangements",
    ],

    includes: [
      "Pandit Arrangement",
      "Abhishek Samagri",
      "Prasad",
    ],

    price: 2500,
    image: "/src/assets/images/pooja1.png",
  },

  {
    id: 4,
    name: "Pitra Dosh Pooja",
    duration: "2-3 Hours",

    description:
      "Pooja for ancestral peace and removal of Pitra Dosh.",

    specialities: [
      "Certified Vedic Pandits",
      "Traditional Rituals as per Scriptures",
      "End-to-End Pooja Arrangements",
    ],

    includes: [
      "Experienced Pandit",
      "Complete Pooja Samagri",
      "Prasad Distribution",
    ],

    price: 4100,
    image: "/src/assets/images/pooja1.png",
  },
];


const Pooja = () => {

    const [poojaType, setPoojaType] = useState("");
    const [poojaDate, setPoojaDate] = useState("");
    const [devotees, setDevotees] = useState("");
    const [showCustomForm, setShowCustomForm] = useState(false);
    const customFormRef = useRef(null);
    const [selectedPooja, setSelectedPooja] = useState(null);

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
                poojaDate={poojaDate}
                setPoojaDate={setPoojaDate}
                devotees={devotees}
                setDevotees={setDevotees}
                // handlePoojaSearch={handlePoojaSearch}
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
                {poojas.map((pooja) => (
                    <PoojaDetailCard
                      key={pooja.id}
                      pooja={pooja}
                    />
                ))}
                </div>

            </div>

            {/* RIGHT SIDE */}
            <aside className="pooja-booking-summary">

                <div className="summary-card">

                <h3>Your Pooja Plan</h3>

                <p className="selected-count">
                    2 Items Selected
                </p>

                <div className="selected-poojas">

                    <div className="selected-item">
                    <span>Kalsarp Dosh Shanti</span>
                    <strong>₹5,100</strong>
                    </div>

                    <div className="selected-item">
                    <span>Mahamrityunjaya Jaap</span>
                    <strong>₹3,100</strong>
                    </div>

                </div>

                <div className="summary-total">
                    <span>Total</span>
                    <strong>₹8,200</strong>
                </div>

<button
  className="continue-btn"
  onClick={() => {
    setSelectedPooja("selected"); // ya actual pooja object

    setShowCustomForm(true);

    setTimeout(() => {
      customFormRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
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
  onClick={() => {
    setSelectedPooja(null); // custom request

    setShowCustomForm(true);

    setTimeout(() => {
      customFormRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  }}
>
  Create Custom Request
</button>

                </div>

            </aside>

            </div>

            {showCustomForm && (
              <div ref={customFormRef} className="custom-pooja-form">

                <div className="form-header">
                  <h3>
                    {selectedPooja
                      ? "Complete Your Pooja Booking"
                      : "Create Your Custom Pooja Request"}
                  </h3>

                  <p>
                    {selectedPooja
                      ? "Select your preferred date, time and other details to complete the booking."
                      : "Tell us your spiritual requirements and our team will arrange a suitable pooja for you."}
                  </p>
                </div>

                <form>

                  <div className="form-grid">

                    {/* Left Column */}

                    <div className="form-group">
                      <label>Pooja Name *</label>
                      <input
                        type="text"
                        placeholder="Enter pooja name"
                        value={selectedPooja?.name || ""}
                        readOnly={!!selectedPooja}
                      />
                    </div>

                    <div className="form-group">
                      <label>Preferred Date *</label>
                      <input type="date" />
                    </div>

                    <div className="form-group">
                      <label>Preferred Time *</label>

                      <select>
                        <option>Select time</option>
                        <option>Morning</option>
                        <option>Afternoon</option>
                        <option>Evening</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label>Number of Members *</label>

                      <select>
                        <option>Select number</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>5+</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label>Special Requests</label>

                      <textarea
                        rows="2"
                        placeholder="Any special requests..."
                      />
                    </div>

                  </div>

                  <div className="form-action">

                    <button type="submit">
                      Next
                    </button>

                  </div>

                </form>

              </div>
            )}

        </div>
    </div>
    </>
  );
};

export default Pooja;