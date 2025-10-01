import React from "react";
import { programmingLanguages } from "../../utils";
import "../../styles/components/FilterBar.css";

const FilterBar = ({ filters, onFiltersChange }) => {
  const { language, sortBy } = filters;

  const handleLanguageChange = (e) => {
    onFiltersChange({
      ...filters,
      language: e.target.value,
    });
  };

  const handleSortChange = (e) => {
    onFiltersChange({
      ...filters,
      sortBy: e.target.value,
    });
  };

  const clearFilters = () => {
    onFiltersChange({
      language: "",
      tags: "",
      sortBy: "newest",
    });
  };

  const hasActiveFilters = language;

  return (
    <div className="filter-bar">
      <div className="filter-header">
        <span>📊 Filters</span>
        {hasActiveFilters && (
          <button onClick={clearFilters} className="clear-filters-btn">
            ✕ Clear
          </button>
        )}
      </div>

      <div className="filter-controls">
        <div className="filter-group">
          <label htmlFor="language">Language</label>
          <select
            id="language"
            value={language}
            onChange={handleLanguageChange}
          >
            <option value="">All Languages</option>
            {programmingLanguages.map((lang) => (
              <option key={lang} value={lang}>
                {lang.charAt(0).toUpperCase() + lang.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="sortBy">Sort By</label>
          <select id="sortBy" value={sortBy} onChange={handleSortChange}>
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="title">Title A-Z</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
