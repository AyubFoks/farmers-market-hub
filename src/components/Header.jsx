import react from 'react';
import logo from '../assets/logo.svg';
import '../styles/components.css';

function Header() {
    return (
        <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <ul className='nav-links'>
                <li><a href="/">Home</a></li>
                <li><a href="/farmers-hub">Farmer's Hub</a></li>
                <li><a href="/marketplace">Marketplace</a></li>
            </ul>
            <img src='{userImage}' className='user-image' alt='{user.name}' />
        </header>
    );
}

export default Header;