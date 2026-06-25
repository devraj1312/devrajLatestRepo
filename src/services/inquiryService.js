import { api } from "../utils/api";

// 📩 Submit Inquiry
export const submitInquiry = (data) => {
  return api("/api/client-inquiry", "POST", data);
};