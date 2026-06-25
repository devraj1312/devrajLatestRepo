import "./InquiryForm.scss";
import heroImg from "/src/assets/images/darshan1.png";
import { FaPaperPlane, FaPhoneAlt } from "react-icons/fa";
import { useLocation } from "react-router-dom";
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

  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    setCategory(state?.category || "");

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
        showSuccess(
          `Inquiry Submitted Successfully\nClient ID: ${data.client_id}`
        );

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

              <h2>Send Us Your Inquiry</h2>
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
                        const value = e.target.value.replace(/\D/g, ""); // sirf numbers
                        setPhone(value.slice(0, 10)); // max 10 digits
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
                  rows="6"
                  value={description}
                  readOnly              
                  onChange={(e) =>
                    setDescription(e.target.value)
                  }
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
    </>
  );
};

export default InquiryForm;