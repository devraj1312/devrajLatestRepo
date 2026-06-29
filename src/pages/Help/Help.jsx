// src/pages/Help/Help.jsx

import { useState } from "react";
import bgImage from "../../assets/images/hotel5.png";

import {
  FaHotel,
  FaCar,
  FaRupeeSign,
  FaUser,
  FaSearch,
  FaChevronDown
} from "react-icons/fa";
import { FiPhone, FiMail, FiMessageCircle } from "react-icons/fi";

import "./Help.scss";


const faqData = [
  {
    question: "How can I book a hotel in Ujjain?",
    answer:
      "Go to the Hotels page, select your preferred hotel, choose check-in and check-out dates, and complete your booking.",
  },
  {
    question: "How do I book a cab service?",
    answer:
      "Visit the Cabs page, enter pickup and drop locations, select your travel date, and choose your ride.",
  },
  {
    question: "Can I cancel my booking?",
    answer:
      "Yes, bookings can be cancelled depending on hotel or cab cancellation policies.",
  },
  {
    question: "How do refunds work?",
    answer:
      "Refunds are processed within 5–7 business days after successful cancellation approval.",
  },
];

const categories = [
  {
    icon: <FaHotel />,
    title: "Hotel Bookings",
    text: "Help with searching, booking, modifying, or cancelling hotel reservations.",
  },
  {
    icon: <FaCar />,
    title: "Cab Services",
    text: "Assistance with booking cabs, fare estimates, and ride-related queries.",
  },
  {
    icon: <FaRupeeSign />,
    title: "Payments & Refunds",
    text: "Questions about payment methods, billing, invoices, and refund processing.",
  },
  {
    icon: <FaUser />,
    title: "Account & Profile",
    text: "Help with account settings, login issues, and profile management.",
  },
];

const contactData = [
  {
    title: "Call Us",
    value: "+91 98765 43210",
    subtitle: "Available 24/7",
    icon: <FiPhone />,
  },
  {
    title: "Email Us",
    value: "support@ujjainyatra.com",
    subtitle: "Response within 2 hours",
    icon: <FiMail />,
  },
  {
    title: "Live Chat",
    value: "Chat with our team",
    subtitle: "Instant support online",
    icon: <FiMessageCircle />,
  },
];

const Help = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="help-page">

      {/* HERO */}
      <section className="help-hero" style={{ backgroundImage: `url(${bgImage})` }}>
        <div className="hero-overlay">
          <div className="help-hero-content">

            <h1>How Can <span>We Help?</span></h1>

            <p>
              Find answers to common questions, get support,
              or reach out to our team.
            </p>

            <div className="search-bar">
              <FaSearch />

              <input
                type="text"
                placeholder="Search for help topics..."
              />
            </div>

          </div>
        </div>
      </section>

      {/* CATEGORY SECTION */}
      <section className="help-categories">

        <div className="section-header">
          <h2>Browse by <span>Category</span></h2>
          <p>
            Find quick answers and support related to bookings,
            hotels, darshan services, payments and travel.
          </p>
        </div>

        <div className="category-grid">

          {categories.map((item, index) => (
            <div className="category-card" key={index}>

              <div className="icon-box">
                {item.icon}
              </div>

              <h3>{item.title}</h3>

              <p>{item.text}</p>

            </div>
          ))}

        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="faq-section">

        <div className="section-header center">
          <h2>Frequently Asked <span>Questions</span></h2>
          <p>
            Find answers to common questions about bookings,
            hotels, darshan packages, cab services and payments.
          </p>
        </div>

        <div className="faq-wrapper">

          {faqData.map((faq, index) => (
            <div
              key={index}
              className={`faq-item ${
                openIndex === index ? "active" : ""
              }`}
            >

              <button
                className="faq-question"
                onClick={() => toggleFAQ(index)}
              >
                <span>{faq.question}</span>

                <FaChevronDown />
              </button>

              <div className="faq-answer">
                <p>{faq.answer}</p>
              </div>

            </div>
          ))}

        </div>
      </section>

      {/* STILL NEED HELP */}
      <section className="contact-support-section">

        <div className="section-support-header center">
          <h2>Still Need <span>Help?</span></h2>

          <p>
            Our support team is available 24/7 to assist you.
          </p>
        </div>

        <div className="support-grid">

          {contactData.map((item, index) => (
            <div className="support-card" key={index}>

              <div className="support-icon">
                {item.icon}
              </div>

              <h3>{item.title}</h3>

              <h4>{item.value}</h4>

              <span>{item.subtitle}</span>

            </div>
          ))}

        </div>
      </section>

    </div>
  );
};

export default Help;