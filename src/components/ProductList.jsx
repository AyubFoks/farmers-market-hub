import React from 'react';

function ProductList({ product, searchText }) {
    const myProduct = product.filter(item =>
      item.name.toLowerCase().includes(searchText.toLowerCase())
    );
  
    return (
      <div className="product-list">
        {myProduct.length > 0 ? (
          myProduct.map(item => (
            <div key={item.id}>
              <strong>{item.name}</strong><br/>
              Price: {item.price}<br />
              Quantity: {item.quantity}
              Location: {item.location}<br />
              <img src={item.image} alt={item.name} style={{ width: '100px', height: '100px' }} />
              <br />
             <button onClick={() => alert(`Added ${item.name} to cart!`)}>Add to Cart</button>
            </div>
          ))
        ) : (
          <p> Product Not Found.</p>
        )}
      </div>
    );
  }