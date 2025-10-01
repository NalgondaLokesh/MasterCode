import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "../../styles/components/SnippetCard.css";

const SnippetCard = ({ snippet, onEdit, onDelete }) => {
  if (!snippet) return null;

  const { user } = useAuth();
  const isOwner = user && snippet.createdBy && user.id === snippet.createdBy._id;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="snippet-card">
      <div className="snippet-header">
        <Link to={`/snippet/${snippet._id}`} className="snippet-title">
          <h3>{snippet.title}</h3>
        </Link>
        {isOwner && (
          <div className="snippet-actions">
            <button
              onClick={() => onEdit(snippet)}
              className="icon-btn edit-btn"
              title="Edit snippet"
            >
              ✏️
            </button>
            <button
              onClick={() => onDelete(snippet)}
              className="icon-btn delete-btn"
              title="Delete snippet"
            >
              🗑️
            </button>
          </div>
        )}
      </div>

      <p className="snippet-description">{snippet.description}</p>

      <div className="snippet-meta">
        <div className="meta-item">
          <span>👤 {snippet.createdBy.username}</span>
        </div>
        <div className="meta-item">
          <span>📅 {formatDate(snippet.createdAt)}</span>
        </div>
        <div className="language-badge">{snippet.programmingLanguage}</div>
      </div>

      <div className="snippet-tags">
        {snippet.tags.map((tag) => (
          <span key={tag} className="tag">
            #{tag}
          </span>
        ))}
      </div>

      <Link to={`/snippet/${snippet._id}`} className="view-snippet-btn">
        👀 View Code
      </Link>
    </div>
  );
};

export default SnippetCard;
