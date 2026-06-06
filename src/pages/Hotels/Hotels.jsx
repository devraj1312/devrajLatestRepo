import { useState, useMemo } from "react";
import "./Hotels.scss";
import HotelCard from "../../components/HotelCard/HotelCard";
import { useEffect } from "react";
import { getHotels } from "../../services/hotelService";
import HotelSearch from "../../components/search/HotelSearch/HotelSearch";

const Hotels = () => {
  

  const [priceRange, setPriceRange] = useState([0, 12000]);
  const [minRating, setMinRating] = useState(0);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hotelLocation, setHotelLocation] = useState("");

  const LOCATIONS = [...new Set(hotels.map((h) => h.location))];

  const toggleLocation = (loc) => {
    setSelectedLocations((prev) =>
      prev.includes(loc)
        ? prev.filter((l) => l !== loc)
        : [...prev, loc]
    );
  };

  const filtered = useMemo(() => {
    return hotels.filter((h) => {
      if (h.price < priceRange[0] || h.price > priceRange[1]) return false;
      if (h.rating < minRating) return false;
      if (
        selectedLocations.length > 0 &&
        !selectedLocations.includes(h.location)
      )
        return false;
      return true;
    });
  }, [hotels, priceRange, minRating, selectedLocations]);

  const clearFilters = () => {
    setPriceRange([0, 12000]);
    setMinRating(0);
    setSelectedLocations([]);
  };

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
          const imageData =
            item.relationships?.field_hotel_image?.data;

          const imageIds = Array.isArray(imageData)
            ? imageData
            : imageData
            ? [imageData]
            : [];

          const images = imageIds
            .map((rel) => {
              const file = included.find(
                (inc) =>
                  inc.type === "file--file" && inc.id === rel.id
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
        setLoading(false);
      }
    };

    loadHotels();
  }, []);

  return (
    <>
      {/* HERO */}
      <section className="hotels-hero">
        <img
          src="/src/assets/images/hotel5.png"
          alt="Hotels in Ujjain"
        />

        <div className="hero-overlay">

          <div className="container">
            <div className="hero-content">

              <span className="hero-tag">
                Luxury  • Comfort  • Convenience
              </span>

              <h1>
                Find Your Perfect Stay
              </h1>

              <p>
                Explore premium hotels near temples,
                transport hubs and major attractions.
              </p>

            </div>

             <HotelSearch
              hotelLocation={hotelLocation}
              setHotelLocation={setHotelLocation}
            />

          </div>
        </div>
      </section>

      {/* HOTELS */}
      <div className="container">
        <div className="hotels-page">
          {/* <h2>Discover Your <span>Perfect Stay</span></h2>  */}
          <div className="hotels-layout">

            {/* Sidebar */}
            <aside className="filters">

              <div className="filter-box">

                <div className="filter-header">
                  <h3>Filters</h3>

                  <button onClick={clearFilters}>
                    Clear all
                  </button>
                </div>

                <div className="filter-count">
                  {filtered.length} Hotels Available
                </div>

                {/* Price */}
                <div className="filter-group">

                  <label>
                    Price Range: ₹{priceRange[0]} – ₹{priceRange[1]}
                  </label>

                  <input
                    type="range"
                    min="1800"
                    max="6000"
                    value={priceRange[1]}
                    onChange={(e) =>
                      setPriceRange([0, Number(e.target.value)])
                    }
                  />

                </div>

                {/* Rating */}
                <div className="filter-group">

                  <label>Minimum Rating</label>

                  <div className="rating-buttons">

                    {[0, 3.5, 4, 4.5].map((r) => (
                      <button
                        key={r}
                        className={minRating === r ? "active" : ""}
                        onClick={() => setMinRating(r)}
                      >
                        {r === 0 ? "All" : `${r}+`}
                      </button>
                    ))}

                  </div>

                </div>

                {/* Location */}
                <div className="filter-group location-filter">

                  <label>Location</label>

                  <div className="location-list">

                    {LOCATIONS.map((loc) => (
                      <label key={loc}>

                        <input
                          type="checkbox"
                          checked={selectedLocations.includes(loc)}
                          onChange={() => toggleLocation(loc)}
                        />

                        <span>{loc}</span>

                      </label>
                    ))}

                  </div>

                </div>

              </div>

            </aside>

            {/* Hotels Grid */}
            <div className="hotels-grid">
              <h2>Discover Your <span>Perfect Stay</span></h2>

              {loading ? (
                <p>Loading hotels...</p>
              ) : filtered.length > 0 ? (
                filtered.map((hotel) => (
                  <HotelCard
                    key={hotel.id}
                    hotel={hotel}
                  />
                ))
              ) : (
                <p className="no-data">
                  No hotels match your filters
                </p>
              )}

            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default Hotels;