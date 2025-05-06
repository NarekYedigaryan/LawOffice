import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/AdminDashboard.css";
import { 
  FiMail, 
  FiUser, 
  FiClock, 
  FiMessageSquare, 
  FiAlertCircle, 
  FiLogOut, 
  FiChevronDown, 
  FiChevronUp,
  FiPlusCircle 
} from "react-icons/fi";

const AdminDashboard = ({ user, onLogout }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [expandedMessageId, setExpandedMessageId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      navigate("/admin/login");
      return;
    }

    const fetchMessages = async () => {
      try {
        const response = await fetch("https://localhost:7235/api/admin/messages", {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });

        if (!response.ok) {
          if (response.status === 401) {
            onLogout();
            navigate("/admin/login");
            return;
          }
          throw new Error("Failed to fetch messages");
        }

        const data = await response.json();
        setMessages(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [navigate, onLogout]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleLogout = () => {
    onLogout();
    navigate("/admin/login");
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="spinner"></div>
        <p>Loading messages...</p>
      </div>
    );
  }

  const localUser = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="admin-dashboard-container">
      <main className="dashboard-content">
        {error && (
          <div className="error-message">
            <FiAlertCircle className="error-icon" />
            <span>{error}</span>
          </div>
        )}

        <section className="messages-section">
          <div className="section-header">
            <h2><FiMessageSquare className="section-icon" /> Contact Messages</h2>
            <p className="section-subtitle">Review and manage user inquiries</p>

            <header className="dashboard-header">
              <div className="user-welcome"></div>
              <div className="header-actions">
                <div className="stats-card">
                  <FiMail className="stat-icon" />
                  <div>
                    <span className="stat-number">{messages.length}</span>
                    <span className="stat-label">Total Messages</span>
                  </div>
                </div>
                <button
    className="add-news-button"
    onClick={() => navigate("/admin/news")}
  >
    <FiPlusCircle className="button-icon" />
    Add News
  </button>
                <button className="logout-button" onClick={handleLogout}>
                  <FiLogOut className="button-icon" />
                  Logout
                </button>
              </div>
            </header>
          </div>

          {messages.length === 0 ? (
            <div className="empty-state">
              <FiMail className="empty-icon" />
              <p>No messages found</p>
            </div>
          ) : (
            <div className="messages-table-container">
              <table className="messages-table">
                <thead>
                  <tr>
                    <th><FiUser /> Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Subject</th>
                    <th>Message</th>
                    <th><FiClock /> Date</th>
                  </tr>
                </thead>
                <tbody>
                  {messages.map((message) => (
                    <tr key={message.id}>
                      <td className="user-cell">
                        <span className="user-name">{message.fullName}</span>
                      </td>
                      <td className="email-cell">{message.email}</td>
                      <td className="phone-cell">{message.phoneNumber || "—"}</td>
                      <td className="subject-cell">{message.subject}</td>
                      <td
                        className={`message-cell ${expandedMessageId === message.id ? "expanded" : ""}`}
                        onClick={() =>
                          setExpandedMessageId(expandedMessageId === message.id ? null : message.id)
                        }
                      >
                        {message.message}
                      </td>
                      <td className="date-cell">{formatDate(message.createdAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;