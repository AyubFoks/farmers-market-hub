import React, { useState } from 'react';
import { db, ref, push, set } from "../api/firebase";
import { auth } from "../api/firebase";


function ProductForm() {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('General');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [contact, setContact] = useState('');
  const [loading, setLoading] = useState(false);

  // Replace with your Cloudinary unsigned upload preset and cloud name
  const CLOUDINARY_UPLOAD_PRESET = "Farmers-Connect";
  const CLOUDINARY_CLOUD_NAME = "dbnqkctmx";

  async function uploadToCloudinary(file) {
    const url = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    const res = await fetch(url, {
      method: "POST",
      body: formData
    });
    const data = await res.json();
    return data.secure_url;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!name || !category || !price || !quantity || !unit || !location || !description || !imageFile || !contact) {
      alert("Please fill all the missing fields.");
      return;
    }

    setLoading(true);

    let finalImageUrl = "";
    try {
      finalImageUrl = await uploadToCloudinary(imageFile);
    } catch (err) {
      alert("Image upload failed.");
      setLoading(false);
      return;
    }

    const user = auth.currentUser;
    const postedBy = user ? (user.displayName || user.email) : "Anonymous";

    const newProduct = {
      name,
      category: "General",
      price: parseFloat(price),
      quantity: parseInt(quantity),
      unit: unit.trim(),
      location: location.trim(),
      description: description.trim(),
      image: finalImageUrl,
      contact: contact.trim(),
      postedBy,
      createdAt: Date.now()
    };

    try {
      const productsRef = ref(db, "products");
      const newProductRef = push(productsRef);
      await set(newProductRef, newProduct);

      // Reset form
      setName('');
      setCategory('');
      setPrice('');
      setQuantity('');
      setUnit('');
      setLocation('');
      setDescription('');
      setImageFile(null);
      setContact('');
      alert("Product posted successfully!");
    } catch (err) {
      alert("Error posting product: " + err.message);
    }
    setLoading(false);
  }

  return (
    <form className='product-form' onSubmit={handleSubmit}>
      <h2>POST PRODUCT</h2>
      <div className='product-form-container'>
        <div className='product-form-fields'>
          <label htmlFor="Product Name">Product name</label>
          <input className='text-input'
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Enter Product Name"
            required
          />
        </div>

        <div className='product-form-fields'>
          <label htmlFor="Category">Select Category</label>
          <select className='text-input'
            value={category}
            onChange={e => setCategory(e.target.value)}
            required
          >
            <option value="General">General</option>
            <option value="Fruits">Fruits</option>
            <option value="Vegetables">Vegetables</option>
            <option value="Grains">Grains</option>
            <option value="Dairy">Dairy</option>
            <option value="Meat">Meat</option>
            <option value="Poultry">Poultry</option>
            <option value="Fish">Fish</option>
            <option value="Herbs">Herbs</option>
            <option value="Spices">Spices</option>
            <option value="Other">Other</option>
          </select></div>
      </div>

      <div className='product-form-container'>
        <div className='product-form-fields'>
          <label htmlFor="Price">Price</label>
          <input className='text-input'
            type="number"
            value={price}
            onChange={e => setPrice(e.target.value)}
            placeholder="Enter price per unit"
            required
          />
        </div>

        <div className='product-form-fields'>
          <label htmlFor="Quantity">Quantity</label>
          <input className='text-input'
            type="number"
            value={quantity}
            onChange={e => setQuantity(e.target.value)}
            placeholder="Enter quantity"
            required
            style={{ flex: 2 }}
          />
        </div>

        <div className='product-form-fields'>
          <label htmlFor="Unit">Unit</label>
          <input className='text-input'
            type="text"
            value={unit}
            onChange={e => setUnit(e.target.value)}
            placeholder="e.g. kg, bag, crate, tray, etc."
            required
            style={{ flex: 3 }}
          />
        </div>
      </div>

      <div className='product-form-container'>
        <div className='product-form-fields'>
        <label htmlFor="Location">Location</label>
        <input className='text-input'
          type="text"
          value={location}
          onChange={e => setLocation(e.target.value)}
          placeholder="Enter Location"
          required
        />
      </div>

      <div className='product-form-fields'>
        <label htmlFor="Contact">Contact Information</label>
        <input className='text-input'
          type="text"
          value={contact}
          onChange={e => setContact(e.target.value)}
          placeholder="Enter your contact info"
          required
        />
      </div>
      </div>

      <div className='product-form-fields'>
        <label htmlFor="Description">Description</label>
        <textarea className='text-input'
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="Insert a short description of the product"
          rows={3}
          required
        />
      </div>

      <div className='product-form-fields'>
        <label htmlFor="Image">Product Image</label>
        <input className='file-upload'
          type="file"
          accept="image/*"
          onChange={e => setImageFile(e.target.files[0])}
          required
        />
      </div>

      <button type="submit" disabled={loading}>
        {loading ? "Posting..." : "Add Product"}
      </button>
    </form>
  );
}

export default ProductForm;
