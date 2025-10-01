import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import SnippetCard from "../components/snippets/SnippetCard";
import LoadingSpinner from "../components/common/LoadingSpinner";
import snippetService from "../services/snippetService";
import "../styles/pages/Profile.css";

const Profile = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [userSnippets, setUserSnippets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    totalSnippets: 0,
    totalViews: 0,
    favoriteLanguages: [],
    recentActivity: []
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login", { state: { from: "/profile" }, replace: true });
      return;
    }

    const fetchUserData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Fetch user's snippets
        const snippetsResponse = await snippetService.getUserSnippets();
        const snippets = Array.isArray(snippetsResponse.data) ? snippetsResponse.data : [];

        // Calculate statistics
        const totalViews = snippets.reduce((acc, snippet) => acc + (snippet.views || 0), 0);
        const languages = snippets.reduce((acc, snippet) => {
          acc[snippet.programmingLanguage] = (acc[snippet.programmingLanguage] || 0) + 1;
          return acc;
        }, {});

        const favoriteLanguages = Object.entries(languages)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 3)
          .map(([lang]) => lang);

        setStats({
          totalSnippets: snippets.length,
          totalViews,
          favoriteLanguages,
          recentActivity: snippets.slice(0, 5)
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError(error.response?.data?.message || "Failed to load profile data");
        setUserSnippets([]);
        setStats({
          totalSnippets: 0,
          totalViews: 0,
          favoriteLanguages: [],
          recentActivity: []
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [isAuthenticated, navigate]);

  const handleEdit = (snippetId) => {
    navigate(`/edit/${snippetId}`);
  };

  const handleDelete = async (snippetId) => {
    if (window.confirm("Are you sure you want to delete this snippet?")) {
      try {
        await snippetService.deleteSnippet(snippetId);
        setUserSnippets(snippets => snippets.filter(s => s._id !== snippetId));
      } catch (error) {
        console.error("Error deleting snippet:", error);
        alert("Failed to delete snippet. Please try again.");
      }
    }
  };

  if (!isAuthenticated) {
    return <div className="profile-page">Please log in to view your profile.</div>;
  }

  if (isLoading) {
    return (
      <div className="profile-page">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="profile-page">
        <div className="error-message">
          <p>{error}</p>
          <button onClick={() => window.location.reload()} className="button">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page page-content">
      <div className="page-header">
        <h1>My Profile</h1>
      </div>

      <div className="profile-container">
        <div className="profile-card">
          <div className="profile-header">
            <div className="profile-avatar">👤</div>
            <div className="profile-info">
              <h2>{user.username}</h2>
              <p className="profile-role">
                🎯 {user.role?.charAt(0).toUpperCase() + user.role?.slice(1) || "Member"}
              </p>
            </div>
          </div>

          <div className="profile-details">
            <div className="stats-grid">
              <div className="stat-card">
                <h3>Total Snippets</h3>
                <p className="stat-number">{stats.totalSnippets}</p>
              </div>
              <div className="stat-card">
                <h3>Total Views</h3>
                <p className="stat-number">{stats.totalViews}</p>
              </div>
              <div className="stat-card">
                <h3>Favorite Languages</h3>
                <div className="language-tags">
                  {stats.favoriteLanguages.map(lang => (
                    <span key={lang} className="language-tag">{lang}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="profile-sections">
              <section className="snippets-section">
                <h2>My Snippets</h2>
                <div className="snippets-grid">
                  {userSnippets.length > 0 ? (
                    userSnippets.map(snippet => (
                      <SnippetCard
                        key={snippet._id}
                        snippet={snippet}
                        onEdit={() => handleEdit(snippet._id)}
                        onDelete={() => handleDelete(snippet._id)}
                      />
                    ))
                  ) : (
                    <div className="no-snippets">
                      <p>You haven't created any snippets yet.</p>
                      <button onClick={() => navigate("/create")} className="button">
                        Create Your First Snippet
                      </button>
                    </div>
                  )}
                </div>
              </section>

              <section className="activity-section">
                <h2>Recent Activity</h2>
                <div className="activity-timeline">
                  {stats.recentActivity.map(activity => (
                    <div key={activity._id} className="activity-item">
                      <span className="activity-date">
                        {new Date(activity.updatedAt).toLocaleDateString()}
                      </span>
                      <span className="activity-description">
                        Updated snippet: {activity.title}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            </div>
            <div className="detail-item">
              <div>
                <span className="detail-label">📧 Email</span>
                <span className="detail-value">{user?.email || 'N/A'}</span>
              </div>
            </div>

            <div className="detail-item">
              <div>
                <span className="detail-label">👤 Username</span>
                <span className="detail-value">{user?.username || 'N/A'}</span>
              </div>
            </div>

            <div className="detail-item">
              <div>
                <span className="detail-label">🎯 Role</span>
                <span className="detail-value">
                  {user?.role ? `${user.role.charAt(0).toUpperCase()}${user.role.slice(1)}` : 'Member'}
                </span>
              </div>
            </div>

            <div className="detail-item">
              <div>
                <span className="detail-label">📅 Member since</span>
                <span className="detail-value">
                  {user?.createdAt ? new Date(user.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }) : 'N/A'}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="profile-stats">
          <h3>My Statistics</h3>
          <div className="stats-grid">
            <div className="stat-card">
              <span className="stat-number">5</span>
              <span className="stat-label">Snippets Created</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">12</span>
              <span className="stat-label">Total Views</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">3</span>
              <span className="stat-label">Languages Used</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
