import {
  FaGlobe,
  FaHeart,
  FaUser,
} from "react-icons/fa";
import WhyChooseUs from "../../components/WhyChooseUs/WhyChooseUs";
import bgImage from "../../assets/images/about-hero.png";
import Testimonials from "../../components/Testimonials/Testimonials";

import "./About.scss";

const About = () => {

  const journey = [
    {
      year: "2018",
      title: "Founded",
      text:
        "UjjainYatra was started to make Ujjain travel simple and hassle-free.",
    },
    {
      year: "2020",
      title: "50+ Hotel Partners",
      text:
        "Expanded our hotel network across Ujjain and nearby locations.",
    },
    {
      year: "2023",
      title: "Cab Services",
      text:
        "Launched cab booking services for temple tours and local travel.",
    },
    {
      year: "2026",
      title: "10,000+ Travelers",
      text:
        "Successfully served thousands of pilgrims and tourists.",
    },
  ];

  const teamMembers = [
    {
      name: "Rajesh Sharma",
      role: "Founder & CEO",
      text:
        "A passionate traveler and Ujjain native with 15+ years in the hospitality industry.",
    },
    {
      name: "Priya Patel",
      role: "Head of Operations",
      text:
        "Ensures every booking runs smoothly from check-in to check-out.",
    },
    {
      name: "Amit Verma",
      role: "Technology Lead",
      text:
        "Building seamless digital experiences for modern travelers.",
    },
    {
      name: "Sunita Joshi",
      role: "Customer Relations",
      text:
        "Dedicated to making every guest feel welcomed and valued.",
    },
  ];


  return (
    <div className="about-page">

      {/* HERO */}
      <section className="about-hero" style={{ backgroundImage: `url(${bgImage})` }}>
        {/* <img
          src="https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=1974&auto=format&fit=crop"
          alt="about"
        /> */}

        <div className="overlay">   </div>

        <div className="about-hero-content">
          <h1>
            About <span>UjjainYatra</span>
          </h1>

          <p>
            Your trusted companion for exploring the sacred
            city of Ujjain with the best hotels and rides.
          </p>
        </div>
     
      </section>

      {/* JOURNEY */}
      <section className="journey-section">
        <div className="section-title">
          <h2>Our <span>Journey</span></h2>

          <p>
            A quick look at our growth and milestones
          </p>
        </div>

        <div className="journey-grid">
          {journey.map((item, index) => (
            <div className="journey-card" key={index}>
              <span className="year">
                {item.year}
              </span>

              <h3>{item.title}</h3>

              <p>{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* WhyChoose Section */}
      <WhyChooseUs />

      {/* Testimonials Section */}
      <Testimonials />

      {/* TEAM */}
      <section className="team-section">
        <div className="section-title">
          <h2>Meet <span>Our Team</span></h2>

          <p>
            The passionate people behind UjjainYatra
            who work tirelessly to make your travel
            experience exceptional.
          </p>
        </div>

        <div className="team-grid">
          {teamMembers.map((member, index) => (
            <div className="team-card" key={index}>
              <div className="team-avatar">
                <FaUser />
              </div>

              <h3>{member.name}</h3>

              <span>{member.role}</span>

              <p>{member.text}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default About;