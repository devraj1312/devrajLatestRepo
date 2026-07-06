import "./CustomDarshanPlanner.scss";
import { darshanData } from "../../data/darshanData";
import { poojaData } from "../../data/poojaData";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CustomDarshanPlanner = () => {

  const navigate = useNavigate();

  {/* Darshan Section */}
  const [selectedPlaces, setSelectedPlaces] = useState([]);
  const [customPlace, setCustomPlace] = useState("");

  const handlePlaceSelect = (placeName) => {
    setSelectedPlaces((prev) =>
      prev.includes(placeName)
        ? prev.filter((item) => item !== placeName)
        : [...prev, placeName]
    );
  };

  const handleAddCustomPlace = () => {
    const place = customPlace.trim();

    if (!place) return;

    if (!selectedPlaces.includes(place)) {
        setSelectedPlaces((prev) => [...prev, place]);
    }

    setCustomPlace("");
  };

  const handleRemovePlace = (placeName) => {
    setSelectedPlaces((prev) =>
        prev.filter((item) => item !== placeName)
    );
  };

  {/* Pooja Section */}
  const [selectedPoojas, setSelectedPoojas] = useState([]);
  const [customPooja, setCustomPooja] = useState("");

  const handlePoojaSelect = (poojaName) => {
    setSelectedPoojas((prev) =>
      prev.includes(poojaName)
        ? prev.filter((name) => name !== poojaName)
        : [...prev, poojaName]
    );
  };

  const handleRemovePooja = (poojaName) => {
    setSelectedPoojas((prev) =>
      prev.filter((name) => name !== poojaName)
    );
  };

  const handleAddCustomPooja = () => {
    const trimmedPooja = customPooja.trim();

    if (!trimmedPooja) return;

    if (!selectedPoojas.includes(trimmedPooja)) {
      setSelectedPoojas((prev) => [...prev, trimmedPooja]);
    }

    setCustomPooja("");
  };

  {/* Travel Details Section */}
  const [tripDuration, setTripDuration] = useState("1 Day");
  const [cabRequired, setCabRequired] = useState("No");
  const [cabType, setCabType] = useState("");

  {/* Hotel Required */}
  const [needHotel, setNeedHotel] = useState("No");
  const [roomType, setRoomType] = useState("");
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);

  {/* Extra Services Section */}
  const [selectedExtraServices, setSelectedExtraServices] = useState([]);

  const handleExtraServiceSelect = (service) => {
    setSelectedExtraServices((prev) =>
      prev.includes(service)
        ? prev.filter((item) => item !== service)
        : [...prev, service]
    );
  };

  {/* Contact Details Section */}
  const [travelDate, setTravelDate] = useState("");
  const [numberOfTravellers, setNumberOfTravellers] = useState(1);
  const [specialRequest, setSpecialRequest] = useState("");


  const handleContinue = () => {
    const description = `Selected Darshan Places:
    ${selectedPlaces.length ? selectedPlaces.join(", ") : "None"}

    Selected Poojas:
    ${selectedPoojas.length ? selectedPoojas.join(", ") : "None"}

    Travel Details:
    Trip Duration: ${tripDuration}
    Cab Required: ${cabRequired}
    Cab Type: ${
        cabRequired === "Yes"
          ? cabType || "Not Selected"
          : "Not Required"
      }

    Hotel Details:
    Need Hotel: ${needHotel}
    Room Type: ${
        needHotel === "Yes"
          ? roomType || "Not Selected"
          : "Not Required"
      }
    Adults: ${needHotel === "Yes" ? adults : "N/A"}
    Children: ${needHotel === "Yes" ? children : "N/A"}

    Extra Services:
    ${
      selectedExtraServices.length
        ? selectedExtraServices.join(", ")
        : "None"
    }
    
    Contact Details:
    Travel Date: ${travelDate || "Not Selected"}
    Number of Travellers: ${numberOfTravellers}

    Special Request:
    ${specialRequest.trim() || "None"}`;
    

    navigate("/inquiry-form", {
      state: {
        category: "Custom Plan",
        description,
      },
    });
  };

  return (
    <div className="container">
      <div className="custom-darshan-planner">

        <div className="planner-header">
          <h2>Custom Darshan Planner</h2>
          <p>Plan your own spiritual journey</p>
        </div>

        {/* Darshan Section */}
        <div className="darshan-planner-card">
        <h4>Select Darshan Places</h4>

        <div className="selected-places-section">
          <label className="field-label">Selected Places</label>

          <div className="selected-places-box">
                {selectedPlaces.length > 0 ? (
                selectedPlaces.map((place) => (
                    <div className="place-chip" key={place}>

                    <span>{place}</span>

                    <button
                        type="button"
                        onClick={() => handleRemovePlace(place)}
                    >
                        ✕
                    </button>

                    </div>
                ))
                ) : (
                <span className="placeholder">
                    No places selected
                </span>
                )}
          </div>

          <div className="custom-place-box">
            <input
                type="text"
                placeholder="Enter Custom Place"
                value={customPlace}
                onChange={(e) => setCustomPlace(e.target.value)}
            />

            <button
                type="button"
                className="add-place-btn"
                onClick={handleAddCustomPlace}
            >
                Add Custom Place
            </button>
            </div>
        </div>

        <div className="places-list">
            {darshanData.map((place) => (
            <label key={place.id}>
                <input
                type="checkbox"
                checked={selectedPlaces.includes(place.name)}
                onChange={() => handlePlaceSelect(place.name)}
                />
                <span>{place.name}</span>
            </label>
            ))}
        </div>
        </div>

        {/* Pooja Section */}
        <div className="pooja-planner-card">
          <h4>Select Poojas</h4>

          <div className="selected-poojas-section">
            <label className="field-label">Selected Poojas</label>

            <div className="selected-poojas-box">
              {selectedPoojas.length > 0 ? (
                selectedPoojas.map((pooja) => (
                  <div className="pooja-chip" key={pooja}>
                    <span>{pooja}</span>

                    <button
                      type="button"
                      onClick={() => handleRemovePooja(pooja)}
                    >
                      ✕
                    </button>
                  </div>
                ))
              ) : (
                <span className="placeholder">
                  No poojas selected
                </span>
              )}
            </div>

            <div className="custom-pooja-box">
              <input
                type="text"
                placeholder="Enter Custom Pooja"
                value={customPooja}
                onChange={(e) => setCustomPooja(e.target.value)}
              />

              <button
                type="button"
                className="add-pooja-btn"
                onClick={handleAddCustomPooja}
              >
                Add Custom Pooja
              </button>
            </div>
          </div>

          <div className="poojas-list">
            {poojaData.map((pooja) => (
              <label key={pooja.id}>
                <input
                  type="checkbox"
                  checked={selectedPoojas.includes(pooja.name)}
                  onChange={() => handlePoojaSelect(pooja.name)}
                />

                <span>{pooja.name}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Travel Details Section */}
        <div className="travel-details-card">
          <h4>Travel Details</h4>

          <div className="travel-details-content">

            {/* Trip Duration */}
            <div className="travel-field">
              <label className="field-label">
                Trip Duration
              </label>

              <select
                value={tripDuration}
                onChange={(e) => setTripDuration(e.target.value)}
              >
                <option value="1 Day">1 Day</option>
                <option value="2 Days">2 Days</option>
                <option value="3 Days">3 Days</option>
                <option value="4 Days">4 Days</option>
                <option value="5 Days">5 Days</option>
                <option value="6 Days">6 Days</option>
                <option value="7 Days">7 Days</option>
              </select>
            </div>


            {/* Cab Required */}
            <div className="travel-field">

              <label className="field-label">
                Cab Required?
              </label>

              <div className="travel-radio-list">

                <label>
                  <input
                    type="radio"
                    name="cabRequired"
                    value="No"
                    checked={cabRequired === "No"}
                    onChange={(e) => {
                      setCabRequired(e.target.value);
                      setCabType("");
                    }}
                  />

                  <span>No</span>
                </label>


                <label>
                  <input
                    type="radio"
                    name="cabRequired"
                    value="Yes"
                    checked={cabRequired === "Yes"}
                    onChange={(e) => setCabRequired(e.target.value)}
                  />

                  <span>Yes</span>
                </label>

              </div>
            </div>


            {/* Cab Type */}

            {cabRequired === "Yes" && (

              <div className="travel-field">

                <label className="field-label">
                  Cab Type
                </label>

                <div className="travel-radio-list">

                  <label>
                    <input
                      type="radio"
                      name="cabType"
                      value="Sedan"
                      checked={cabType === "Sedan"}
                      onChange={(e) => setCabType(e.target.value)}
                    />

                    <span>Sedan (4 Seater)</span>
                  </label>


                  <label>
                    <input
                      type="radio"
                      name="cabType"
                      value="SUV"
                      checked={cabType === "SUV"}
                      onChange={(e) => setCabType(e.target.value)}
                    />

                    <span>SUV (7 Seater)</span>
                  </label>

                </div>

              </div>

            )}

            {/* Hotel Required */}
            <div className="travel-field">
              <label className="field-label">
                Need Hotel?
              </label>

              <div className="travel-radio-list">
                <label>
                  <input
                    type="radio"
                    name="needHotel"
                    value="No"
                    checked={needHotel === "No"}
                    onChange={(e) => {
                      setNeedHotel(e.target.value);
                      setRoomType("");
                    }}
                  />

                  <span>No</span>
                </label>

                <label>
                  <input
                    type="radio"
                    name="needHotel"
                    value="Yes"
                    checked={needHotel === "Yes"}
                    onChange={(e) => setNeedHotel(e.target.value)}
                  />

                  <span>Yes</span>
                </label>
              </div>
            </div>


            {/* Hotel Details */}

            {needHotel === "Yes" && (
              <>
                {/* Room Type */}

                <div className="travel-field">
                  <label className="field-label">
                    Room Type
                  </label>

                  <div className="travel-radio-list">
                    <label>
                      <input
                        type="radio"
                        name="roomType"
                        value="Standard"
                        checked={roomType === "Standard"}
                        onChange={(e) => setRoomType(e.target.value)}
                      />

                      <span>Standard</span>
                    </label>

                    <label>
                      <input
                        type="radio"
                        name="roomType"
                        value="Deluxe"
                        checked={roomType === "Deluxe"}
                        onChange={(e) => setRoomType(e.target.value)}
                      />

                      <span>Deluxe</span>
                    </label>

                    <label>
                      <input
                        type="radio"
                        name="roomType"
                        value="Premium"
                        checked={roomType === "Premium"}
                        onChange={(e) => setRoomType(e.target.value)}
                      />

                      <span>Premium</span>
                    </label>
                  </div>
                </div>


                {/* Guests */}

                <div className="travel-field">
                  <label className="field-label">
                    Guests
                  </label>

                  <div className="guest-counter-list">

                    {/* Adults */}

                    <div className="guest-counter">
                      <span className="guest-label">
                        Adults
                      </span>

                      <div className="counter-controls">
                        <button
                          type="button"
                          onClick={() =>
                            setAdults((prev) => Math.max(1, prev - 1))
                          }
                          disabled={adults <= 1}
                        >
                          −
                        </button>

                        <span className="counter-value">
                          {adults}
                        </span>

                        <button
                          type="button"
                          onClick={() =>
                            setAdults((prev) => prev + 1)
                          }
                        >
                          +
                        </button>
                      </div>
                    </div>


                    {/* Children */}

                    <div className="guest-counter">
                      <span className="guest-label">
                        Children
                      </span>

                      <div className="counter-controls">
                        <button
                          type="button"
                          onClick={() =>
                            setChildren((prev) => Math.max(0, prev - 1))
                          }
                          disabled={children <= 0}
                        >
                          −
                        </button>

                        <span className="counter-value">
                          {children}
                        </span>

                        <button
                          type="button"
                          onClick={() =>
                            setChildren((prev) => prev + 1)
                          }
                        >
                          +
                        </button>
                      </div>
                    </div>

                  </div>
                </div>
              </>
            )}

          </div>
        </div>

        {/* Extra Services Section */}
        <div className="extra-services-card">
          <h4>Extra Services</h4>

          <div className="extra-services-list">
            {[
              "Local Guide",
              "VIP Darshan Assistance",
              "Pickup from Railway Station",
              "Pickup from Airport",
              "Photography",
              "Prasad Arrangement",
            ].map((service) => (
              <label key={service}>
                <input
                  type="checkbox"
                  checked={selectedExtraServices.includes(service)}
                  onChange={() => handleExtraServiceSelect(service)}
                />

                <span>{service}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Contact Details Section */}
        <div className="contact-details-card">
          <h4>Contact Details</h4>

          <div className="contact-details-content">

            {/* Travel Date */}
            <div className="contact-field">
              <label className="field-label">
                Travel Date
              </label>

              <input
                type="date"
                value={travelDate}
                min={new Date().toISOString().split("T")[0]}
                onChange={(e) => setTravelDate(e.target.value)}
              />
            </div>


            {/* Number of Travellers */}
            <div className="contact-field">
              <label className="field-label">
                Number of Travellers
              </label>

              <div className="travellers-counter">
                <button
                  type="button"
                  onClick={() =>
                    setNumberOfTravellers((prev) =>
                      Math.max(1, prev - 1)
                    )
                  }
                  disabled={numberOfTravellers <= 1}
                >
                  −
                </button>

                <span className="travellers-value">
                  {numberOfTravellers}
                </span>

                <button
                  type="button"
                  onClick={() =>
                    setNumberOfTravellers((prev) => prev + 1)
                  }
                >
                  +
                </button>
              </div>
            </div>


            {/* Special Request */}
            <div className="contact-field">
              <label className="field-label">
                Special Request
              </label>

              <textarea
                rows="5"
                placeholder="Enter any special request or additional requirements..."
                value={specialRequest}
                onChange={(e) => setSpecialRequest(e.target.value)}
              />
            </div>

          </div>
        </div>
            
        {/* Continue Button */}
        <div className="planner-continue-section">
          <button
            type="button"
            className="continue-btn"
            disabled={!selectedPlaces.length && !selectedPoojas.length}
            onClick={handleContinue}
          >
            Continue
          </button>
        </div>

      </div>
    </div>
  );
};

export default CustomDarshanPlanner;