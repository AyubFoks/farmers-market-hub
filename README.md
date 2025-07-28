# Farmer's Market Hub

## Deployment Link

[Farmers Connect](https://farmers-market-hub-five.vercel.app/)

## Project details

Farmer's connect is a farmer's market hub for small-scale African farmers. 

Our platform helps solve a myriad of farmer problems by connecting genuine farmers directly to potential buyers - individuals, restaurants, or retailers.

We eliminate the middlemen, giving the real farmers a competitive edge while at the same time ensuring their fresh produce is bought at a fair price. 

We also offer helpful resources like a seasonal crop planner guide and a farmers’ blog.

### Problem Statement
Small-scale African farmers often face:
- Post-harvest losses due to lack of buyers.
- Price exploitation by middlemen.
- Limited market access for fresh produce.
- Planting crops at the wrong time leading to low yields and wasted resources.
- Buyers hesitate to purchase from unverified sellers, fearing scams or low-quality produce.

### Solution
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
- **Firebase** (Authentication,Realtime Database)
- **Cloudinary** (Media storage)
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
        ├── assets/         # Media 
        ├── components/     # UI Components
        ├── pages/          # Pages (Home, Farmers, Buyers)
        ├── styles/         # CSS files
        ├── App.jsx         # Main app component
        └── index.js        # React entry point

## Authors

- [Malcolm Kagolobya](https://github.com/KagsM)
- [Amos Banda](https://github.com/BandaTheSecond)
- [Ayub Karanja](https://github.com/AyubFoks)

## Licence

Distributed under the MIT License. See [MIT License](https://opensource.org/licenses/MIT) for details