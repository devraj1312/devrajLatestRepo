import { api } from "../utils/api";

// 🏨 Get all hotels
export const getHotels = () => {
  return api("/jsonapi/node/hotels?include=field_hotel_image");
};

// 🏨 Get single hotel
export const getHotelById = (id) => {
  return api(`/jsonapi/node/hotels/${id}?include=field_hotel_image`);
};

// 🛏️ Get rooms by hotel
export const getRoomsByHotel = (hotelId) => {
  return api(
    `/jsonapi/node/rooms?include=field_room_image&filter[field_hotel_reference.id]=${hotelId}`
  );
};

// 📅 Book hotel
export const bookHotel = (data) => {
  return api("/api/hotel-booking", "POST", data);
};

// 📋 Get user hotel bookings
export const getUserHotelBookings = () => {
  return api("/api/user-hotel-bookings");
};

// ❌ Cancel booking
export const cancelHotelBooking = (id) => {
  return api(`/api/cancel-hotel-booking/${id}`, "POST");
};