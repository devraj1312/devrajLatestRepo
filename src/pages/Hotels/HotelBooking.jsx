import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaMapMarkerAlt, FaStar, FaHotel } from "react-icons/fa";
import { getHotelById, getRoomsByHotel, bookHotel } from "../../services/hotelService";
import "./HotelBooking.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Thumbs, Autoplay } from "swiper/modules";
import Lightbox from "yet-another-react-lightbox";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/thumbs";
import "yet-another-react-lightbox/styles.css";

import { showSuccess, showError, showWarning } from "../../utils/toast";

const HotelBooking = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [selectedRoom, setSelectedRoom] = useState(null);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [adults, setAdults] = useState("");
  const [children, setChildren] = useState("");
  const [roomsCount, setRoomsCount] = useState("");

  const [hotel, setHotel] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [savedRoomId, setSavedRoomId] = useState(null);
  const isLoggedIn = localStorage.getItem("token");

  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [open, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

 const slides =
  hotel?.images?.map((img) => ({
    src: img,
  })) || [];

  // CALCULATIONS
  const getNights = () => {
    if (!checkIn || !checkOut) return 0;

    const start = new Date(checkIn);
    const end = new Date(checkOut);

    const diff = (end - start) / (1000 * 60 * 60 * 24);
    return diff > 0 ? diff : 0;
  };

  if (new Date(checkOut) <= new Date(checkIn)) {
    showError("Check-out must be after check-in ❌");
    return;
  } 

  const nights = getNights();

  const totalAmount =
    selectedRoom && nights > 0
      ? selectedRoom.price * nights * roomsCount
      : 0;

  // 🔥 FILTER STATE
  const [roomFilter, setRoomFilter] = useState("all");

  useEffect(() => {
    const savedData = localStorage.getItem("hotelForm");

    if (savedData) {
      const parsed = JSON.parse(savedData);

      setCheckIn(parsed.checkIn || "");
      setCheckOut(parsed.checkOut || "");
      setAdults(parsed.adults || 0);
      setChildren(parsed.children || 0);
      setRoomsCount(parsed.roomsCount || 0);
      setSavedRoomId(parsed.selectedRoomId || null);
    }

    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;

    const formData = {
      checkIn,
      checkOut,
      adults,
      children,
      roomsCount,
      selectedRoomId: selectedRoom?.id || null
    };
    localStorage.setItem("hotelForm", JSON.stringify(formData));
  }, [checkIn, checkOut, adults, children, roomsCount, selectedRoom, isLoaded]);

  useEffect(() => {
    if (savedRoomId && rooms.length > 0) {
      const room = rooms.find(r => r.id === savedRoomId);
      if (room) {
        setSelectedRoom(room);
      }
    }
  }, [savedRoomId, rooms]);

  const handleBook = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      showWarning("Please login to continue ⚠️");
      navigate("/login", {
        state: { from: `/hotels/${id}` },
      });
      return;
    }

    // if (!selectedRoom || !checkIn || !checkOut) return;
    if (!selectedRoom || !checkIn || !checkOut) {
      showError("Please fill all booking details.");
      return;
    }

    try {
      const data = await bookHotel({
        hotel_id: hotel.nid, // hotel node id
        room_type: selectedRoom.type,
        check_in_date: checkIn,
        check_out_date: checkOut,
        adults_count: adults,
        children_count: children,
        rooms_count: roomsCount,
        total_amount: selectedRoom.price * roomsCount,
      });

      if (data?.status === "success") {
        showSuccess(`Booking-ID: ${data.booking_id}`);
        // alert("Hotel Booking Confirmed! 🏨 ID: " + data.booking_id);

        // 🧹 Reset form
        setCheckIn("");
        setCheckOut("");
        setAdults("");
        setChildren("");
        setRoomsCount("");
        setSelectedRoom(null);

        // optional: local storage clear kro
        localStorage.removeItem("hotelForm");

      } else {
        // alert(data?.message || "Booking failed");
        showError(data?.message || "Booking failed");
      }
    } catch (err) {
      console.error(err);
      // alert("Server error");

      const data = err?.response?.data;
      showError(data?.message || "Server error");
    }
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const [hotelData, roomData] = await Promise.all([
          getHotelById(id),
          getRoomsByHotel(id),
        ]);

        // ===== HOTEL =====
        const hotelIncluded = hotelData.included || [];

        const imageData =
          hotelData.data.relationships?.field_hotel_image?.data;

        const imageIds = Array.isArray(imageData)
          ? imageData
          : imageData
          ? [imageData]
          : [];

        const images = imageIds
          .map((rel) => {
            const file = hotelIncluded.find(
              (inc) =>
                inc.type === "file--file" && inc.id === rel.id
            );

            return file?.attributes?.uri?.url
              ? `${import.meta.env.VITE_API_URL}${file.attributes.uri.url}`
              : null;
          })
          .filter(Boolean);

        setHotel({
          nid: hotelData.data.attributes?.drupal_internal__nid,
          name: hotelData.data.attributes?.title,
          location: hotelData.data.attributes?.field_location,
          rating: Number(
            parseFloat(
              hotelData.data.attributes?.field_rating || 0
            ).toFixed(1)
          ),
          images,
          description:
            hotelData.data.attributes?.body?.value || "",
        });

        // ===== ROOMS =====
        const roomIncluded = roomData.included || [];

        const formattedRooms = roomData.data.map((item) => {
          const imageData = item.relationships?.field_room_image?.data;

          const imageIds = Array.isArray(imageData)
            ? imageData
            : imageData
            ? [imageData]
            : [];

          const images = imageIds
            .map((rel) => {
              const file = roomIncluded.find(
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
            type: item.attributes?.title || "Room",
            price: item.attributes?.field_price || 0,
            ac: item.attributes?.field_ac_non_ac || false,
            description: item.attributes?.body?.value || "",
            // image: imageUrl,
            image: images[0] || "https://dummyimage.com/600x400/000/fff&text=Room",
            images,
          };
        });
        setRooms(formattedRooms);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    loadData();
  }, [id]);

  // 🔥 FILTER LOGIC
  const filteredRooms = rooms.filter(room => {
    if (roomFilter === "ac") return room.ac === true;
    if (roomFilter === "non-ac") return room.ac === false;
    return true;
  });

  if (loading || !hotel) {
    return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
  }

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="hotel-booking">
      <div className="container">

      <button className="back-btn" onClick={() => navigate("/hotels")}>
        ← Back to Hotels
      </button>

      {/* IMAGE GALLERY */}
      <div className="hotel-gallery">

        {/* Main Slider */}
        <Swiper
          modules={[Pagination, Thumbs, Autoplay]}
          loop={true}
          spaceBetween={10}
          pagination={{
            clickable: true,
          }}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
            thumbs={{
              swiper:
                thumbsSwiper && !thumbsSwiper.destroyed
                  ? thumbsSwiper
                  : null
            }}
          className="main-slider"
        >
          {hotel?.images?.map((img, index) => (
            <SwiperSlide key={index}>
              <img
                src={img}
                alt={`hotel-${index}`}
                onClick={() => {
                  setCurrentIndex(index);
                  setOpen(true);
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Thumbnail Slider */}
        <Swiper
          onSwiper={setThumbsSwiper}
          loop={true}
          spaceBetween={10}
          slidesPerView={4}
          watchSlidesProgress
          className="thumb-slider"
        >
          {hotel?.images?.map((img, index) => (
            <SwiperSlide key={index}>
              <img
                src={img}
                alt={`thumb-${index}`}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Lightbox */}
        <Lightbox
          open={open}
          close={() => setOpen(false)}
          slides={slides}
          index={currentIndex}
        />

      </div>

      <div className="booking-layout">

        {/* LEFT */}
        <div className="hotel-info">

          <h1>{hotel.name}</h1>

          <div className="meta">
            <span><FaMapMarkerAlt /> {hotel.location}</span>
            <span><FaStar /> {hotel.rating}</span>
          </div>

          <div className="section">
            <h2>About</h2>
            <p>{hotel.description}</p>
          </div>

          {/* ROOMS */}
          <div className="section">
            <h2>Room Types</h2>

            {/* FILTER */}
            <div className="room-filter">
              <button className={roomFilter === "all" ? "active" : ""} onClick={() => setRoomFilter("all")}>All</button>
              <button className={roomFilter === "ac" ? "active" : ""} onClick={() => setRoomFilter("ac")}>AC</button>
              <button className={roomFilter === "non-ac" ? "active" : ""} onClick={() => setRoomFilter("non-ac")}>Non-AC</button>
            </div>

            {filteredRooms.length > 0 ? (
              filteredRooms.map(room => (
                <div
                  key={room.id}
                  className="room-card"
                  onClick={() => setSelectedRoom(room)}
                >
                  {/* LEFT */}
                  <div className="room-left">

                    {/* HEADER */}
                    <div className="room-header">
                      <h3>{room.type}</h3>
                    </div>

                    <p className="room-size">Room size: Standard</p>

                    <div className="room-features">
                      {room.ac && <span>❄️ AC</span>}
                      <span>📺 TV</span>
                    </div>

                    <small className="room-desc">{room.description}</small>

                    {/* PRICE + SELECT */}
                    <div className="price-row">
                      <div className="price-box">
                        ₹{room.price}
                      </div>

                      <button
                        className={`select-btn ${
                          selectedRoom?.id === room.id ? "active" : ""
                        }`}
                      >
                        {selectedRoom?.id === room.id ? "SELECTED" : "SELECT"}
                      </button>
                    </div>
                  </div>

                  {/* RIGHT IMAGE */}
                  <div className="room-image">
                    {room.images?.length > 1 ? (
                      <Swiper
                        modules={[Pagination, Autoplay]}
                        pagination={{
                          clickable: true,
                        }}
                        autoplay={{
                          delay: 2000,
                          disableOnInteraction: false,
                        }}
                        loop={true}
                        slidesPerView={1}
                        className="room-slider"
                      >
                        {room.images.map((img, index) => (
                          <SwiperSlide key={index}>
                            <div className="room-slide">
                              <img
                                src={img}
                                alt={`${room.type}-${index}`}
                              />
                            </div>
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    ) : (
                      <div className="room-slide">
                        <img
                          src={room.image}
                          alt={room.type}
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p>No rooms available</p>
            )}
          </div>
        </div>

        {/* RIGHT */}
        <div className="booking-card">

          <h3> < FaHotel /> Book Your Stay</h3>

          <label>Check-in</label>
          <input type="date" value={checkIn} min={today} onChange={(e) => setCheckIn(e.target.value)} />

          <label>Check-out</label>
          <input type="date" value={checkOut} min={today} onChange={(e) => setCheckOut(e.target.value)} />

          <div className="row-fields">
            <div className="field">
              <label>Adults</label>
              <input
                type="number"
                value={adults}
                onChange={(e) => setAdults(e.target.value)}
              />
            </div>

            <div className="field">
              <label>Children</label>
              <input
                type="number"
                value={children}
                onChange={(e) => setChildren(e.target.value)}
              />
            </div>
          </div>

          <label>Rooms</label>
          <input
            type="number"
            value={roomsCount}
            onChange={(e) => setRoomsCount(e.target.value)}
          />

          {selectedRoom && (
            <div className="selected-room">
              {selectedRoom.type} — ₹{selectedRoom.price}/night
            </div>
          )}

          <button
            className="book-btn"
            onClick={handleBook}
            disabled={!selectedRoom || !checkIn || !checkOut || nights === 0}
          >
            {isLoggedIn
              ? totalAmount > 0
                ? `Book Now - ₹${totalAmount}`
                : "Book Now"
              : "Login to Book"}
          </button>

          <p className="note">
            Fill all details and select a room type.
          </p>

        </div>
      </div>
      </div>
    </div>
  );
};

export default HotelBooking;