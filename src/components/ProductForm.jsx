import React, { useState, useEffect } from 'react';
import { db, ref, push, set, update } from "../api/firebase";
import { auth } from "../api/firebase";


function ProductForm({ initialData = null, onSubmit, onCancel }) {
  const [id, setId] = useState(initialData ? initialData.id : '');
  const [name, setName] = useState('');
  const [category, setCategory] = useState('General');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [contact, setContact] = useState('');
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);

  // Pre-fill form if editing
  useEffect(() => {
    if (initialData) {
      setId(initialData.id || '');
      setName(initialData.name || '');
      setCategory(initialData.category || 'General');
      setPrice(initialData.price || '');
      setQuantity(initialData.quantity || '');
      setUnit(initialData.unit || '');
      setLocation(initialData.location || '');
      setDescription(initialData.description || '');
      setImageUrl(initialData.image || '');
      setContact(initialData.contact || '');
      setVerified(initialData.verified || false);
    }
  }, [initialData]);

  // Cloudinary config
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

    if (!name || !category || !price || !quantity || !unit || !location || !description || (!imageFile && !imageUrl) || !contact) {
      alert("Please fill all the missing fields.");
      return;
    }

    setLoading(true);

    let finalImageUrl = imageUrl;
    if (imageFile) {
      try {
        finalImageUrl = await uploadToCloudinary(imageFile);
      } catch (err) {
        alert("Image upload failed.");
        setLoading(false);
        return;
      }
    }

    const user = auth.currentUser;
    const postedBy = user ? (user.displayName || user.email) : "Anonymous";

    const productData = {
      id,
      name,
      category,
      price: parseFloat(price),
      quantity: parseInt(quantity),
      unit: unit.trim(),
      location: location.trim(),
      description: description.trim(),
      image: finalImageUrl,
      contact: contact.trim(),
      postedBy,
      updatedAt: Date.now(),
      verified: verified
    };

    try {
      if (initialData && initialData.id) {
        // EDIT: Update existing product
        const productRef = ref(db, `products/${initialData.id}`);
        await update(productRef, productData);
        alert("Product updated successfully!");
        if (onSubmit) onSubmit({ ...productData, id: initialData.id }); // <-- pass updated product
      } else {
        // ADD: Create new product
        const productsRef = ref(db, "products");
        const newProductRef = push(productsRef);
        await set(newProductRef, { ...productData, createdAt: Date.now() });
        alert("Product posted successfully!");
        if (onSubmit) onSubmit();
      }
    } catch (err) {
      alert("Error posting product: " + err.message);
    }
    setLoading(false);
  }

  return (
    <form className='product-form' onSubmit={handleSubmit}>
      <h2>{initialData ? "EDIT PRODUCT" : "POST PRODUCT"}</h2>
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
        />
        {imageUrl && !imageFile && (
          <img src={imageUrl} alt="Current" style={{ width: 80, marginTop: 8 }} />
        )}
      </div>
      <button type="submit" disabled={loading}>
        {loading ? (initialData ? "Updating..." : "Posting...") : (initialData ? "Update Product" : "Add Product")}
      </button>
      {initialData && (
        <button type="button" onClick={onCancel} style={{ marginLeft: 10 }}>
          Cancel
        </button>
      )}
    </form>
  );
}

export default ProductForm;
