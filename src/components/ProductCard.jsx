import  React from 'react';
import '../styles/components.css';
import img from '../assets/logo.svg';



function ProductCard({ product }) {
    return (
        <div className="product-card">
            <img src='../assets/logo.svg' alt={product.name} className="product-image" />
            <h3 className="product-name">{product.name}</h3>
            <p className="product-price">${product.price.toFixed(2)}</p>
            <button className="view-details">View Details</button>
        </div>
    );
}

export default ProductCard;