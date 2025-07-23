import React, {useState, useEffect} from "react";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";
import SearchFilter from "../components/SearchFilter";
import '../styles/components.css';

function Marketplace() {
    const [products, setProducts] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [SelectedCategory, setSelecetdCategory] = useState("All");

    useEffect(() => {
        fetch('http://localhost:3000/products')
        .then(response => response.json())
        .then(data => {
            setProducts(data);
            setFiltered(data);
        });
    },[]);

    useEffect(() => {
        let updated = [...products];

        if(searchText) {
            updated = updated.filter(product =>

                product.name.toLowerCase().includes(searchText.toLowerCase()) ||
                product.location.toLowerCase().includes(searchText.toLowerCase())
            );
        }

        if(SelectedCategory) {
            updated = updated.filter(product => 
                product.category === SelectedCategory
            );
        }

        setFiltered(updated);
    }, [searchText, SelectedCategory,products]);

    return (
        <div className="marketplace-container">
            <h2 className="marketplace-heading">Browse Available Produce</h2>

            <div className="marketplace-layout">
                <SearchFilter
                products={products}
                SelectedCategory={SelectedCategory}
                onFilterChange={setSelecetdCategory}
                />
                <div className="marketplace-content">
                    <SearchBar searchText={searchText}
                    onSearchTextChange={setSearchText} />

                    <div className="product-grid">
                        {filtered.length ===0? (
                            <p>No Produce Found.</p>
                        ):(
                            filtered.map(product => (
                                <ProductCard key={product.id}
                                product={product} />
                            ))
                        )}    
                    </div>"
                </div>
            </div>
        </div>
    );
    }

    export default Marketplace;