import React from "react";
import "../styles/Gallery.css";

const images = [
  "https://www.akamai.com/site/im-demo/perceptual-standard.jpg?imbypass=true",
  "https://www.akamai.com/site/im-demo/perceptual-standard.jpg?imbypass=true",
  "https://www.akamai.com/site/im-demo/perceptual-standard.jpg?imbypass=true",
  "https://www.akamai.com/site/im-demo/perceptual-standard.jpg?imbypass=true",
  "https://www.akamai.com/site/im-demo/perceptual-standard.jpg?imbypass=true",
  "https://www.akamai.com/site/im-demo/perceptual-standard.jpg?imbypass=true",
  "https://www.akamai.com/site/im-demo/perceptual-standard.jpg?imbypass=true",
  "https://www.akamai.com/site/im-demo/perceptual-standard.jpg?imbypass=true",
  "https://www.akamai.com/site/im-demo/perceptual-standard.jpg?imbypass=true",
  "https://www.akamai.com/site/im-demo/perceptual-standard.jpg?imbypass=true",

];

const Gallery = () => {
  return (
    <div className="Gallery">
      <h2>Gallery</h2>
      <div className="gallery-container">
        {images.map((src, index) => (
          <img key={index} src={src} alt={`Gallery Image ${index + 1}`} className="gallery-item" />
        ))}
      </div>
    </div>
  );
};

export default Gallery;
