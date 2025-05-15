import React, { useRef, useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import PracticeAreas from "./components/PracticeAreas";
import Professionals from "./components/Professionals";
import News from "./components/News";
import Gallery from "./components/Gallery";
import Contact from "./components/Contact";
import AllNews from "./components/AllNews";
import Login from "./components/Login";
import AdminDashboard from "./components/AdminDashboard";
import AddNewsForm from "./components/AddNewsForm";
import ProtectedRoute from "./components/ProtectedRoute";  // Import ProtectedRoute
import "./styles.css";

function App() {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    user: null
  });
  const newsSectionRef = useRef(null);
  const location = useLocation();

  // Check for existing token on initial load
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const userData = localStorage.getItem("user");
    
    if (token && userData) {
      setAuth({
        isAuthenticated: true,
        user: JSON.parse(userData)
      });
    }
  }, []);

  const scrollToNewsSection = () => {
    if (newsSectionRef.current) {
      newsSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Check if current route is an admin route
  const isAdminRoute = location.pathname.startsWith('/admin');

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    setAuth({
      isAuthenticated: false,
      user: null
    });
  };

  return (
    <>
      {/* Hide Navbar for all admin routes */}
      {!isAdminRoute && <Navbar auth={auth} setAuth={setAuth} />}

      <Routes>
        <Route
          path="/"
          element={
            <>
              <section id="HOME"><Home /></section>
              <section id="ABOUT US"><About /></section>
              <section id="AREAS OF PRACTICE"><PracticeAreas /></section>
              <section id="OUR PROFESSIONALS"><Professionals /></section>
              <section id="NEWS & ARTICLES" ref={newsSectionRef}><News /></section>
              <section id="GALLERY"><Gallery /></section>
              <section id="CONTACT US"><Contact /></section>
            </>
          }
        />

        <Route
          path="/news"
          element={
            <ProtectedRoute>
              <News />
            </ProtectedRoute>
          }
        />

        <Route
          path="/more-news"
          element={<AllNews scrollToNewsSection={scrollToNewsSection} />}
        />

        <Route
          path="/admin/login"
          element={
            auth.isAuthenticated ? (
              <Navigate to="/admin/dashboard" />
            ) : (
              <Login setAuth={setAuth} />
            )
          }
        />

        <Route
          path="/admin/dashboard"
          element={
            auth.isAuthenticated ? (
              <AdminDashboard user={auth.user} onLogout={handleLogout} />
            ) : (
              <Navigate to="/admin/login" />
            )
          }
        />

        <Route path="*" element={<Navigate to="/" />} />
        <Route
          path="/admin/news"
          element={
            <ProtectedRoute>
              <AddNewsForm />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default function Root() {
  return (
    <Router>
      <App />
    </Router>
  );
}
