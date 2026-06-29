// import { NavLink, useNavigate } from "react-router-dom";
// import { useState, useRef, useEffect } from "react";
// import { showSuccess } from "../../utils/toast";
// import {
//   FiUser,
//   FiMenu,
//   FiX,
//   FiChevronDown,
//   FiChevronUp,
// } from "react-icons/fi";
// import "./Navbar.scss";

// const Navbar = () => {
//   const navigate = useNavigate();
//   const [showMenu, setShowMenu] = useState(false);
//   const [mobileMenu, setMobileMenu] = useState(false);
//   const [mobileProfileMenu, setMobileProfileMenu] = useState(false);
//   const profileRef = useRef(null);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (
//         profileRef.current &&
//         !profileRef.current.contains(event.target)
//       ) {
//         setShowMenu(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   useEffect(() => {
//     if (mobileMenu) {
//       document.body.classList.add("menu-open");
//     } else {
//       document.body.classList.remove("menu-open");
//     }

//     return () => {
//       document.body.classList.remove("menu-open");
//     };
//   }, [mobileMenu]);

//   const token = localStorage.getItem("token");
//   const user = JSON.parse(localStorage.getItem("user"));

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     localStorage.removeItem("cabForm");
//     localStorage.removeItem("hotelForm");

//     showSuccess("Logout successfully");

//     setTimeout(() => {
//       navigate("/");
//     }, 800);
//   };

//   return (
//     <nav className="navbar">
//       <div className="navbar-content">

//         <h2
//           className="nav-title"
//           onClick={() => navigate("/")}
//         >
//           Ujjain Yatra
//         </h2>

//         <div className="nav-links">
//           <div className="mobile-auth-btn">
//             {!token ? (
//               <button
//                 className="mobile-top-login-btn"
//                 onClick={() => navigate("/login")}
//               >
//                 Login
//               </button>
//             ) : (
//               <button
//                 className="mobile-top-logout-btn"
//                 onClick={handleLogout}
//               >
//                 Logout
//               </button>
//             )}
//           </div>

//           <div
//             className="menu-toggle"
//             onClick={() => setMobileMenu(!mobileMenu)}
//           >
//             {mobileMenu ? <FiX /> : <FiMenu />}
//           </div>

//           <div className={`nav-menu ${mobileMenu ? "open" : ""}`}>

//             {/* Mobile User Section */}
//             {token && mobileMenu && (
//               <div className="mobile-user-section">
//                 <div
//                   className="mobile-user-header"
//                   onClick={() =>
//                     setMobileProfileMenu(!mobileProfileMenu)
//                   }
//                 >
//                   <span>Hi, {user?.name}</span>

//                   {mobileProfileMenu ? (
//                     <FiChevronUp />
//                   ) : (
//                     <FiChevronDown />
//                   )}
//                 </div>

//                 {mobileProfileMenu && (
//                   <div className="mobile-submenu">
//                     <NavLink
//                       to="/bookings"
//                       onClick={() => setMobileMenu(false)}
//                     >
//                       My Profile
//                     </NavLink>

//                     <NavLink
//                       to="/bookings"
//                       onClick={() => setMobileMenu(false)}
//                     >
//                       My Bookings
//                     </NavLink>

//                     <NavLink
//                       to="/help"
//                       onClick={() => setMobileMenu(false)}
//                     >
//                       Help
//                     </NavLink>
//                   </div>
//                 )}
//               </div>
//             )}

//             <NavLink to="/" onClick={() => setMobileMenu(false)}>
//               Home
//             </NavLink>

//             <NavLink to="/hotels" onClick={() => setMobileMenu(false)}>
//               Hotels
//             </NavLink>

//             <NavLink to="/cabs" onClick={() => setMobileMenu(false)}>
//               Cabs
//             </NavLink>

//             <NavLink to="/pooja" onClick={() => setMobileMenu(false)}>
//               Pooja
//             </NavLink>

//             <NavLink to="/darshan" onClick={() => setMobileMenu(false)}>
//               Darshan
//             </NavLink>

//             <NavLink to="/about" onClick={() => setMobileMenu(false)}>
//               About Us
//             </NavLink>

//             {token ? (
//               <div
//                 className="profile-wrapper desktop-profile"
//                 ref={profileRef}
//               >
//                 <div
//                   className="profile-icon"
//                   onClick={() => setShowMenu(!showMenu)}
//                 >
//                   <FiUser />
//                 </div>

//                 {showMenu && (
//                   <div className="profile-dropdown">
//                     <div className="user-info">
//                       Hi, {user?.name}
//                     </div>

//                     <NavLink to="/bookings">
//                       My Profile
//                     </NavLink>

//                     <NavLink to="/bookings">
//                       My Bookings
//                     </NavLink>

//                     <NavLink to="/help">
//                       Help
//                     </NavLink>

//                     <button onClick={handleLogout}>
//                       Logout
//                     </button>
//                   </div>
//                 )}
//               </div>
//             ) : (
//               <button
//                 className="login-btn"
//                 onClick={() => {
//                   navigate("/login");
//                   setMobileMenu(false);
//                 }}
//               >
//                 Login
//               </button>
//             )}
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.scss";
import {
  FaHome,
  FaTaxi,
  FaPrayingHands,
  FaPlaceOfWorship,
} from "react-icons/fa";
import logo2 from "../../assets/images/logo2.png";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <>
      <nav className="navbar">
        <div className="navbar-content">

          <div
            className="nav-logo"
            onClick={() => navigate("/")}
          >
            <img src={logo2} alt="Logo 2" />
          </div>

          {/* <div className="nav-links"> */}
            <div className= "nav-menu">
              <NavLink to="/">Home</NavLink>
              <NavLink to="/cabs">Cabs</NavLink>
              <NavLink to="/pooja">Pooja</NavLink>
              <NavLink to="/darshan">Darshan</NavLink>
              <NavLink to="/about">About Us</NavLink>
            </div>
          {/* </div> */}
        </div>
      </nav>

      <div className="mobile-bottom-nav">
        <NavLink to="/">
          <FaHome />
          <span>Home</span>
        </NavLink>

        <NavLink to="/cabs">
          <FaTaxi />
          <span>Cabs</span>
        </NavLink>

        <NavLink to="/pooja">
          <FaPrayingHands />
          <span>Pooja</span>
        </NavLink>

        <NavLink to="/darshan">
          <FaPlaceOfWorship />
          <span>Darshan</span>
        </NavLink>
      </div>
    </>
  );
};

export default Navbar;