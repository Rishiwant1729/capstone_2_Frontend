import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const MainLayout = () => (
  <div className="app-shell">
    <Navbar />
    <main className="app-shell__content">
      <Outlet />
    </main>
    <Footer />
  </div>
);

export default MainLayout;

