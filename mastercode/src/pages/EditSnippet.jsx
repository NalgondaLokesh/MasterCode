import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import SnippetForm from "../components/snippets/SnippetForm";
import LoadingSpinner from "../components/common/LoadingSpinner";
import snippetService from "../services/snippetService";
import "../styles/pages/EditSnippet.css";

const EditSnippet = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [snippet, setSnippet] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchSnippet = async () => {
      setIsLoading(true);
      try {
        const response = await snippetService.getSnippetById(id);
        const fetchedSnippet = response.data.data;

        if (!fetchedSnippet) {
          navigate("/");
          return;
        }

        // Check if user owns the snippet
        if (user && user.id !== fetchedSnippet.author._id) {
          navigate("/");
          return;
        }

        setSnippet(fetchedSnippet);
      } catch (error) {
        console.error("Error fetching snippet:", error);
        navigate("/");
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      fetchSnippet();
    }
  }, [id, user, navigate]);

  const handleSubmit = async (formData) => {
    setIsSubmitting(true);
    try {
      await snippetService.updateSnippet(id, formData);
      navigate(`/snippets/${id}`);
    } catch (error) {
      console.error("Error updating snippet:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate(`/snippets/${id}`);
  };

  if (isLoading) {
    return <LoadingSpinner text="Loading snippet..." />;
  }

  if (!snippet) {
    return <div>Snippet not found</div>;
  }

  return (
    <div className="edit-snippet-page page-content">
      <div className="page-header">
        <button onClick={handleCancel} className="back-btn">
          ← Back to Snippet
        </button>
        <h1>Edit Snippet</h1>
      </div>

      <div className="form-container">
        <SnippetForm
          snippet={snippet}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isLoading={isSubmitting}
        />
      </div>
    </div>
  );
};

export default EditSnippet;
