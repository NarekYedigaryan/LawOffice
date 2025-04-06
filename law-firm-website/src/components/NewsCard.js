import React from "react";
import { Link } from "react-router-dom";

const NewsCard = ({ article, onReadMoreClick }) => {
  return (
    <div className="news-card" key={article.id}>
      <img src={article.image} alt={article.title} className="news-image" />
      <div className="news-content">
        <h3>{article.title}</h3>
        <p className="news-date">📅 {article.date}</p>
        <p className="news-description">{article.description}</p>
        <div className="button-container">
          {onReadMoreClick ? (
            <button onClick={() => onReadMoreClick(article)} className="news-button">
              Read More
            </button>
          ) : (
            <Link to={`/news/${article.id}`} className="news-button">
              Read More
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
