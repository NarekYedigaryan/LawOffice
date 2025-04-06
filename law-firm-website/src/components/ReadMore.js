import React from "react";
import "../styles/ReadMore.css";

const ReadMore = ({ selectedArticle, closeModal }) => {
  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Close button */}
        <button className="close-modal" onClick={closeModal}>
          ✖
        </button>
        
        <div className="modal-left">
          <p className="modal-title">{selectedArticle.title}</p>
          <img
            src={selectedArticle.image}
            alt={selectedArticle.title}
            className="modal-image"
          />
          <p className="modal-date">{selectedArticle.date}</p>
        </div>
        <div className="modal-right">
          <p className="modal-description">{selectedArticle.fullText}</p>
        </div>
      </div>
    </div>
  );
};

export default ReadMore;
