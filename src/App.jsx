import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Header from "./components/Header.jsx";
import Home from "./pages/Home.jsx";
import MarketPlace from "./pages/Buyers.jsx";
import FarmersHub from "./pages/Farmers.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import SeasonalPlanner from './components/SeasonalPlanner';
import "./styles/App.css";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
    return (
        <div className="App-container">
            <Router>
                <Header />
                <Routes>
                    <Route path="/home" element={
                        <ProtectedRoute>
                            <Home />
                        </ProtectedRoute>
                    } />
                    <Route path="/marketplace" element={
                        <ProtectedRoute>
                            <MarketPlace />
                        </ProtectedRoute>
                    } />
                    <Route path="/farmers-hub" element={
                        <ProtectedRoute>
                            <FarmersHub />
                        </ProtectedRoute>
                    } />
                    <Route path="/" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/planner" element={
                        <ProtectedRoute>
                            <SeasonalPlanner />
                        </ProtectedRoute>
                    } />
                </Routes>
            </Router>
        </div>
    )
}

export default App;
// This code sets up a React application with protected routing using React Router.