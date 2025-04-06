import React, { useRef } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import PracticeAreas from "./components/PracticeAreas";
import Professionals from "./components/Professionals";
import News from "./components/News";
import Gallery from "./components/Gallery";
import Contact from "./components/Contact";
import AllNews from "./components/AllNews";
import "./styles.css";

function App() {
  // Create a ref for the News section
  const newsSectionRef = useRef(null);

  // Function to scroll to the News section
  const scrollToNewsSection = () => {
    if (newsSectionRef.current) {
      newsSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Static Routes */}
        <Route
          path="/"
          element={
            <>
              <section id="HOME">
                <Home />
              </section>
              <section id="ABOUT US">
                <About />
              </section>
              <section id="AREAS OF PRACTICE">
                <PracticeAreas />
              </section>
              <section id="OUR PROFESSIONALS">
                <Professionals />
              </section>
              {/* News Section with ref */}
              <section id="NEWS & ARTICLES" ref={newsSectionRef}>
                <News />
              </section>
              <section id="GALLERY">
                <Gallery />
              </section>
              <section id="CONTACT US">
                <Contact />
              </section>
            </>
          }
        />

        {/* News Route */}
        <Route
          path="/news"
          element={
            <>
              <section id="HOME">
                <Home />
              </section>
              <section id="ABOUT US">
                <About />
              </section>
              <section id="AREAS OF PRACTICE">
                <PracticeAreas />
              </section>
              <section id="OUR PROFESSIONALS">
                <Professionals />
              </section>
              <section id="NEWS & ARTICLES" ref={newsSectionRef}>
                <News />
              </section>
              <section id="GALLERY">
                <Gallery />
              </section>
              <section id="CONTACT US">
                <Contact />
              </section>
            </>
          }
        />

        {/* More news section */}
        <Route
          path="/more-news"
          element={<AllNews scrollToNewsSection={scrollToNewsSection} />}
        />
      </Routes> 
    </Router>
  );
}

export default App;
