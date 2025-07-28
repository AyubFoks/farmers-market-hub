# Farmer's Market Hub

## Problem Statement
Small-scale African farmers often face:
- Post-harvest losses due to lack of buyers.
- Price exploitation by middlemen.
- Limited market access for fresh produce.
- Planting crops at the wrong time leading to low yields and wasted resources.
- Buyers hesitate to purchase from unverified sellers, fearing scams or low-quality produce.

## Solution
Farmer's Market Hub is a React application connecting farmers directly to buyers, providing:
- Product Listing (CRUD).
- Search & Filter.
- Order Management.
- Farmers Verification.
- Seasonal Crop Planner.

---

## Features
- **Product Listing**: Farmers can add, update, or remove produce.
- **Search & Filter**: Buyers can filter by location, price, or product type.
- **Order Management**: Farmers can mark orders as fulfilled.
- **Farmer Verification**: Verified badge to ensure trust.
- **Seasonal Crop Planner**: Suggests crops to plant based on season.

---

## Tech Stack
- **React** (Frontend)
- **JSON Server** (Mock backend)
- **useState & useEffect** (React hooks for state & side effects)
- **Vanilla CSS** (Styling)

---

## Installation & Setup

1. **Clone repository**
   ```bash
   git clone https://github.com/AyubFoks/farmers-market-hub.git
   cd farmers-market-hub
   ```

2. **Install dependencies**
    ```bash
    npm install
    ```

3. **Run React App**
    ```bash
    npm start
    ```

---

## Project Structure        

        src/
        ├── api/            # API functions for CRUD
        ├── components/     # UI Components
        ├── pages/          # Pages (Home, Farmers, Buyers, Login, Order, Register)
        ├── styles/         # CSS files
        ├── App.jsx         # Main app component
        ├── index.js        # React entry point
        └── db.json         # Mock database

## Authors

- [Malcolm Kagolobya](https://github.com/KagsM)
- [Amos Banda](https://github.com/BandaTheSecond)
- [Ayub Karanja](https://github.com/AyubFoks)
