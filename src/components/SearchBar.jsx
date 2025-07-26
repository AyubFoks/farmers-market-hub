import React from 'react';
//import './SearchBar.css';

function SearchBar({ searchText }) {
  return (
    <input
      className="search-input"
      type="text"
      value={searchText}
      placeholder="Search by name or location..."
    />
  );
}

export default SearchBar;