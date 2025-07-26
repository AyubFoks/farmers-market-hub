import React, { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import ProductSidebar from "../components/ProductSidebar";
import '../styles/components.css';
import { db, ref, onValue, push, set } from "../api/firebase";

function Marketplace() {
    const [products, setProducts] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [filters, setFilters] = useState({
        price: "",
        location: "",
        category: ""
    });
    const [newProduct, setNewProduct] = useState({
        name: "",
        price: "",
        quantity: "",
        location: "",
        category: "",
        image: ""
    });

    // Fetch products from Firebase Realtime Database
    useEffect(() => {
        const productsRef = ref(db, "products");
        const unsubscribe = onValue(productsRef, (snapshot) => {
            const data = snapshot.val();
            const productsArray = data
                ? Object.entries(data).map(([id, value]) => ({ id, ...value }))
                : [];
            setProducts(productsArray);
            setFiltered(productsArray);
        });
        return () => unsubscribe();
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

    // Add new product to Firebase
    const handleAddProduct = async (e) => {
        e.preventDefault();
        const productsRef = ref(db, "products");
        const newProductRef = push(productsRef);
        await set(newProductRef, newProduct);
        setNewProduct({
            name: "",
            price: "",
            quantity: "",
            location: "",
            category: "",
            image: ""
        });
    };

    return (
        <div className="marketplace-container">
            
            <div className="marketplace-layout">
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
        </div>
    );
}

export default Marketplace;