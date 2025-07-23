import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import MarketPlace from "./pages/Buyers";
import FarmersHub from "./pages/Farmers";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element ={<Home />} />
                <Route path="/marketplace" element={<MarketPlace />} />
                <Route path="/farmers-hub" element={<FarmersHub />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </Router>
    )
}

export default App;
// This code sets up a React application with routing using React Router.