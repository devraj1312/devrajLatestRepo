import { FiArrowRight } from "react-icons/fi";
import { FaStar, FaUserCircle } from "react-icons/fa";
import "./Testimonials.scss";

const reviews = [
  {
    emoji: "😀",
    name: "Rahul Sharma",
    review:
      "Amazing experience! The darshan arrangements were excellent and our trip was very peaceful.",
    rating: 5,
  },
  {
    emoji: "🙏",
    name: "Priya Verma",
    review:
      "Well-organized trip and pooja was beautifully arranged. Highly recommended!",
    rating: 5,
  },
  {
    emoji: "😍",
    name: "Amit Patel",
    review:
      "Great service and support throughout the journey. Will book again!",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section className="testimonials-section">
      <div className="container">

        <div className="testimonials-header">
          <h2>
            What Our <span>Travelers Say</span>
          </h2>

          <a href="/about" className="view-all-link">
            View All
            <FiArrowRight />
          </a>
        </div>

        <div className="testimonials-grid">

          {reviews.map((item, index) => (
            <div className="testimonial-card" key={index}>

              <div className="testimonial-top">

                <div className="emoji">
                  <FaUserCircle />
                </div>

                <div>
                  <h4>{item.name}</h4>

                  <div className="rating">
                    {[...Array(item.rating)].map((_, i) => (
                      <FaStar key={i} />
                    ))}
                    <span>5.0</span>
                  </div>
                </div>

              </div>

              <p>{item.review}</p>

            </div>
          ))}

        </div>

        {/* <div className="testimonial-dots">
          <span className="active"></span>
          <span></span>
          <span></span>
        </div> */}

      </div>
    </section>
  );
};

export default Testimonials;