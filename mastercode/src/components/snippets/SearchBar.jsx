import React from "react";
import "../../styles/components/SearchBar.css";

const SearchBar = ({ value, onChange, placeholder = "Search snippets..." }) => {
  return (
    <div className="search-bar">
      <span className="search-icon"></span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="search-input"
      />
    </div>
  );
};

export default SearchBar;
