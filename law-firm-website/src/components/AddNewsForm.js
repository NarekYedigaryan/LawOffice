import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AddNewsForm.css";

const AddNewsForm = ({ onNewsAdded }) => {
  const [news, setNews] = useState({
    title: "",
    description: "",
    content: "",
    imageUrl: "",
    date: new Date().toISOString().split('T')[0] // Add current date
  });

  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setNews({ ...news, [e.target.name]: e.target.value });
  };
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/admin/dashboard");
  };
  
 const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);
  setMessage("");
  const token = localStorage.getItem("accessToken");

  try {
    const response = await fetch("https://localhost:7235/api/news", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...news,
        date: new Date(news.date).toISOString() // Ensure proper date format
      }),
    });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Something went wrong");
      }

      const newNewsItem = await response.json();
      setMessage("News added successfully!");
      setNews({ 
        title: "", 
        description: "", 
        content: "", 
        imageUrl: "",
        date: new Date().toISOString().split('T')[0]
      });
      
      // Call the callback function to update the news list
      if (onNewsAdded) {
        onNewsAdded(newNewsItem);
      }
    } catch (error) {
      setMessage(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="add-news-container">
      
      <div className="add-news-form">
      <button className="back-button" onClick={handleBack} type="button">
  ← Back to Dashboard
</button>

        <h2>Add News Article</h2>
        {message && (
          <div className={`message ${message.includes("successfully") ? "success" : "error"}`}>
            {message}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={news.title}
              onChange={handleChange}
              placeholder="Enter news title"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="description">Short Description</label>
            <textarea
              id="description"
              name="description"
              value={news.description}
              onChange={handleChange}
              placeholder="Enter a short description"
              required
              rows="3"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="content">Full Content</label>
            <textarea
              id="content"
              name="content"
              value={news.content}
              onChange={handleChange}
              placeholder="Enter the full content"
              required
              rows="5"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="imageUrl">Image URL</label>
            <input
              type="text"
              id="imageUrl"
              name="imageUrl"
              value={news.imageUrl}
              onChange={handleChange}
              placeholder="Enter image URL"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="date">Date</label>
            <input
              type="date"
              id="date"
              name="date"
              value={news.date}
              onChange={handleChange}
              required
            />
          </div>
          
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Adding..." : "Add News"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNewsForm;