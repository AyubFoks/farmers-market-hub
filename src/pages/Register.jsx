import { useState } from "react";
import { auth, googleProvider } from "../api/firebase";
import { signInWithPopup, createUserWithEmailAndPassword } from "firebase/auth";
import "../styles/components.css";
import { Link, useNavigate } from "react-router-dom";
import logoGreen from '../assets/logo-green.svg';

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess(false);
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            setSuccess(true);
            navigate("/"); // Redirect to login page after successful registration
        } catch (err) {
            setError(err.message);
        }
        setLoading(false);
    };

    const handleGoogleSignup = async () => {
        setLoading(true);
        setError("");
        try {
            await signInWithPopup(auth, googleProvider);
            setSuccess(true);
            navigate("/"); // Redirect to login page after successful Google signup
        } catch (err) {
            setError(err.message);
        }
        setLoading(false);
    };

    return (
        <div className="register-container">
            <img className="signup-logo" src={logoGreen} alt="Farmers Market Hub Logo" />
            <h2>Register</h2>
            <form onSubmit={handleSubmit} className="register-form">
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                />
                <button type="submit" disabled={loading}>
                    {loading ? "Registering..." : "Register"}
                </button>
                <button
                    type="button"
                    className="google-btn"
                    onClick={handleGoogleSignup}
                    disabled={loading}
                    style={{ marginTop: "10px" }}
                >
                    {loading ? "Processing..." : "Sign up with Google"}
                </button>
                {error && <p className="error">{error}</p>}
                {success && <p className="success">Registration successful!</p>}
            </form>
            <h4>
                Have account? Please <Link to="/">Log in</Link>.
            </h4>
        </div>
    );
}

export default Register;