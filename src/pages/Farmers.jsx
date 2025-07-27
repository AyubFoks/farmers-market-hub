import React, { useState, useEffect } from "react";
import FarmersSearchBar from "../components/FarmersSearchBar";
import ProductForm from "../components/ProductForm";
import FarmersCard from "../components/FarmersCard";
import Sidebar from "../components/Sidebar";
import { db, ref, onValue, remove, update } from "../api/firebase";
import { auth } from "../api/firebase";
import { onAuthStateChanged } from "firebase/auth";

function FarmersHub() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);

  // Track current user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        const userRef = ref(db, `products/${firebaseUser.postedBy}`);
        onValue(userRef, (snapshot) => {
          setUserProfile(snapshot.val());
        });
      } else {
        setUserProfile(null);
      }
    });
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

    setFiltered(updated);
  }, [products, user, searchText]);

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

  if (userProfile && !userProfile.verified) {
    return (
      <div className="main-content">
        <h2>Access Denied</h2>
        <p>You must be a <b>verified farmer</b> to post produce. Please contact admin.</p>
      </div>
    );
  }

  else return (
    <div className="home-container">
      <Sidebar />
      <div className="main-content">
        <h1> Welcome to the Farmers Hub! </h1>
        <p> Post your products here and connect with buyers across the country. </p>
        <p> To join our community of verified and trusted farmers, email us at verifyme@farmershub.com </p>
        {/* Show add form only if not editing */}
        {!editingProduct && (
          <ProductForm onSubmit={handleAddProduct} />
        )}
        {/* FarmersSearchBar for filtering */}
        <h1>Your Products</h1>
        <FarmersSearchBar
          products={products}
          onSearch={setSearchText}
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
