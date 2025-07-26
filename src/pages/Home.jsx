import React from "react";
import '../styles/components.css';
import logoGreen from '../assets/logo-green.svg';
import Sidebar from '../components/Sidebar';

function Home() {
    return (
        <div className="home-container">
            <Sidebar />
            <div className="main-content">
                <h2>Welcome to</h2>
                <img className="homepage-logo" src={logoGreen} alt="Farmers Market Hub Logo" />
                <div className="homepage-query">
                    <div>
                        <h3>What do you want to do <br />today?</h3>
                    </div>
                    <div className="buttons-container">
                        <button onClick={() => window.location.href="/marketplace"} className="query-button1">BUY</button>
                        <button onClick={() => window.location.href="/farmers-hub"} className="query-button2">SELL</button>
                    </div>
                </div>
                <h4>Resources</h4>
                <hr />
                <ul className="resources-list">
                    <li><a href="/path/to/resource1">Seasonal Crop Planner</a></li>
                    <li><a href="/path/to/resource2">Farmer's Blog</a></li>
                </ul>
            </div>
        </div>
    );
}

export default Home;