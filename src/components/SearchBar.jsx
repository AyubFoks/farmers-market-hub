import  React from 'react';
import '../styles/components.css';

function SearchBar({ searchTerm, setSearchTerm }) {
  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder="Search..."
        className="search-input"
      />
    </div>
  );
}

export default SearchBar;