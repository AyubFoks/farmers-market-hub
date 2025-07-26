import React from 'react';
import '../styles/components.css';

function SearchFilter({ products, selectedCategory, onFilterChange }) {
  const categories = Array.from(new Set(products.map(p => p.category)));

  return (
    <div className="filter-sidebar">
      <h4>Filter by Category</h4>
      <select>
        <option
          onChange={() => onFilterChange('')}
          className={selectedCategory === '' ? 'active' : ''}
        >
          All
        </option>
        {categories.map((category, idx) => (
          <option
            key={idx}
            onChange={() => onFilterChange(category)}
            className={selectedCategory === category ? 'active' : ''}
          >
            {category}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SearchFilter;