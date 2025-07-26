import React, { useState } from 'react';
import '../styles/components.css';
import img from '../assets/logo.svg';

function ProductCard({ product, onDelete }) {
  const { 
    id, 
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
      <hr />
      <div className="product-card-actions">
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

export default ProductCard;