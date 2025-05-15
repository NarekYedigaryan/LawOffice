import React from "react";
import { Link } from "react-router-dom";

const NewsCard = ({ article, onReadMoreClick }) => {
  // Format the title to match your screenshot with line breaks
  const formatTitle = (title) => {
    return title.split('\n').map((line, i) => (
      <React.Fragment key={i}>
        {line}
        <br />
      </React.Fragment>
    ));
  };

  return (
    <div className="news-card">
      <img src={article.imageUrl} alt={article.title} className="news-image" />
      <div className="news-content">
        <h3>{formatTitle(article.title)}</h3>
        <p className="news-date">📅 {article.date}</p>
        <p className="news-description">{article.description}</p>
        <div className="button-container">
          <button 
            onClick={() => onReadMoreClick(article)} 
            className="news-button"
          >
            Read More
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;