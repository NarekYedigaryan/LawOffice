// MoreNews.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/News.css";
import ReadMore from "./ReadMore";  
import NewsCard from "./NewsCard";  
import { getNews } from "./newsService";

const MoreNews = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllNews = async () => {
      try {
        const data = await getNews();
        setArticles(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAllNews();
  }, []);

  const openModal = (article) => {
    setSelectedArticle(article);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedArticle(null);
  };

  if (loading) return <div className="News">Loading all news...</div>;
  if (error) return <div className="News">Error: {error}</div>;

  return (
    <div className="News">
      <h2>ALL NEWS & ARTICLES</h2>
      <div className="news-container">
        {articles.map((article) => ( 
          <NewsCard
            key={article.id}
            article={{
              ...article,
              image: article.imageUrl,
              fullText: article.content
            }}
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

export default MoreNews;