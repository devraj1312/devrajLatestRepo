import Navbar from "./Navbar";
import Footer from "./Footer";
import "./Layout.scss";

const Layout = ({ children }) => {
  return (
    <div className="site-layout">
      <Navbar />

      <main className="main-content">
        {children}
      </main>

      <Footer />
    </div>
  );
};

export default Layout;