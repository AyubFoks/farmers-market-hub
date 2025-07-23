import React from "react";
import '../styles/components.css';


function Home() {
    return (
        <div className="home">
            <div className="sidebar" >
                <h4>Market Trends</h4>
                <hr />
                <ul>
                    <li>
                        <p>Nakuru</p>
                        <table>
                            <tr>SukumaWiki</tr>
                            <tr>Ksh. 800/bag</tr>
                            <tr>Maize</tr>
                            <tr>Ksh. 1200/bag</tr>
                            <tr>Beans</tr>
                            <tr>Ksh. 1500/bag</tr>
                            <tr>Potatoes</tr>
                            <tr>Ksh. 1000/bag</tr>
                            <tr>Carrots</tr>
                            <tr>Ksh. 900/bag</tr>
                            <tr>Onions</tr>
                            <tr>Ksh. 1100/bag</tr>
                            <tr>Eggs</tr>
                            <tr>Ksh. 400/tray</tr>
                            <tr>Milk</tr>
                            <tr>Ksh. 50/litre</tr>
                        </table>
                    </li>
                    <li>
                        <p>Nairobi</p>
                        <table>
                            <tr>SukumaWiki</tr>
                            <tr>Ksh. 850/bag</tr>
                            <tr>Maize</tr>
                            <tr>Ksh. 1250/bag</tr>
                            <tr>Beans</tr>
                            <tr>Ksh. 1600/bag</tr>
                            <tr>Potatoes</tr>
                            <tr>Ksh. 1100/bag</tr>
                            <tr>Carrots</tr>
                            <tr>Ksh. 950/bag</tr>
                            <tr>Onions</tr>
                            <tr>Ksh. 1200/bag</tr>
                            <tr>Eggs</tr>
                            <tr>Ksh. 450/tray</tr>
                            <tr>Milk</tr>
                            <tr>Ksh. 55/litre</tr>
                        </table>
                    </li>
                    <li>
                        <p>Mombasa</p>
                        <table>
                            <tr>SukumaWiki</tr>
                            <tr>Ksh. 900/bag</tr>
                            <tr>Maize</tr>
                            <tr>Ksh. 1300/bag</tr>
                            <tr>Beans</tr>
                            <tr>Ksh. 1700/bag</tr>
                            <tr>Potatoes</tr>
                            <tr>Ksh. 1200/bag</tr>
                            <tr>Carrots</tr>
                            <tr>Ksh. 1000/bag</tr>
                            <tr>Onions</tr>
                            <tr>Ksh. 1300/bag</tr>
                            <tr>Eggs</tr>
                            <tr>Ksh. 500/tray</tr>
                            <tr>Milk</tr>
                            <tr>Ksh. 60/litre</tr>
                        </table>
                    </li>
                    <li>
                        <p>Kisumu</p>
                        <table>
                            <tr>SukumaWiki</tr>
                            <tr>Ksh. 800/bag</tr>
                            <tr>Maize</tr>
                            <tr>Ksh. 1200/bag</tr>
                            <tr>Beans</tr>
                            <tr>Ksh. 1500/bag</tr>
                            <tr>Potatoes</tr>
                            <tr>Ksh. 1000/bag</tr>
                            <tr>Carrots</tr>
                            <tr>Ksh. 900/bag</tr>
                            <tr>Onions</tr>
                            <tr>Ksh. 1100/bag</tr>
                            <tr>Eggs</tr>
                            <tr>Ksh. 400/tray</tr>
                            <tr>Milk</tr>
                            <tr>Ksh. 50/litre</tr>
                        </table>
                    </li>

                </ul>
                
            </div>
            <div className="main-content">
                <h2>Welcome to</h2>
                <img className="homepage-logo" src="/path/to/logo.png" alt="Farmers Market Hub Logo" />
                <div className="homepage-query">
                    <h3>What do you want to do today?</h3>
                    <button className="query-button1">Explore Marketplace</button>
                    <button className="query-button2">Explore Farmers Hub</button>
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