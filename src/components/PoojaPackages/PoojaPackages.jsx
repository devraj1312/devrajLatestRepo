import "./PoojaPackages.scss";
import { FiArrowRight } from "react-icons/fi";
import PoojaCard from "../PoojaCards/PoojaCard/PoojaCard";
import { useNavigate } from "react-router-dom";
import { poojaData } from "../../data/poojaData";

const PoojaPackages = () => {

  const navigate = useNavigate();

  // Sirf first 4 pooja show karne hain
  const poojaPackages = poojaData.slice(0, 4);

  return (
    <section className="pooja-packages">
      <div className="container">
        <div className="pooja-header">
          <h2>
            Top Pooja <span>Packages</span>
          </h2>

          <a href="/pooja" className="view-all-link">
            View All
            <FiArrowRight />
          </a>
        </div>
        
        <div className="pooja-grid">
          {poojaPackages.map((item) => (
            <PoojaCard
              key={item.id}
              pooja={item}
              buttonText="Book Now"
            />
          ))}

          {/* Custom Card */}
          <div className="custom-card">
            <div className="custom-content">
              <div className="custom-icon">🕉️</div>

              <h3>Custom Pooja</h3>

              <p>
                Create your own pooja
                as per your needs.
              </p>

              <button
                onClick={() => navigate("/custom-darshan-planner")}
              >
                Customize
                <FiArrowRight />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PoojaPackages;
