import React, { useState } from "react";

function ProductSidebar({ products, onSearch, onFilter }) {
    const [searchText, setSearchText] = useState("");
    const [filter, setFilter] = useState({
        price: "",
        location: "",
        category: ""
    });

    // Get unique locations and categories from products
    const locations = Array.from(new Set(products.map(p => p.location).filter(Boolean)));
    const categories = Array.from(new Set(products.map(p => p.category).filter(Boolean)));

    // Handle search input
    const handleSearchChange = (e) => {
        setSearchText(e.target.value);
        onSearch(e.target.value);
    };

    // Handle filter changes
    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        const newFilter = { ...filter, [name]: value };
        setFilter(newFilter);
        onFilter(newFilter);
    };

    return (
        <div className="sidebar product-sidebar">
            <h4>Product Search</h4>
            <input
                type="text"
                placeholder="Search by name..."
                value={searchText}
                onChange={handleSearchChange}
                style={{ marginBottom: 16, width: "100%" }}
            />

            <h4>Filter Products</h4>
            <div style={{ marginBottom: 12 }}>
                <label>Price (max):</label>
                <input
                    type="number"
                    name="price"
                    placeholder="e.g. 1000"
                    value={filter.price}
                    onChange={handleFilterChange}
                    style={{ width: "100%" }}
                />
            </div>
            <div style={{ marginBottom: 12 }}>
                <label>Location:</label>
                <select
                    name="location"
                    value={filter.location}
                    onChange={handleFilterChange}
                    style={{ width: "100%" }}
                >
                    <option value="">All</option>
                    {locations.map(loc => (
                        <option key={loc} value={loc}>{loc}</option>
                    ))}
                </select>
            </div>
            <div>
                <label>Category:</label>
                <select
                    name="category"
                    value={filter.category}
                    onChange={handleFilterChange}
                    style={{ width: "100%" }}
                >
                    <option value="">All</option>
                    {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>
            </div>
        </div>
    );
}

export default ProductSidebar;