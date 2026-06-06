import "./DarshanPackages.scss";
import { FaMapMarkerAlt, FaCar, FaUserTie, FaClock } from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";
import DarshanCard from "../DarshanCards/DarshanCard/DarshanCard";

const packages = [
  {
    image: "/src/assets/images/dershan1.png",
    title: "Ujjain Darshan",
    duration: "1 Day",
    temple: "Mahakaleshwar, Harsiddhi, Mangalnath",
    price: "1999"
  },
  {
    image: "/src/assets/images/ujjain2.png",
    title: "Kal Bhairav",
    duration: "Half Day",
    temple: "Shri Kal Bhairav Temple",
    price: "899"
  },
  {
    image: "/src/assets/images/ujjain3.png",
    title: "Omkareshwar",
    duration: "1 Day",
    temple: "Omkareshwar Jyotirlinga",
    price: "2499"
  },
  {
    image: "/src/assets/images/ujjain4.png",
    title: "Baglamukhi",
    duration: "Half Day",
    temple: "Maa Baglamukhi Temple",
    price: "1299"
  },
  {
    image: "/src/assets/images/ujjain5.png",
    title: "Custom Planner",
    duration: "Flexible",
    temple: "Create your own itinerary",
    price: "Custom",
    isCustom: true
  }
];

const DarshanPackages = () => {
  return (
    <section className="darshan-packages-section">

      <div className="container">

        <div className="darshan-packages-header">
          <h2>
            Top Darshan <span>Packages</span>
          </h2>

           <a href="/darshan-packages" className="view-all-link">
            View All Packages
            <FiArrowRight />
          </a>

          {/* <p>
            Choose from our popular darshan packages or create your own plan.
          </p> */}
        </div>

        <div className="darshan-packages-grid">

          {packages.map((item, index) => (
            <DarshanCard
              key={index}
              item={item}
            />
          ))}

        </div>

        <div className="darshan-package-benefits">

          <div>
            <FaMapMarkerAlt />
            All Packages Include
          </div>

          <div>
            <FaCar />
            Cab
          </div>

          <div>
            <FaUserTie />
            Guide
          </div>

          <div>
            <FaUserTie />
            Puja Assistance
          </div>

        </div>

      </div>

    </section>
  );
};

export default DarshanPackages;