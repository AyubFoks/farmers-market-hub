import React from 'react';
import '../styles/components.css';
import img from '../assets/logo.svg';

function ProductCard({ product, onDelete }) {
  const { name, price, quantity, location, image, farmer, available } = product;

  return (
    <div className="product-card">
      <img src={image || img} alt={name} width="150" />
      <h3>{name}</h3>
      <p>Price: Ksh {Number(price).toFixed(2)}</p>
      <p>Quantity: {quantity}</p>
      <p>Location: {location}</p>
      <p>Farmer: {farmer}</p>
      <p>Availabilty: {available}</p>
    </div>
  );
}

export default ProductCard;
