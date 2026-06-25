import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { FaCar, FaMapMarkerAlt, FaCalendarAlt, FaClock } from "react-icons/fa";
import CabCard from "../../components/CabCard/CabCard";
import "./Cabs.scss";
import { bookCab, getCabs } from "../../services/cabService";
// import { showSuccess, showError, showWarning } from "../../utils/toast";
import AutocompleteInput from "../../components/AutocompleteInput";
import CabSearch from "../../components/search/CabSearch/CabSearch";


const Cabs = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const BASE_URL = import.meta.env.VITE_API_URL;
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [selectedCab, setSelectedCab] = useState(null);
  const [cabTypes, setCabTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  // const isLoggedIn = localStorage.getItem("token");
  const formRef = useRef(null);

  const [pickupLocation, setPickupLocation] = useState("");
  const [dropLocation, setDropLocation] = useState("");
  const [travelDate, setTravelDate] = useState("");


  // ✅ LOAD saved form (first render)
  useEffect(() => {
    const searchData = location.state?.searchData;

    if (searchData) {
      setPickup(searchData.pickupLocation || "");
      setDrop(searchData.dropLocation || "");
      setDate(searchData.travelDate || "");
    } else {
      const savedData = localStorage.getItem("cabForm");

      if (savedData) {
        const parsed = JSON.parse(savedData);

        setPickup(parsed.pickup || "");
        setDrop(parsed.drop || "");
        setDate(parsed.date || "");
        setTime(parsed.time || "");
      }
    }

    setIsLoaded(true);
  }, [location.state]);

  // ✅ SAVE form (after load only)
  // useEffect(() => {
  //   if (!isLoaded) return;
  //   const formData = { pickup, drop, date, time };
  //   localStorage.setItem("cabForm", JSON.stringify(formData));
  // }, [pickup, drop, date, time, isLoaded]);

  // ✅ Select cab from URL
  useEffect(() => {
    if (id && cabTypes.length > 0) {
      const cab = cabTypes.find((c) => c.id === id);
      if (cab) {
        setSelectedCab(cab);
      }
    }
  }, [id, cabTypes]);

  // const handleBookCab = async () => {
  //   const dateTime = `${date}T${time}:00`;
  //   const token = localStorage.getItem("token");

  //   if (!token) {
  //     showWarning("Please login to continue ⚠️");
  //     navigate("/login", {
  //       state: { from: `/cabs` },
  //     });
  //     return;
  //   }

  //   if (!pickup || !drop || !date || !time || !selectedCab) return;

  //   try {
  //     const data = await bookCab({
  //       cab_name: selectedCab.name,
  //       pickup,
  //       drop,
  //       date_time: dateTime,
  //     });

  //     if (data?.status === "success") {
  //       showSuccess(`Booking-ID: ${data.booking_id}`);
  //       // alert("Booking Confirmed! ID: " + data.booking_id);

  //       localStorage.removeItem("cabForm");
  //       setPickup("");
  //       setDrop("");
  //       setDate("");
  //       setTime("");
  //       setSelectedCab(null);
  //     } else {
  //       // alert(data?.message || "Booking failed");
  //       showError(data?.message || "Booking failed");
  //     }

  //   } catch (err) {
  //     console.error(err);
  //     // alert("Server error");

  //     const data = err?.response?.data;
  //     showError(data?.message || "Server error");
  //   }
  // };

  useEffect(() => {
    const fetchCabs = async () => {
      try {
        const data = await getCabs();

        if (!data || !data.data) {
          setCabTypes([]);
          setLoading(false);
          return;
        }

        const included = data.included || [];

        const formattedData = data.data.map((item) => {
          const imageId = item.relationships?.field_cab_image?.data?.id;

          const imageFile = included.find(
            (inc) => inc.id === imageId
          );

          const imageUrl = imageFile
            ? `${BASE_URL}${imageFile.attributes.uri.url}`
            : "https://dummyimage.com/600x400/000/fff&text=Cab";

          const getTypeLabel = (item, included) => {
            const relId = item.relationships?.field_type?.data?.id;

            const term = included?.find(
              inc => inc.id === relId
            );

            return term?.attributes?.name || "N/A";
          };

          return {
            id: item.id,
            name: item.attributes?.title || "No Name",
            type: getTypeLabel(item, included),
            description: item.attributes?.body?.value || "",
            capacity: item.attributes?.field_capacity || 0,
            price: item.attributes?.field_price_per_km || 0,
            image: imageUrl,
          };
        });

        setCabTypes(formattedData);
        setLoading(false);

      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchCabs();
  }, []);

  const handleInquiry = () => {
    navigate("/inquiry-form", {
      state: {
        category: "Cab",
        pickup,
        drop,
        date,
        time,
        selectedCab,
      },
    });
  };

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  if (loading) {
    return <h2 style={{ textAlign: "center" }}>Loading cabs...</h2>;
  }

  return (
    <>
      {/* Hero */}
      <section className="cabs-hero">
        <img
          src="/src/assets/images/cab5.png"
          alt="Cab Services in Ujjain"
        />

        <div className="hero-overlay">

          <div className="container">
            <div className="hero-content">

              <span className="hero-tag">
                Safe • Reliable • Affordable
              </span>

              <h1>
                Book Your Perfect Ride
              </h1>

              <p>
                Travel comfortably across Ujjain with trusted
                cab services for darshan, sightseeing and local trips.
              </p>

            </div>
            {/* <div className="cab-search-wrapper"> */}
              <CabSearch
                pickupLocation={pickupLocation}
                setPickupLocation={setPickupLocation}
                travelDate={travelDate}
                setTravelDate={setTravelDate}
                dropLocation={dropLocation}
                setDropLocation={setDropLocation}
              />
            {/* </div> */}

          </div>
        </div>
      </section>

      {/* Main Section */}
      <div className="container">
        <div className="cabs-page">
          <div className="cabs-layout">

            {/* Cab Grid */}
            <div className="cab-grid">
              <h2>
                Choose Your <span>Perfect Ride</span>
              </h2>

              {loading ? (
                <p>Loading cabs...</p>
              ) : (          
                  cabTypes.map((cab) => (
                    // <div
                    //   key={cab.id}
                    //   className={`cab-item ${
                    //     selectedCab?.id === cab.id
                    //       ? "selected"
                    //       : ""
                    //   }`}
                    //   onClick={() => {
                    //     setSelectedCab(cab);
                    //     navigate(`/cabs/${cab.id}`);
                    //   }}
                    // >
                    <div
                      className={`cab-item ${
                        selectedCab?.id === cab.id ? "selected" : ""
                      }`}
                      onClick={() => setSelectedCab(cab)}
                    >
                      {/* <CabCard cab={cab} /> */}
                      {/* <CabCard
                        cab={cab}
                        isSelected={selectedCab?.id === cab.id}
                        onSelect={() => {
                          setSelectedCab(cab);
                          navigate(`/cabs/${cab.id}`);
                        }}
                      /> */}
                      <CabCard
                        cab={cab}
                        isSelected={selectedCab?.id === cab.id}
                        onAdd={() => setSelectedCab(cab)}
                        onNext={scrollToForm}
                      />
                    </div>
                  ))
              )}
            </div>

          {/* Sidebar */}
            <aside className="cab-sidebar">
              {/* Ride Details Form */}
              <div className="cab-form"
              ref={formRef}>
                <h2>
                  <FaCar /> Ride Details
                </h2>

                <div className="form-group custom-width">
                  <label>Pickup Location</label>
                    <AutocompleteInput
                      placeholder="Location"
                      value={pickup}
                      setValue={setPickup}
                    />
                </div>

                <div className="form-group custom-width">
                  <label>Drop Location</label>
                    <AutocompleteInput
                      placeholder="Drop Location"
                      value={drop}
                      setValue={setDrop}
                    />
                </div>

                {/* <div className="form-group">
                  <label>Date</label>
                  <div className="input-box">
                    <FaCalendarAlt className="icon" />
                    <input
                      type="date"
                      min={new Date().toISOString().split("T")[0]} 
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Time</label>
                  <div className="input-box">
                    <FaClock className="icon" />
                    <input
                      type="time"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                    />
                  </div>
                </div> */}

                {selectedCab && (
                  <div className="selected-cab">
                    Selected: <strong>{selectedCab.name}</strong> — ₹
                    {selectedCab.price}/km
                  </div>
                )}

                {/* <button
                  className="book-btn"
                  onClick={handleBookCab}
                  disabled={!pickup || !drop || !date || !time || !selectedCab}
                >
                    {isLoggedIn ? "Submit" : "Login to Book"}
                </button> */}
                <button
                  className="book-btn"
                  onClick={handleInquiry}
                  disabled={!pickup || !drop || !selectedCab}
                >
                  Continue
                </button>

                <p className="note">
                  Fill all details and select a cab type
                </p>
              </div>

            </aside>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cabs;