import { useState, useEffect } from "react";
import {
  FaHotel,
  FaCar,
  FaCalendarAlt,
  FaRupeeSign,
  FaMapMarkerAlt,
  FaBed,
  FaUsers,
} from "react-icons/fa";

import "./Bookings.scss";

import { getUserBookings, cancelCabBooking } from "../../services/cabService";
import { getUserHotelBookings, cancelHotelBooking } from "../../services/hotelService";
import { getProfile } from "../../services/profileService";
import { showSuccess, showError } from "../../utils/toast";
import ConfirmModal from "../../components/ConfirmModal/ConfirmModal";

const Bookings = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [bookingType, setBookingType] = useState("cab");

  const openCancelModal = (id, type) => {
    setSelectedBooking(id);
    setBookingType(type);
    setConfirmOpen(true);
  };

const handleCancel = async () => {

  try {

    const res =
      bookingType === "hotel"
        ? await cancelHotelBooking(selectedBooking)
        : await cancelCabBooking(selectedBooking);

    if (res.status === "success") {

      showSuccess(
        `${bookingType === "hotel" ? "Hotel" : "Cab"} Booking Cancelled`
      );

      setBookings((prev) =>
        prev.map((b) =>
          b.id === selectedBooking
            ? { ...b, status: "cancelled" }
            : b
        )
      );

    } else {

      showError(res.message || "Cancel failed");
    }

  } catch (err) {

    showError("Cancel failed");

  } finally {

    setConfirmOpen(false);
  }
};

  const filtered =
    activeTab === "all"
      ? bookings
      : bookings.filter((b) => b.type === activeTab);

  useEffect(() => {

    const fetchData = async () => {
      try {

        setLoading(true);

        const [
          cabBookings,
          hotelBookings,
          profileData,
        ] = await Promise.all([
          getUserBookings(),
          getUserHotelBookings(),
          getProfile(),
        ]);

        const allBookings = [

          ...(Array.isArray(cabBookings)
            ? cabBookings
            : []),

          ...(Array.isArray(hotelBookings)
            ? hotelBookings
            : []),
        ];

        // ✅ newest booking first
        const sortedBookings = allBookings.sort(
          (a, b) =>
            new Date(b.created_at || b.created || b.date) -
            new Date(a.created_at || a.created || a.date)
        );

        setBookings(sortedBookings);

        setUser(profileData);

      } catch (err) {

        console.error("Fetch error:", err);

      } finally {

        setLoading(false);
      }
    };

    fetchData();

  }, []);

  // const handleCancel = (id, type = "cab") => {
  //   showConfirm(
  //     `Are you sure you want to cancel this ${type} booking?`,
  //     async () => {
  //       try {
  //         // 🔥 API based on type
  //         const res =
  //           type === "hotel"
  //             ? await cancelHotelBooking(id)
  //             : await cancelCabBooking(id);

  //         if (res.status === "success") {
  //           showSuccess(
  //             `${
  //               type === "hotel" ? "Hotel" : "Cab"
  //             } Booking Cancelled`
  //           );

  //           // 🔥 update state
  //           setBookings((prev) =>
  //             prev.map((b) =>
  //               b.id === id
  //                 ? { ...b, status: "cancelled" }
  //                 : b
  //             )
  //           );
  //         } else {
  //           showError(res.message || "Cancel failed");
  //         }
  //       } catch (err) {
  //         showError("Cancel failed");
  //       }
  //     }
  //   );
  // };


  const canCancelBooking = (dateStr) => {
    if (!dateStr) return false;

    const bookingTime = new Date(dateStr + "Z");
    const now = new Date();

    const diffMs = bookingTime - now;
    const diffHours = diffMs / (1000 * 60 * 60);

    return diffHours > 2;
  };

  if (loading) {
    return <h2 style={{ textAlign: "center" }}>Loading bookings...</h2>;
  }

  return (
    <>
      {/* Profile Section OUTSIDE bookings-page */}
      <div className="user-profile-section">
        <div className="profile-card">
          <div className="profile-avatar">

            {user?.full_name
              ?.charAt(0)
              ?.toUpperCase() || "U"}

          </div>

          <div className="profile-details">

            <h2>
              {user?.full_name || "No Name"}
            </h2>

            <p>
              {user?.email || "No Email"}
            </p>

            {user?.mobile && (
              <span>{user.mobile}</span>
            )}

          </div>
        </div>
      </div>

      {/* Booking Section */}
      <div className="bookings-page">
        <h1>My Bookings</h1>
        <p>Track and manage all your travel bookings</p>

        {/* Tabs */}
        <div className="tabs">
          <button
            className={activeTab === "all" ? "active" : ""}
            onClick={() => setActiveTab("all")}
          >
            All Bookings
          </button>

          <button
            className={activeTab === "hotel" ? "active" : ""}
            onClick={() => setActiveTab("hotel")}
          >
            <FaHotel /> Hotels
          </button>

          <button
            className={activeTab === "cab" ? "active" : ""}
            onClick={() => setActiveTab("cab")}
          >
            <FaCar /> Cabs
          </button>
        </div>

        {/* Booking List */}
        <div className="booking-list">
          {filtered.length > 0 ? (
            filtered.map((b) => {
              // 🔥 DEBUG (important)
              // console.log("Booking:", b);

              // 🔥 Safe date handling
              // const dateObj = b.date ? new Date(b.date) : null;

              const formatDateTime = (dateStr) => {
                if (!dateStr) return "Invalid Date";

                // ✅ force UTC correctly
                const date = new Date(dateStr + "Z");

                return `${date.toLocaleDateString("en-IN")} | ${date.toLocaleTimeString("en-IN", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })}`;
              };

              const isCancelable = canCancelBooking(b.date);

              return (
                <div key={b.id} className="booking-card">

                  {/* HOTEL CARD */}
                  {b.type === "hotel" ? (
                    <>
                      <div className="left">
                        <div className="icon-box hotel">
                          <FaHotel />
                        </div>

                        <div>
                          <h3>
                            ID: <strong>{b.id}</strong> - {b.name}
                          </h3>

                          <div className="hotel-details">
                            <p>
                              <FaBed /> {b.details}
                            </p>

                            <p>
                              <FaCalendarAlt /> Check-in: {b.check_in}
                            </p>

                            <p>
                              <FaCalendarAlt /> Check-out: {b.check_out}
                            </p>

                            <p>
                              <FaUsers /> {b.adults} Adults | {b.children} Children
                            </p>

                            <p>
                              <FaRupeeSign /> {b.price}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="right">
                        {/* Status */}
                        <span className={`status ${b.status?.toLowerCase()}`}>
                          {b.status}
                        </span>

                        {/* Cancel Section */}
                        {!["cancelled", "completed"].includes(
                          b.status?.toLowerCase()
                        ) && (
                          <>
                            <div className="cancel-wrapper">
                              {/* Message */}
                              <small className="cancel-msg">
                                Cancel before check-in
                              </small>

                              {/* Button */}
                              <button
                                className={`cancel-btn ${
                                  b.status?.toLowerCase() === "cancelled"
                                    ? "disabled"
                                    : ""
                                }`}
                                disabled={b.status?.toLowerCase() === "cancelled"}
                                // onClick={() => handleCancel(b.id, "hotel")}
                                onClick={() => openCancelModal(b.id, "hotel")}
                              >
                                Cancel
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    </>
                  ) : (
                    /* CAB CARD */
                    <>
                      <div className="left">
                        <div className="icon-box cab">
                          <FaCar />
                        </div>

                        <div className="cab-info">
                          {/* 🔥 ID + Name */}
                          <h3>
                            ID: <strong>{b.id}</strong> - {b.name}
                          </h3>

                          {/* 🔥 Route */}
                          <p>
                            <FaMapMarkerAlt /> {b.details}
                          </p>

                          {/* 🔥 Date + Time */}
                          <p>
                            <FaCalendarAlt /> {formatDateTime(b.date)}
                          </p>

                          {/* 🔥 Price */}
                          <p>
                            <FaRupeeSign /> {b.price || "Processing..."}
                          </p>
                        </div>
                      </div>

                      <div className="right">
                        {/* Status */}
                        <span className={`status ${b.status?.toLowerCase()}`}>
                          {b.status}
                        </span>

                        {/* Cancel Section */}
                        {!["cancelled", "completed"].includes(b.status?.toLowerCase()) && (
                          <>
                            {/* Button */}
                            <div className="cancel-wrapper">
                              {/* Message ONLY when cancel allowed */}
                              {isCancelable && (
                                <small className="cancel-msg">
                                  Cancel before 2 hrs of ride
                                </small>
                              )}
                              {/* Button */}
                              <button
                                className={`cancel-btn ${!isCancelable ? "disabled" : ""}`}
                                disabled={!isCancelable}
                                onClick={() => {
                                  if (isCancelable) {
                                    openCancelModal(b.id, "cab");
                                  }
                                }}
                              >
                                {isCancelable ? "Cancel" : "Locked"}
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    </>
                  )}
                </div>
              );
            })
          ) : (
            <p className="no-data">No bookings found</p>
          )}
        </div>
      </div>

      <ConfirmModal
        isOpen={confirmOpen}
        message={`Are you sure you want to cancel this ${bookingType} booking?`}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleCancel}
      />
    </>
  );
};

export default Bookings;

