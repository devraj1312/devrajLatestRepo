import "./SpiritualServices.scss";

import {
  FaHotel,
  FaCar,
  FaPray,
  FaArrowRight,
  FaPlaceOfWorship,
} from "react-icons/fa";

import hotelImg from "../../assets/images/hotel1.png";
import cabImg from "../../assets/images/cab1.png";
import poojaImg from "../../assets/images/pooja1.png";
import dershanImg from "../../assets/images/dershan1.png";

const SpiritualServices = () => {

  return (
    <section className="spiritual-services">
      <div className="container">

        <div className="service-heading">

          <h2>
            Plan Your Complete
            <span> - Spiritual Journey</span>
          </h2>

          {/* <p>
            Book hotels, cabs, pooja and
            darshan services for a seamless
            Ujjain experience.
          </p> */}

        </div>

        <div className="service-grid">

          {/* HOTEL */}

          <div className="service-card">

            <div className="service-image">

              <img
                src={hotelImg}
                alt="Hotels"
              />

              <div className="service-icon">
                <FaHotel />
              </div>

            </div>

            <div className="service-content">

              <h3>Stay Services</h3>

              <p>
                Comfortable stays for your
                spiritual journey in Ujjain.
              </p>

              <button>
                View Hotels
                <FaArrowRight />
              </button>

            </div>

          </div>

          {/* CABS */}

          <div className="service-card">

            <div className="service-image">

              <img
                src={cabImg}
                alt="Cabs"
              />

              <div className="service-icon">
                <FaCar />
              </div>

            </div>

            <div className="service-content">

              <h3>Cab Services</h3>

              <p>
                Safe and reliable rides across
                temples and tourist places.
              </p>

              <button>
                Book Cabs
                <FaArrowRight />
              </button>

            </div>

          </div>

          {/* POOJA */}

          <div className="service-card">

            <div className="service-image">

              <img
                src={poojaImg}
                alt="Pooja"
              />

              <div className="service-icon">
                <FaPray />
              </div>

            </div>

            <div className="service-content">

              <h3>Pooja Services</h3>

              <p>
                Authentic rituals and pooja
                services by experienced pandits.
              </p>

              <button>
                Book Pooja
                <FaArrowRight />
              </button>

            </div>

          </div>

          {/* DARSHAN */}

          <div className="service-card">

            <div className="service-image">

              <img
                src={dershanImg}
                alt="Darshan"
              />

              <div className="service-icon">
                <FaPlaceOfWorship />
              </div>

            </div>

            <div className="service-content">

              <h3>Darshan Services</h3>

              <p>
                Curated temple darshan
                packages & spiritual tours.
              </p>

              <button>
                View Packages
                <FaArrowRight />
              </button>

            </div>

          </div>

        </div>
      </div>

    </section>
  );
};

export default SpiritualServices;