import React from 'react';
import '../styles/components.css';

function SearchFilter({ products, selectedCategory, onFilterChange }) {
  const categories = Array.from(new Set(products.map(p => p.category)));

  return (
    <div className="filter-sidebar">
      <h4>Filter by Category</h4>
      <ul>
        <li
          onClick={() => onFilterChange('')}
          className={selectedCategory === '' ? 'active' : ''}
        >
          All
        </li>
        {categories.map((category, idx) => (
          <li
            key={idx}
            onClick={() => onFilterChange(category)}
            className={selectedCategory === category ? 'active' : ''}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchFilter;