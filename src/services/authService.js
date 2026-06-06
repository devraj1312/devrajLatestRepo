import { api } from "../utils/api";

export const registerUser = (data) => {
  return api("/api/register", "POST", data);
};

export const loginUser = (data) => {
  return api("/api/login", "POST", data);
};

export const sendOtp = (data) => {
  return api("/api/send-otp", "POST", data);
};

export const verifyOtp = (data) => {
  return api("/api/verify-otp", "POST", data);
};