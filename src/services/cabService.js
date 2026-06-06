import { api } from "../utils/api";

// 🚖 Book cab
export const bookCab = (data) => {
  return api("/api/cab-booking", "POST", data);
};

// 📋 Get user cab bookings
export const getUserBookings = () => {
  return api("/api/user-bookings");
};

// 🚗 Get raw cabs (ONLY API call)
export const getCabs = () => {
  return api("/jsonapi/node/cabs?include=field_cab_image,field_type");
};

export const getLocations = (search) => {
  return api(`/api/location?search=${search}`);
};

// ❌ Cancel booking
export const cancelCabBooking = (id) => {
  return api(`/api/cancel-cab-booking/${id}`, "POST");
};