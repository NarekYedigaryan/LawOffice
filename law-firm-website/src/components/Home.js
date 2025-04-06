import React from "react";

const Home = () => {
  return (
    <img 
      src={`${process.env.PUBLIC_URL}/images/law.jpg`} 
      alt="Law Firm" 
    
    style={{ width: "100%", height: "87vh" ,paddingTop: "13vh"}} 
    />
  );
};

export default Home;
