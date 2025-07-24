import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Header from "./components/Header.jsx";
import Home from "./pages/Home.jsx";
import MarketPlace from "./pages/Buyers.jsx";
import FarmersHub from "./pages/Farmers.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import "./styles/App.css";

function App() {
    return (
        <div className="App-container">
            <Router >
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/marketplace" element={<MarketPlace />} />
                    <Route path="/farmers-hub" element={<FarmersHub />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </Router>
        </div>
    )
}

export default App;
// This code sets up a React application with routing using React Router.