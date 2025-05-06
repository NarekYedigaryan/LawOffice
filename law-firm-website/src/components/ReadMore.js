import React from "react";
import "../styles/ReadMore.css";

const ReadMore = ({ selectedArticle, closeModal }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={closeModal}>
          &times;
        </button>
        <img 
          src={selectedArticle.imageUrl} 
          alt={selectedArticle.title} 
          className="modal-image"
        />
        <h2>{selectedArticle.title}</h2>
        <p className="modal-date">📅 {new Date(selectedArticle.date).toLocaleDateString()}</p>
        <div className="modal-text">
          <p>{selectedArticle.content}</p>
        </div>
      </div>
    </div>
  );
};

export default ReadMore;