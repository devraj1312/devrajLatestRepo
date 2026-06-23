import "./InquiryForm.scss";
import heroImg from "/src/assets/images/darshan1.png";
import { FaPaperPlane, FaPhoneAlt } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const InquiryForm = () => {
  const { state } = useLocation();

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

  }, [state]);

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

          <div className="inquiry-card">

            <div className="card-header">

              <div className="icon-box">
                <FaPaperPlane />
              </div>

              <div>
                <h2>Send Us Your Inquiry</h2>
                <p>
                  We will get back to you as soon as possible.
                </p>
              </div>

            </div>

            <form>

              <div className="form-group">
                <label>Full Name</label>

                <input
                  type="text"
                  placeholder="Enter your full name"
                />
              </div>

              <div className="form-group">
                <label>Phone Number</label>

                <div className="phone-input">
                  <FaPhoneAlt />
                  <input
                    type="tel"
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Category</label>

                <input
                    type="text"
                    value={category}
                    readOnly
                    placeholder="Category"
                />
              </div>

              <div className="form-group">
                <label>Description</label>

                <textarea
                    rows="6"
                    value={description}
                    readOnly
                    onChange={(e) =>
                    setDescription(e.target.value)
                    }
                    placeholder="Enter your message here..."
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