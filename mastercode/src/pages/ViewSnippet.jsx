import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import CodeDisplay from "../components/snippets/CodeDisplay";
import LoadingSpinner from "../components/common/LoadingSpinner";
import snippetService from "../services/snippetService";
import "../styles/pages/ViewSnippet.css";

const ViewSnippet = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [snippet, setSnippet] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSnippet = async () => {
      setIsLoading(true);
      try {
        const response = await snippetService.getSnippetById(id);
        setSnippet(response.data.data);
      } catch (error) {
        console.error("Error fetching snippet:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSnippet();
  }, [id]);

  const isOwner = user && snippet && user.id === snippet.author._id;

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete "${snippet.title}"?`)) {
      try {
        await snippetService.deleteSnippet(snippet._id);
        navigate("/");
      } catch (error) {
        console.error("Error deleting snippet:", error);
      }
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isLoading) {
    return <LoadingSpinner text="Loading snippet..." />;
  }

  if (!snippet) {
    return (
      <div className="error-page">
        <h2>❌ Snippet Not Found</h2>
        <p>The snippet you're looking for doesn't exist.</p>
        <Link to="/" className="btn btn-primary">
          ← Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="view-snippet-page page-content">
      <div className="page-header">
        <Link to="/" className="back-btn">
          ← Back to Snippets
        </Link>

        {isOwner && (
          <div className="snippet-actions">
            <Link to={`/edit/${snippet._id}`} className="btn btn-secondary">
              ✏️ Edit
            </Link>
            <button onClick={handleDelete} className="btn btn-danger">
              🗑️ Delete
            </button>
          </div>
        )}
      </div>

      <article className="snippet-detail">
        <header className="snippet-header">
          <h1>{snippet.title}</h1>
          <p className="snippet-description">{snippet.description}</p>

          <div className="snippet-meta-grid">
            <div className="meta-item">
              <div>
                <span className="meta-label">👤 Author</span>
                <span className="meta-value">{snippet.author.username}</span>
              </div>
            </div>

            <div className="meta-item">
              <div>
                <span className="meta-label">📅 Created</span>
                <span className="meta-value">
                  {formatDate(snippet.createdAt)}
                </span>
              </div>
            </div>

            <div className="meta-item">
              <div className="language-display">
                <span className="meta-label">Language</span>
                <span className="language-badge large">
                  {snippet.programmingLanguage}
                </span>
              </div>
            </div>
          </div>

          {snippet.tags.length > 0 && (
            <div className="snippet-tags">
              <span>🏷️ Tags: </span>
              {snippet.tags.map((tag) => (
                <span key={tag} className="tag">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        <div className="code-section">
          <CodeDisplay
            code={snippet.code}
            language={snippet.programmingLanguage}
          />
        </div>
      </article>
    </div>
  );
};

export default ViewSnippet;