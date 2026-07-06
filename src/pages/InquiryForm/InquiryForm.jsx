import "./InquiryForm.scss";
import heroImg from "/src/assets/images/darshan1.png";
import { FaPaperPlane, FaPhoneAlt } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { submitInquiry } from "../../services/inquiryService";
import {
  showSuccess,
  showError,
  showWarning,
} from "../../utils/toast";

const InquiryForm = () => {
  const { state } = useLocation();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const orderAmount = state?.totalAmount || 0;

  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [bookingId, setBookingId] = useState("");

  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    setCategory(state?.category || "");

    // Custom Trip Planner
    if (state?.description) {
      setDescription(state.description);
      return;
    }

    // Darshan
    if (state?.selectedPackages?.length) {
      const packageList = state.selectedPackages
        .map(
          (item) =>
            `${item.name} - ₹${item.price}`
        )
        .join("\n");

      setDescription(
        `Selected Darshan Packages:\n${packageList}\n\nTotal Amount: ₹${state.totalAmount}`
      );

      return;
    }

    // Pooja
    if (state?.selectedPoojas?.length) {
      const poojaList = state.selectedPoojas
        .map(
          (item) =>
            `${item.name} - ₹${item.price}`
        )
        .join("\n");

      setDescription(
        `Selected Poojas:\n${poojaList}\n\nTotal Amount: ₹${state.totalAmount}`
      );

      return;
    }

    // Cab Booking
    if (state?.selectedCab) {
      setDescription(
        `Selected Cab: ${state.selectedCab.name}

        Pickup Location: ${state.pickup}

        Drop Location: ${state.drop}

        Rate: ₹${state.selectedCab.price}/km`
      );

      return;
    }

    // Agar direct inquiry form open ho
    setDescription("");

  }, [state]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !phone || !date || !time) {
      showWarning("Please fill all required fields");
      return;
    }

    try {
      const data = await submitInquiry({
        name,
        number: phone,
        category: category.toLowerCase(),
        event_date: date,
        event_time: time,
        description,
        order_amount: state?.totalAmount || 0,
      });

      if (data?.status === "success") {
        // showSuccess(
        //   `Inquiry Submitted Successfully\nClient ID: ${data.client_id}`
        // );
        setBookingId(data.client_id);
        setShowSuccessPopup(true);

        setName("");
        setPhone("");
        setDate("");
        setTime("");
        setDescription("");
        setCategory("");
      } else {
        showError(data?.message || "Submission failed");
      }
    } catch (err) {
      console.error(err);

      const data = err?.response?.data;

      showError(data?.message || "Server Error");
    }
  };

  const navigate = useNavigate();

  const handlePopupDone = () => {
    setShowSuccessPopup(false);
    navigate("/");
  };

  return (
    <>
      {/* Hero Section */}
      <section className="inquiry-hero">
        <img
          src={heroImg}
          alt="Inquiry Form"
        />

        <div className="hero-overlay">
          <div className="container">

            <div className="hero-content">
              <span className="hero-tag">
                Support • Travel Assistance • Booking Help
              </span>

              <h1>Inquiry Form</h1>

              <p>
                Send us your inquiry and our team will get
                back to you as soon as possible.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="inquiry-section">
        <div className="container">

          <div className="inquiry-heading">
            <div className="heading-top">
              <div className="icon-box">
                <FaPaperPlane />
              </div>

              <h2>Submit Your Booking Request</h2>
            </div>

            <p>
              We will get back to you as soon as possible.
            </p>
          </div>

          <div className="inquiry-card">
            <form onSubmit={handleSubmit} >
              <div className="form-row two-col">
                <div className="inquiry-form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="inquiry-form-group">
                  <label>Phone Number</label>

                  <div className="phone-input">
                    <FaPhoneAlt />
                    <input
                      type="tel"
                      placeholder="Enter your phone number"
                      value={phone}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, ""); 
                        setPhone(value.slice(0, 10)); 
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="form-row three-col">
                <div className="inquiry-form-group">
                  <label>Category</label>
                  <input
                    type="text"
                    value={category}
                    readOnly
                  />
                </div>

                <div className="inquiry-form-group">
                  <label>Date</label>
                  <input 
                    type="date"
                    value={date}
                    min={new Date().toISOString().split("T")[0]}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>

                <div className="inquiry-form-group">
                  <label>Time</label>

                  <select
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                  >
                    <option value="">Select Time</option>
                    <option value="Morning">Morning</option>
                    <option value="Afternoon">Afternoon</option>
                    <option value="Evening">Evening</option>
                  </select>
                </div>
              </div>

              <div className="inquiry-form-group">
                <label>Description</label>

                <textarea
                  rows="10"
                  value={description}
                  readOnly              
                />
              </div>

              <button
                type="submit"
                className="submit-btn"
              >
                Submit <FaPaperPlane />
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Inquiry Success Popup */}
      {showSuccessPopup && (
        <div
          className="inquiry-success-overlay"
          onClick={() => setShowSuccessPopup(false)}
        >
          <div
            className="inquiry-success-popup"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="success-checkmark">
              ✓
            </div>

            <h2>Inquiry Submitted!</h2>

            <p className="success-message">
              Your inquiry has been submitted successfully.
              Our team will contact you shortly.
            </p>

            <div className="booking-id-box">
              <span className="booking-label">
                Your Booking ID
              </span>

              <strong>
                {bookingId}
              </strong>
            </div>

            <p className="booking-note">
              Please save your Booking ID for future reference.
            </p>

            <button
              type="button"
              className="popup-done-btn"
              onClick={handlePopupDone}
            >
              Done
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default InquiryForm;