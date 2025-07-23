import React from 'react';
//import './SearchBar.css';

function SearchBar({ searchText, onSearchChange }) {
  return (
    <input
      className="search-input"
      type="text"
      value={searchText}
      onChange={(e) => onSearchChange(e.target.value)}
      placeholder="Search by name or location..."
    />
  );
}

export default SearchBar;