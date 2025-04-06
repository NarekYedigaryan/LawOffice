import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/AllNews.css";
import NewsCard from "./NewsCard"; 
import ReadMore from "./ReadMore";  
import { articles } from "./articles";

const AllNews = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);

  useEffect(() => {
    const savedPosition = sessionStorage.getItem("scrollPosition");
    if (savedPosition) {
      window.scrollTo(0, savedPosition);
    }

    return () => {
      sessionStorage.setItem("scrollPosition", window.scrollY);
    };
  }, []);

  const openModal = (article) => {
    setSelectedArticle(article);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedArticle(null);
  };

  return (
    <div className="AllNews">
      <div className="back-button-container">
        <Link
          to="/news"
          className="back-button"
          onClick={() => {
            const savedPosition = sessionStorage.getItem("scrollPosition");
            if (savedPosition) {
              setTimeout(() => {
                window.scrollTo(0, savedPosition);
              }, 0);
            }
          }}
        >
          ← Back to News
        </Link>
      </div>

      <h2>All News</h2>
      <div className="news-container">
        {articles.map((article) => (
          <NewsCard
            key={article.id}
            article={article}
            onReadMoreClick={openModal}  
          />
        ))}
      </div>

      {isModalOpen && selectedArticle && (
        <ReadMore selectedArticle={selectedArticle} closeModal={closeModal} />
      )}
    </div>
  );
};

export default AllNews;
