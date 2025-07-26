import React, { useState } from 'react';
import { db, ref, push, set } from "../api/firebase";
import { auth } from "../api/firebase";

function ProductForm() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!name || !price || !quantity || !unit || !location || !description || (!imageFile && !imageUrl)) {
      alert("Please fill all the missing fields.");
      return;
    }

    setLoading(true);

    let finalImageUrl = imageUrl;

    const user = auth.currentUser;
    const postedBy = user ? (user.displayName || user.email) : "Anonymous";

    const newProduct = {
      name,
      price: parseFloat(price),
      quantity: parseInt(quantity),
      unit: unit.trim(),
      location: location.trim(),
      description: description.trim(),
      image: finalImageUrl,
      postedBy,
      createdAt: Date.now()
    };

    try {
      const productsRef = ref(db, "products");
      const newProductRef = push(productsRef);
      await set(newProductRef, newProduct);

      // Reset form
      setName('');
      setPrice('');
      setQuantity('');
      setUnit('');
      setLocation('');
      setDescription('');
      setImageFile(null);
      setImageUrl('');
      alert("Product posted successfully!");
    } catch (err) {
      alert("Error posting product: " + err.message);
    }
    setLoading(false);
  }

  return (
    <form className='product-form' onSubmit={handleSubmit}>
      <h2>POST PRODUCT</h2>

      <input
        type="text"
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Product Name"
        required
      />

      <input
        type="number"
        value={price}
        onChange={e => setPrice(e.target.value)}
        placeholder="Price"
        required
      />

      <div style={{ display: "flex", gap: "10px" }}>
        <input
          type="number"
          value={quantity}
          onChange={e => setQuantity(e.target.value)}
          placeholder="Quantity"
          required
          style={{ flex: 2 }}
        />
        <input
          type="text"
          value={unit}
          onChange={e => setUnit(e.target.value)}
          placeholder="Unit (e.g. kg, bags, crates)"
          required
          style={{ flex: 3 }}
        />
      </div>

      <input
        type="text"
        value={location}
        onChange={e => setLocation(e.target.value)}
        placeholder="Enter Location"
        required
      />

      <textarea
        value={description}
        onChange={e => setDescription(e.target.value)}
        placeholder="Product Description"
        rows={3}
        required
      />

      <input
        type="text"
        value={imageUrl}
        onChange={e => setImageUrl(e.target.value)}
        placeholder="Image URL"
        required={!imageFile}
      />

      {/* Placeholder for file upload (optional) */}
      {/* <input
        type="file"
        accept="image/*"
        onChange={e => setImageFile(e.target.files[0])}
      /> */}

      <button type="submit" disabled={loading}>
        {loading ? "Posting..." : "Add Product"}
      </button>
    </form>
  );
}

export default ProductForm;
