import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/News.css";
import ReadMore from "./ReadMore";  
import NewsCard from "./NewsCard";  
import { articles } from "./articles";

const News = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);

  const openModal = (article) => {
    setSelectedArticle(article);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedArticle(null);
  };

  return (
    <div className="News">
      <h2>NEWS & ARTICLES</h2>
      <div className="news-container">
        {articles.slice(0, 3).map((article) => ( 
          <NewsCard
            key={article.id}
            article={article}
            onReadMoreClick={openModal}
          />
        ))}
      </div>
      <Link
        to="/more-news"
        className="view-more"
        onClick={() => sessionStorage.setItem("scrollPosition", window.scrollY)}
      >
        View more →
      </Link>

      {isModalOpen && selectedArticle && (
        <ReadMore selectedArticle={selectedArticle} closeModal={closeModal} />
      )}
    </div>
  );
};

export default News;
