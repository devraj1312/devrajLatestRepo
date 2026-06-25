import "./Home.scss";
import "../../components/AutocompleteInput.scss";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { FaArrowRight } from "react-icons/fa";
// import HotelCard from "../../components/HotelCard";
// import CabCard from "../../components/CabCard";
import { getCabs } from "../../services/cabService";
import { getHotels } from "../../services/hotelService";
import HeroSection from "../../components/HeroSection/HeroSection";
import SpiritualServices from "../../components/SpiritualServices/SpiritualServices";
import WhyChooseUs from "../../components/WhyChooseUs/WhyChooseUs";
import DarshanPackages from "../../components/DarshanPackages/DarshanPackages";
import PoojaPackages from "../../components/PoojaPackages/PoojaPackages";
import CabStaySection from "../../components/CabStaySection/CabStaySection";
import Testimonials from "../../components/Testimonials/Testimonials";


const Home = () => {
  const navigate = useNavigate();
  const [cabTypes, setCabTypes] = useState([]);
  const [cabLoading, setCabLoading] = useState(true);

  const [hotels, setHotels] = useState([]);
  const [hotelLoading, setHotelLoading] = useState(true);

  const [travelDate, setTravelDate] = useState("");
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropLocation, setDropLocation] = useState("");
  const [hotelLocation, setHotelLocation] = useState("");
  
  useEffect(() => {
    const loadCabs = async () => {
      try {
        const data = await getCabs();

        const included = data.included || [];

        const getTypeLabel = (item) => {
          const relId = item.relationships?.field_type?.data?.id;

          const term = included?.find(
            (inc) => inc.id === relId
          );

          return term?.attributes?.name || "N/A";
        };

        const formattedData = data.data.map((item) => {
          const imageId =
            item.relationships?.field_cab_image?.data?.id;

          const imageFile = included.find(
            (inc) => inc.id === imageId
          );

          const imageUrl = imageFile
            ? `${import.meta.env.VITE_API_URL}${imageFile.attributes.uri.url}`
            : "https://dummyimage.com/600x400/000/fff&text=Cab";

          return {
            id: item.id,
            name: item.attributes?.title || "No Name",
            type: getTypeLabel(item),
            description: item.attributes?.body?.value || "",
            capacity: item.attributes?.field_capacity || 0,
            price: item.attributes?.field_price_per_km || 0,
            image: imageUrl,
          };
        });

        setCabTypes(formattedData);
      } catch (err) {
        console.error(err);
      } finally {
        setCabLoading(false);
      }
    };

    loadCabs();
  }, []);

  useEffect(() => {
    const loadHotels = async () => {
      try {
        const data = await getHotels();

        if (!data || !data.data) {
          setHotels([]);
          return;
        }

        const included = data.included || [];

        const formattedData = data.data.map((item) => {
          const imageIds =
            item.relationships?.field_hotel_image?.data || [];

          const images = imageIds
            .map((rel) => {
              const file = included.find(
                (inc) =>
                  inc.type === "file--file" &&
                  inc.id === rel.id
              );

              return file?.attributes?.uri?.url
                ? `${import.meta.env.VITE_API_URL}${file.attributes.uri.url}`
                : null;
            })
            .filter(Boolean);

          return {
            id: item.id,
            name: item.attributes?.title || "No Name",
            location: item.attributes?.field_location || "",
            price: item.attributes?.field_base_price || 0,
            rating: Number(
              parseFloat(item.attributes?.field_rating || 0).toFixed(1)
            ),
            image:
              images[0] ||
              "https://dummyimage.com/600x400/000/fff&text=Hotel",
            images,
          };
        });
        setHotels(formattedData);
      } catch (err) {
        console.error(err);
        setHotels([]);
      } finally {
        setHotelLoading(false);
      }
    };

    loadHotels();
  }, []);

  const handleCabSearch = () => {
    if (!travelDate || !pickupLocation || !dropLocation) {
      alert("Please fill all cab search fields");
      return;
    }

    navigate("/cabs", {
      state: {
        searchData: {
          travelDate,
          pickupLocation,
          dropLocation,
        },
      },
    });
  };

  return (
    <>
      {/* Hero Section */}
      <HeroSection
        handleCabSearch={handleCabSearch}
        travelDate={travelDate}
        setTravelDate={setTravelDate}
        pickupLocation={pickupLocation}
        setPickupLocation={setPickupLocation}
        dropLocation={dropLocation}
        setDropLocation={setDropLocation}
        hotelLocation={hotelLocation}
        setHotelLocation={setHotelLocation}
      />

      {/* Spiritual Section */}
      <SpiritualServices />

      {/* WhyChoose Section */}
      <WhyChooseUs />
      
      {/* Darshan Section */}
      <DarshanPackages />

      {/* Pooja Section */}
      <PoojaPackages />

      {/* Cab-Stay Section */}
      <CabStaySection />

      {/* Testimonials Section */}
      <Testimonials />

    </>
  );
};

export default Home;