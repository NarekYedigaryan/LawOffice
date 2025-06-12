import React from "react";
import "../styles/ReadMore.css";

const ReadMore = ({ selectedArticle, closeModal }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={closeModal}>
          &times;
        </button>
        
        <div className="modal-header">
          <div className="modal-title-container">
            <h2>{selectedArticle.title}</h2>
          </div>
          
          <div className="modal-image-container">
            <img 
              src={selectedArticle.imageUrl} 
              alt={selectedArticle.title} 
              className="modal-image"
            />
            <p className="modal-date">
              📅 {new Date(selectedArticle.date).toLocaleDateString()}
            </p>
          </div>
        </div>
        
        <div className="modal-text">
          <p>{selectedArticle.content}</p>
        </div>
      </div>
    </div>
  );
};
export default ReadMore;