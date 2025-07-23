import React, { useState } from "react";
import ProductForm from "../components/ProductForm";
import ProductCard from "../components/ProductCard";

function FarmersHub() {
  const [products, setProducts] = useState([]);

  function handleAddProduct(newProduct) {
    setProducts([...products, newProduct]);
  }

  function handleDeleteProduct(name) {
    setProducts(products.filter((p) => p.name !== name));
  }

  return (
    <div className="farmers-hub">
      <h1> Welcome to the Farmers Hub! </h1>
      <p> Post your products here and connect with buyers across the country. </p>
      <ProductForm onSubmit={handleAddProduct} />

      <div className="product-grid">
        {products.map((product, idx) => (
          <ProductCard
            key={idx}
            product={product}
            onDelete={handleDeleteProduct}
          />
        ))}
      </div>
    </div>
  );
}

export default FarmersHub;
