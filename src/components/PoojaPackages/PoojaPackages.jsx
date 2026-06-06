import "./PoojaPackages.scss";
import { FiArrowRight } from "react-icons/fi";
import PoojaCard from "../PoojaCards/PoojaCard/PoojaCard";

const poojaPackages = [
  {
    image: "/src/assets/images/pooja1.png",
    name: "Mahakaleshwar Bhasma Aarti",
    price: "5100",
    duration: "2-3 Hours",
  },
  {
    image: "/src/assets/images/pooja1.png",
    name: "Mangal Dosh Nivaran Pooja",
    price: "4500",
    duration: "2-3 Hours",
  },
  {
    image: "/src/assets/images/pooja1.png",
    name: "Rudrabhishek Pooja",
    price: "3100",
    duration: "3-4 Hours",
  },
  {
    image: "/src/assets/images/pooja1.png",
    name: "Kal Sarp Dosh Pooja",
    price: "2500",
    duration: "1-2 Hours",
  },
  {
    title: "Custom Pooja",
    description: "Create your own pooja as per your needs.",
    isCustom: true,
  },
];

const PoojaPackages = () => {
  return (
    <section className="pooja-packages">

      <div className="container">

        <div className="pooja-header">

          <h2>
            Top Pooja <span>Packages</span>
          </h2>

          <a href="/pooja-packages" className="view-all-link">
            View All Pooja
            <FiArrowRight />
          </a>

        </div>

        <div className="pooja-grid">

          {poojaPackages.map((item) =>

            item.isCustom ? (

              <div
                key="custom-pooja"
                className="custom-card"
              >

                <div className="custom-content">

                  <div className="custom-icon">
                    🕉️
                  </div>

                  <h3>Custom Pooja</h3>

                  <p>
                    Create your own pooja
                    as per your needs.
                  </p>

                  <button>
                    Customize
                    <FiArrowRight />
                  </button>

                </div>

              </div>

            ) : (

              <PoojaCard
                key={item.id}
                pooja={item}
                buttonText="Book Now"
              />

            )

          )}

        </div>

      </div>

    </section>
  );
};

export default PoojaPackages;
