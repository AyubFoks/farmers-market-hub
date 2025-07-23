import React, { useState } from 'react';

function ProductForm({ onAddProduct }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [location, setLocation] = useState('');
  const [image, setImage] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
// For any field left blank
    if (!name || !price || !quantity || !location || !image) {
      alert("Please fill in the missing fields.");
      return;
    }

    const newProduct = {
      id: Date.now(),
      name,
      price,
      quantity,
      location,
      image
    };

    onAddProduct(newProduct);

    // To Reset form
    setName('');
    setPrice('');
    setQuantity('');
    setLocation('');
    setImage('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2> Post New Product </h2>

      <input
        type="text"
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Product Name"
      />

      <input
        type="text"
        value={price}
        onChange={e => setPrice(e.target.value)}
        placeholder="Price (Ksh/kg)"
      />

      <input
        type="text"
        value={quantity}
        onChange={e => setQuantity(e.target.value)}
        placeholder="Quantity"
      />

      <input
        type="text"
        value={location}
        onChange={e => setLocation(e.target.value)}
        placeholder="Enter Location"
      />

      <input
        type="text"
        value={image}
        onChange={e => setImage(e.target.value)}
        placeholder="Image URL"
      />

      <button type="submit">Add Product</button>
    </form>
  );
}

export default ProductForm;
