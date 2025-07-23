import React from 'react';
import '../styles/components.css';
import img from '../assets/logo.svg';

function ProductCard({ product, onDelete }) {
  const { id, name, price, quantity, location, image } = product;

  function handleDelete() {
    onDelete(id); // Delete by product ID
  }

  return (
    <div className="product-card">
      <img src={image || img} alt={name} width="150" />
      <h3>{name}</h3>
      <p>Price: Ksh {Number(price).toFixed(2)}</p>
      <p>Quantity: {quantity}</p>
      <p>Location: {location}</p>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}

export default ProductCard;
