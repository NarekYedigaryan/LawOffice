import React from "react";
import "../styles/about.css"; 

const About = () => {
  return (
      <div className="about-container">
        <div className="about-text">
          <h1>About Us</h1>
          <p>
          At [Your Law Firm's Name], we are passionate about delivering high-quality legal services and putting our clients first. Founded on the principles of integrity, dedication, and professionalism, our team of experienced attorneys is committed to providing practical solutions to complex legal issues.

Whether you are facing a challenging legal situation or simply need expert advice, we are here to help. Our lawyers specialize in various practice areas, including [list a few specific areas of law, such as corporate law, family law, personal injury, etc.], and we approach each case with a personalized touch to ensure that your legal matters are handled with the utmost care.

We pride ourselves on building lasting relationships with our clients by offering clear, strategic, and results-driven legal advice. We believe that everyone deserves access to justice, and our mission is to empower individuals and businesses by providing reliable and affordable legal support.
          </p>
        </div>

        <div className="about-images">
          <img src="/images/about.jpg" alt="Law Firm" />
        </div>
      </div>
  );
};

export default About;
