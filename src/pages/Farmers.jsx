import React, { useState, useEffect } from "react";
import ProductSidebar from "../components/ProductSidebar";
import ProductForm from "../components/ProductForm";
import FarmersCard from "../components/FarmersCard";
import Sidebar from "../components/Sidebar";
import { db, ref, onValue, remove, update } from "../api/firebase";
import { auth } from "../api/firebase";

function FarmersHub() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [filters, setFilters] = useState({
    price: "",
    location: "",
    category: ""
  });
  const [user, setUser] = useState(null);

  // Track current user
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser);
    return () => unsubscribe();
  }, []);

  // Fetch all products from Firebase
  useEffect(() => {
    const productsRef = ref(db, "products");
    const unsubscribe = onValue(productsRef, (snapshot) => {
      const data = snapshot.val();
      const productsArray = data
        ? Object.entries(data).map(([id, value]) => ({ id, ...value }))
        : [];
      setProducts(productsArray);
    });
    return () => unsubscribe();
  }, []);

  // Filter products to only those posted by the current user
  useEffect(() => {
    if (!user) {
      setFiltered([]);
      return;
    }
    let updated = products.filter(
      (product) =>
        product.postedBy === (user.displayName || user.email)
    );

    // Search filter
    if (searchText) {
      updated = updated.filter(product =>
        product.name.toLowerCase().includes(searchText.toLowerCase()) ||
        (product.location && product.location.toLowerCase().includes(searchText.toLowerCase()))
      );
    }

    // Price filter
    if (filters.price) {
      updated = updated.filter(product =>
        Number(product.price) <= Number(filters.price)
      );
    }

    // Location filter
    if (filters.location) {
      updated = updated.filter(product =>
        product.location === filters.location
      );
    }

    // Category filter
    if (filters.category) {
      updated = updated.filter(product =>
        product.category === filters.category
      );
    }

    setFiltered(updated);
  }, [products, user, searchText, filters]);

  // Add product (handled by ProductForm, which writes to Firebase)
  function handleAddProduct() {
    // No need to update state here, Firebase listener will update products
    setEditingProduct(null);
  }

  // Update product in Firebase
  async function handleUpdateProduct(updatedProduct) {
    if (!updatedProduct.id) return;
    const productRef = ref(db, `products/${updatedProduct.id}`);
    await update(productRef, updatedProduct);
    setEditingProduct(null);
  }

  // Delete product in Firebase
  async function handleDeleteProduct(id) {
    if (!id) return;
    const productRef = ref(db, `products/${id}`);
    await remove(productRef);
  }

  return (
    <div className="home-container">
      <Sidebar />
      <div className="main-content">
        <h1> Welcome to the Farmers Hub! </h1>
        <p> Post your products here and connect with buyers across the country. </p>
        {/* Show add form only if not editing */}
        {!editingProduct && (
          <ProductForm onSubmit={handleAddProduct} />
        )}
        {/* ProductSidebar for filtering */}
        <ProductSidebar
          products={products}
          onSearch={setSearchText}
          onFilter={setFilters}
        />
        <div className="farmer-product-grid">
          {filtered.length === 0 ? (
            <p>No products found.</p>
          ) : (
            filtered.map((product) =>
              editingProduct && editingProduct.id === product.id ? (
                <ProductForm
                  key={product.id}
                  initialData={editingProduct}
                  onSubmit={handleUpdateProduct}
                  onCancel={() => setEditingProduct(null)}
                />
              ) : (
                <FarmersCard
                  key={product.id}
                  product={product}
                  onDelete={() => handleDeleteProduct(product.id)}
                  onEdit={() => setEditingProduct(product)}
                />
              )
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default FarmersHub;
