import React, { useState, useEffect, useRef } from 'react';
import { auth } from '../api/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import logo from '../assets/logo.svg';
import defaultuser from '../assets/default-user.png';
import '../styles/components.css';

function Header() {
    const [user, setUser] = useState(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        }
        if (dropdownOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [dropdownOpen]);

    const handleLogout = async () => {
        await signOut(auth);
        setDropdownOpen(false);
    };

    return (
        <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <ul className='nav-links'>
                <li><a href="/home">Home</a></li>
                <li><a href="/farmers-hub">Farmer's Hub</a></li>
                <li><a href="/marketplace">Marketplace</a></li>
            </ul>
            <div className="user-section" ref={dropdownRef}>
                {user ? (
                    <div style={{ position: "relative" }}>
                        <img
                            src={user.photoURL || defaultuser}
                            className="user-image"
                            alt={user.displayName || "User"}
                            onClick={() => setDropdownOpen((open) => !open)}
                            style={{ cursor: "pointer" }}
                        />
                        {dropdownOpen && (
                            <div className="user-dropdown">
                                <span style={{ display: "block", padding: "2px" }}>{user.displayName || user.email}</span>
                                <button onClick={handleLogout} className="logout-btn">Log out</button>
                            </div>
                        )}
                    </div>
                ) : (
                    <a href="/" className="login-link">Log in</a>
                )}
            </div>
        </header>
    );
}

export default Header;