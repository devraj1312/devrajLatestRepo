const BASE_URL = import.meta.env.VITE_API_URL;

export const api = async (endpoint, method = "GET", body = null) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: body ? JSON.stringify(body) : null,
  });

  let data;

  try {
    data = await res.json();
  } catch (e) {
    console.error("Invalid JSON response");
    throw new Error("Invalid server response");
  }

  // 🔥 MOST IMPORTANT (status-based check)
  if (res.status === 401) {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // optional: message show
    alert("Session expired. Please login again.");

    window.location.href = "/login";
    return;
  }

  // ✅ token expire handle
  if (
    data?.error === "Expired token" ||
    data?.message === "Expired token"
  ) {
    // localStorage.removeItem("token");
    localStorage.clear();
    window.location.href = "/login";
    return;
  }
  
  if (!res.ok) {
    throw { response: { data } };
  }

  return data;
};