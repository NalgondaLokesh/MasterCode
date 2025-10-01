import React, { useState } from "react";
import { programmingLanguages } from "../../utils";
import "../../styles/components/SnippetForm.css";

const SnippetForm = ({ snippet, onSubmit, onCancel, isLoading = false }) => {
  const [formData, setFormData] = useState({
    title: snippet?.title || "",
    description: snippet?.description || "",
    code: snippet?.code || "",
    programmingLanguage: snippet?.programmingLanguage || "javascript",
    tags: snippet?.tags?.join(", ") || "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    } else if (formData.title.length < 3) {
      newErrors.title = "Title must be at least 3 characters long";
    }

    if (!formData.code.trim()) {
      newErrors.code = "Code is required";
    } else if (formData.code.length < 10) {
      newErrors.code = "Code snippet must be at least 10 characters long";
    }

    if (!formData.programmingLanguage) {
      newErrors.programmingLanguage = "Programming language is required";
    }

    if (formData.description && formData.description.length > 500) {
      newErrors.description = "Description must not exceed 500 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    if (!validateForm()) {
      return;
    }

    const submitData = {
      ...formData,
      tags: formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag),
    };

    onSubmit(submitData);
  };

  return (
    <form onSubmit={handleSubmit} className="snippet-form">
      <div className="form-group">
        <label htmlFor="title">Title *</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className={errors.title ? "error" : ""}
          placeholder="Enter snippet title"
        />
        {errors.title && <span className="error-message">{errors.title}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="3"
          placeholder="Describe what this code does..."
        />
      </div>

      <div className="form-group">
        <label htmlFor="programmingLanguage">Programming Language *</label>
        <select
          id="programmingLanguage"
          name="programmingLanguage"
          value={formData.programmingLanguage}
          onChange={handleChange}
          className={errors.programmingLanguage ? "error" : ""}
        >
          <option value="">Select a language</option>
          {programmingLanguages.map((lang) => (
            <option key={lang} value={lang}>
              {lang.charAt(0).toUpperCase() + lang.slice(1)}
            </option>
          ))}
        </select>
        {errors.programmingLanguage && (
          <span className="error-message">{errors.programmingLanguage}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="code">Code *</label>
        <textarea
          id="code"
          name="code"
          value={formData.code}
          onChange={handleChange}
          rows="12"
          className={`code-textarea ${errors.code ? "error" : ""}`}
          placeholder="Paste your code here..."
        />
        {errors.code && <span className="error-message">{errors.code}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="tags">Tags</label>
        <input
          type="text"
          id="tags"
          name="tags"
          value={formData.tags}
          onChange={handleChange}
          placeholder="comma, separated, tags"
        />
        <small>Separate tags with commas</small>
      </div>

      <div className="form-actions">
        <button
          type="button"
          onClick={onCancel}
          className="btn btn-secondary"
          disabled={isLoading}
        >
          Cancel
        </button>
        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          {isLoading
            ? "Saving..."
            : snippet
              ? "Update Snippet"
              : "Create Snippet"}
        </button>
      </div>
    </form>
  );
};

export default SnippetForm;
