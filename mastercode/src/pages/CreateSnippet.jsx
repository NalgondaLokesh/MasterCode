import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import SnippetForm from "../components/snippets/SnippetForm";
import LoadingSpinner from "../components/common/LoadingSpinner";
import snippetService from "../services/snippetService";
import "../styles/pages/CreateSnippet.css";

const CreateSnippet = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = React.useState(false);

  // Redirect if not authenticated
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login", {
        state: { from: "/create" },
        replace: true,
      });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (formData) => {
    setIsLoading(true);
    try {
      const response = await snippetService.createSnippet(formData);
      // The backend returns { success: true, data: snippet }
      if (response?.data?.data?._id) {
        navigate(`/snippets/${response.data.data._id}`);
      } else {
        throw new Error("No snippet ID received in response");
      }
    } catch (error) {
      console.error("Error creating snippet:", error);
      alert(error.response?.data?.message || "Failed to create snippet. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/");
  };

  if (!isAuthenticated) {
    return <LoadingSpinner text="Redirecting..." />;
  }

  return (
    <div className="create-snippet-page page-content">
      <div className="page-header">
        <button onClick={handleCancel} className="back-btn">
          ← Back to Snippets
        </button>
        <h1>Create New Snippet</h1>
      </div>

      <div className="form-container">
        <SnippetForm
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default CreateSnippet;
