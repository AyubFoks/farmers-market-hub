import React, { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import ProductSidebar from "../components/ProductSidebar";
import '../styles/components.css';
import { db, ref, onValue } from "../api/firebase";
import { off } from "firebase/database";

function Marketplace() {
    const [products, setProducts] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [filters, setFilters] = useState({
        price: "",
        location: "",
        category: ""
    });

    // Fetch products from Firebase Realtime Database
    useEffect(() => {
        const productsRef = ref(db, "products");
        const handleValueChange = snapshot => {
            const data = snapshot.val();
            const productsArray = data
                ? Object.entries(data).map(([id, value]) => ({ id, ...value }))
                : [];
            setProducts(productsArray);
            setFiltered(productsArray);
        };
        return () => off(productsRef, "value", handleValueChange);
    }, []);

    useEffect(() => {
        let updated = [...products];

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
    }, [searchText, filters, products]);

    return (
        <div className="home-container">
            <ProductSidebar
                products={products}
                onSearch={setSearchText}
                onFilter={setFilters}
            />
            <div className="marketplace-content">
                <h2 className="marketplace-heading">Browse Available Produce</h2>
                <div className="product-grid">
                    {filtered.length === 0 ? (
                        <p>No Produce Found.</p>
                    ) : (
                        filtered.map(product => (
                            <ProductCard key={product.id}
                                product={product} />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

export default Marketplace;