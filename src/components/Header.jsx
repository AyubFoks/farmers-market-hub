import react from 'react';
import logo from '../assets/logo.svg';
import '../styles/components.css';

function Header() {
    return (
        <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <ul className='nav-links'>
                <li><a href="/pages/Home.jsx">Home</a></li>
                <li><a href="/pages/Farmers.jsx">Farmer's Hub</a></li>
                <li><a href="/pages/Buyers.jsx">Marketplace</a></li>
            </ul>
            <img src='{userImage}' className='user' alt='{user}' />
        </header>
    );
}

export default Header;