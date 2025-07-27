import React, { useState } from "react";

function FarmersSearchBar({ onSearch }) {
    const [searchText, setSearchText] = useState("");

    // Handle search input
    const handleSearchChange = (e) => {
        setSearchText(e.target.value);
        onSearch(e.target.value);
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
        </div>
    );
}

export default FarmersSearchBar;