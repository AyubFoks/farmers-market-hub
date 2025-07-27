import React, { useState } from 'react';
import '../styles/components.css';
import img from '../assets/logo.svg';

function FarmersCard({ product, onDelete, onEdit }) {
  const { 
    name,
    description, 
    price, 
    quantity, 
    location, 
    image, 
    postedBy, 
    contact,
    unit, 
  } = product;
  
  const [showContact, setShowContact] = useState(false);

  // Toggle contact information visibility
  function toggleContact() {
    setShowContact(!showContact);
  }

  return (
    <div className="product-card">
      <img src={image || img} alt={name} />
      <h3>{name} </h3>
      <div className='price-quantity'>
        <p className='price'>Ksh {Number(price).toFixed(2)} <span className='unit'>/{unit}</span></p>
        <p className='unit'>Quantity: {quantity}</p>
      </div>
      <p>{description} </p>
      <div className='product-details'>
        <p><strong>Location:</strong> {location}</p>
        <p><strong>Posted by:</strong> {postedBy}</p>
      </div>
      <div className="product-card-actions">
        <button onClick={onEdit}>Edit</button>
        <button onClick={onDelete} className="delete-button">Delete</button>
        <button 
          onClick={toggleContact}
          className="contact-button"
        >
          {showContact ? 'Hide Contact' : 'Contact Seller'}
        </button>
        
        {showContact && (
          <div className="contact-info">
            <p>Contact: {contact || 'Not available'}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default FarmersCard;