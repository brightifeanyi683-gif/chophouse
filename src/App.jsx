import { Navigate, Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import FoodCategories from "./components/FoodCategories";
import FeaturedDishes from "./components/FeaturedDishes";
import MenuPreview from "./components/MenuPreview";
import OurStory from "./components/OurStory";
import ServiceOptions from "./components/ServiceOptions";
import Testimonials from "./components/Testimonials";
import ReservationCTA from "./components/ReservationCTA";
import FoodRequest from "./components/FoodRequest";
import HelpContact from "./components/HelpContact";
import Footer from "./components/Footer";
import ReservationForm from "./components/ReservationForm";

import AdminDashboard from "./admin/AdminDashboard";
import AdminLogin from "./admin/AdminLogin";
import MenuManagement from "./admin/MenuManagement";

import "./App.css";

function HomePage() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <FoodCategories />
        <FeaturedDishes />
        <MenuPreview />
        <OurStory />
        <ServiceOptions />
        <Testimonials />
        <FoodRequest />
        <ReservationCTA />
        <ReservationForm />
        <HelpContact />
        <Footer />
      </main>
    </>
  );
}

function ProtectedAdminRoute() {
  const token = localStorage.getItem("chophouse_admin_token");

  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  return <AdminDashboard />;
}

function ProtectedMenuRoute() {
  const token = localStorage.getItem("chophouse_admin_token");

  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  return <MenuManagement />;
}

function App() {
  return (
    <Routes>
      {/* Public website */}
      <Route path="/" element={<HomePage />} />

      {/* Admin login */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* Admin dashboard */}
      <Route path="/admin" element={<ProtectedAdminRoute />} />

      {/* Admin menu management */}
      <Route path="/admin/menu" element={<ProtectedMenuRoute />} />
    </Routes>
  );
}

export default App;