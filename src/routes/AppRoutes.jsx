import { Routes, Route } from "react-router-dom";
import Layout from "../components/layout/Layout";
import Home from "../pages/Home/Home";
// import Hotels from "../pages/Hotels/Hotels";
// import HotelBooking from "../pages/Hotels/HotelBooking";
import Cabs from "../pages/Cabs/Cabs";
import Pooja from "../pages/Pooja/Pooja";
import Darshan from "../pages/Darshan/Darshan";
// import Bookings from "../pages/Bookings/Bookings";
import Help from "../pages/Help/Help";
import About from "../pages/About/About";
import CustomDarshanPlanner from "../pages/CustomDarshanPlanner/CustomDarshanPlanner";
import InquiryForm from "../pages/InquiryForm/InquiryForm";

// 👇 NEW IMPORTS
// import Login from "../pages/Auth/Login";
// import Register from "../pages/Auth/Register";

// 👇 Protected Route
// import ProtectedRoute from "./ProtectedRoute";


const AppRoutes = () => (
  <Routes>

    {/* ✅ Auth Routes (without layout) */}
    {/* <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} /> */}
    
    <Route
      path="/"
      element={
        <Layout>
          <Home />
        </Layout>
      }
    />

    {/* <Route
      path="/hotels"
      element={
        <Layout>
          <Hotels />
        </Layout>
      }
    /> */}

    <Route
      path="/cabs"
      element={
        <Layout>
          <Cabs />
        </Layout>
      }
    />

    <Route
      path="/pooja"
      element={
        <Layout>
          <Pooja />
        </Layout>
      }
    />

    <Route
      path="/darshan"
      element={
        <Layout>
          <Darshan />
        </Layout>
      }
    />

    {/* <Route
      path="/hotels/:id"
      element={
        <Layout>
          <HotelBooking />
        </Layout>
      }
    />  */}

    <Route
      path="/cabs/:id"
      element={
        <Layout>
          <Cabs  />
        </Layout>
      }
    />

    <Route
      path="/custom-darshan-planner"
      element={
        <Layout>
          <CustomDarshanPlanner />
        </Layout>
      }
    />

    {/* <Route
      path="/bookings"
      element={
        <ProtectedRoute>
          <Layout>
            <Bookings />
          </Layout>
        </ProtectedRoute>
       
      }
    /> */}

    <Route
      path="/help"
      element={
        <Layout>
          <Help />
        </Layout>
      }
    />

    <Route
      path="/about"
      element={
        <Layout>
          <About />
        </Layout>
      }
    />

    <Route
      path="/inquiry-form"
      element={
        <Layout>
          <InquiryForm />
        </Layout>
      }
    />

  </Routes>
);

export default AppRoutes;