import "./DarshanPackages.scss";
import { FaMapMarkerAlt, FaCar, FaUserTie, FaClock } from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";
import DarshanCard from "../DarshanCards/DarshanCard/DarshanCard";
import { darshanData } from "../../data/darshanData";
import cstmImage from "../../assets/images/ujjain10.png";

const DarshanPackages = () => {
  const normalPackages = darshanData
    .filter(item => !item.isCustom)
    .slice(0, 4);

  const customPackage = darshanData.find(
    item => item.isCustom
  );

  const homePackages = [
    ...normalPackages,
    ...(customPackage ? [customPackage] : [])
  ];

  return (
    <section className="darshan-packages-section">

      <div className="container">

        <div className="darshan-packages-header">
          <h2>
            Top Darshan <span>Packages</span>
          </h2>

           <a href="/darshan" className="view-all-link">
            View All
            <FiArrowRight />
          </a>

          {/* <p>
            Choose from our popular darshan packages or create your own plan.
          </p> */}
        </div>

        <div className="darshan-packages-grid">

          {darshanData.slice(0, 4).map((item) => (
            <DarshanCard
              key={item.id}
              item={item}
            />
          ))}

          {/* Custom Card */}
          <DarshanCard
            item={{
              image: cstmImage,
              name: "Custom Darshan Planner",
              duration: "Flexible",
              price: "Custom",
              isCustom: true,
            }}
          />

        </div>

        <div className="darshan-package-benefits">

          <div>
            <FaMapMarkerAlt />
            Darshan
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
            Puja
          </div>

        </div>

      </div>

    </section>
  );
};

export default DarshanPackages;