import { api } from "../utils/api";

export const getProfile = async () => {
  try {
    const res = await api("/api/profile");
    return res?.user || null;
  } catch (error) {
    console.error(
      "Profile Fetch Error:",
      error
    );
    return null;
  }
};