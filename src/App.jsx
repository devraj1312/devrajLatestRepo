import { BrowserRouter, useLocation } from "react-router-dom";
import { useEffect } from "react";
import AppRoutes from "./routes/AppRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ScrollToTop from "./components/ScrollToTop";

// 🔥 NEW COMPONENT (Global Auth Checker)
const AuthChecker = () => {
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) return;

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));

      if (payload.exp * 1000 < Date.now()) {
        localStorage.clear();
        window.location.href = "/login";
      }
    } catch (e) {
      localStorage.clear();
      window.location.href = "/login";
    }
  }, [location]); 

  return null;
};

const App = () => (
  <BrowserRouter>
  <ScrollToTop />
  <AuthChecker />
    <AppRoutes />

    {/* ✅ GLOBAL TOAST */}
    <ToastContainer
      position="top-right"
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      pauseOnHover
      theme="colored"
      style={{ zIndex: 999999 }}
    />
  </BrowserRouter>
);

export default App;