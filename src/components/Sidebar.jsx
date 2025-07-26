import React, { useState } from "react";

const marketData = [
    {
        town: "Nakuru",
        prices: [
            { item: "SukumaWiki", price: "Ksh. 800/bag" },
            { item: "Maize", price: "Ksh. 1200/bag" },
            { item: "Beans", price: "Ksh. 1500/bag" },
            { item: "Potatoes", price: "Ksh. 1000/bag" },
            { item: "Carrots", price: "Ksh. 900/bag" },
            { item: "Onions", price: "Ksh. 1100/bag" },
            { item: "Eggs", price: "Ksh. 400/tray" },
            { item: "Milk", price: "Ksh. 50/litre" },
        ]
    },
    {
        town: "Nairobi",
        prices: [
            { item: "SukumaWiki", price: "Ksh. 850/bag" },
            { item: "Maize", price: "Ksh. 1250/bag" },
            { item: "Beans", price: "Ksh. 1600/bag" },
            { item: "Potatoes", price: "Ksh. 1100/bag" },
            { item: "Carrots", price: "Ksh. 950/bag" },
            { item: "Onions", price: "Ksh. 1200/bag" },
            { item: "Eggs", price: "Ksh. 450/tray" },
            { item: "Milk", price: "Ksh. 55/litre" },
        ]
    },
    {
        town: "Mombasa",
        prices: [
            { item: "SukumaWiki", price: "Ksh. 900/bag" },
            { item: "Maize", price: "Ksh. 1300/bag" },
            { item: "Beans", price: "Ksh. 1700/bag" },
            { item: "Potatoes", price: "Ksh. 1200/bag" },
            { item: "Carrots", price: "Ksh. 1000/bag" },
            { item: "Onions", price: "Ksh. 1300/bag" },
            { item: "Eggs", price: "Ksh. 500/tray" },
            { item: "Milk", price: "Ksh. 60/litre" },
        ]
    },
    {
        town: "Kisumu",
        prices: [
            { item: "SukumaWiki", price: "Ksh. 800/bag" },
            { item: "Maize", price: "Ksh. 1200/bag" },
            { item: "Beans", price: "Ksh. 1500/bag" },
            { item: "Potatoes", price: "Ksh. 1000/bag" },
            { item: "Carrots", price: "Ksh. 900/bag" },
            { item: "Onions", price: "Ksh. 1100/bag" },
            { item: "Eggs", price: "Ksh. 400/tray" },
            { item: "Milk", price: "Ksh. 50/litre" },
        ]
    },
    {
        town: "Eldoret",
        prices: [
            { item: "SukumaWiki", price: "Ksh. 780/bag" },
            { item: "Maize", price: "Ksh. 1100/bag" },
            { item: "Beans", price: "Ksh. 1400/bag" },
            { item: "Potatoes", price: "Ksh. 950/bag" },
            { item: "Carrots", price: "Ksh. 850/bag" },
            { item: "Onions", price: "Ksh. 1000/bag" },
            { item: "Eggs", price: "Ksh. 380/tray" },
            { item: "Milk", price: "Ksh. 48/litre" },
        ]
    },
    {
        town: "Thika",
        prices: [
            { item: "SukumaWiki", price: "Ksh. 820/bag" },
            { item: "Maize", price: "Ksh. 1180/bag" },
            { item: "Beans", price: "Ksh. 1450/bag" },
            { item: "Potatoes", price: "Ksh. 980/bag" },
            { item: "Carrots", price: "Ksh. 870/bag" },
            { item: "Onions", price: "Ksh. 1050/bag" },
            { item: "Eggs", price: "Ksh. 390/tray" },
            { item: "Milk", price: "Ksh. 49/litre" },
        ]
    },
];

function Sidebar() {
    const [openIndex, setOpenIndex] = useState(null);

    const handleToggle = (idx) => {
        setOpenIndex(openIndex === idx ? null : idx);
    };

    return (
        <div className="sidebar">
            <h4>Market Trends</h4>
            <hr />
            <ul className="market-list">
                {marketData.map((market, idx) => (
                    <li key={market.town}>
                        <p
                            style={{ cursor: "pointer", fontWeight: "bold", color: "#009f52" }}
                            onClick={() => handleToggle(idx)}
                        >
                            {market.town}
                        </p>
                        {openIndex === idx && (
                            <table className="market-table">
                                <thead>
                                    <tr>
                                        <th>Product</th>
                                        <th>Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {market.prices.map((row, i) => (
                                        <tr key={i}>
                                            <td>{row.item}</td>
                                            <td>{row.price}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Sidebar;