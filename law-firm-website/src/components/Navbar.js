import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-scroll";
import "../styles/Navbar.css";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 900);
  const [menuOpen, setMenuOpen] = useState(false);
  const navbarRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 900);
    };

    const handleClickOutside = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    
    // Add click outside listener when menu is open
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    
    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]); // Re-run effect when menuOpen changes

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [menuOpen]);

  return (
    <div className="container" ref={navbarRef}>
      <nav className="navbar">
        <div className="navbar-logo">
          <Link to="HOME" smooth={true} duration={500}>
            <img src="./images/logo.png" alt="Logo" />
          </Link>
        </div>

        {isMobile ? (
          <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FaTimes className="icon" /> : <FaBars className="icon" />}
          </div>
        ) : (
          <ul className="navbar-links">
            {["HOME", "ABOUT US", "AREAS OF PRACTICE", "OUR PROFESSIONALS", "NEWS & ARTICLES", "GALLERY", "CONTACT US"].map((section) => (
              <li key={section}>
                <Link to={section} smooth={true} duration={500} activeClass="active" spy={true} offset={-70}>
                  {section.replace(/-/g, " ")}
                </Link>
              </li>
            ))}
          </ul>
        )}

        {menuOpen && isMobile && (
          <div className="mobile-menu">
            {["HOME", "ABOUT US", "AREAS OF PRACTICE", "OUR PROFESSIONALS", "NEWS & ARTICLES", "GALLERY", "CONTACT US"].map((section) => (
              <li key={section}>
                <Link to={section} smooth={true} duration={500} activeClass="active" spy={true} offset={-70} onClick={() => setMenuOpen(false)}>
                  {section.replace(/-/g, " ")}
                </Link>
              </li>
            ))}
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;