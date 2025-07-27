import { useState, useEffect } from "react";
import { auth, googleProvider } from "../api/firebase";
import { signInWithPopup, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import "../styles/components.css";
import { Link, useNavigate } from "react-router-dom";
import logoGreen from '../assets/logo-green.svg';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) navigate("/home");
        });
        return () => unsubscribe();
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/home"); // Redirect to home after successful login
        } catch (err) {
            setError(err.message);
        }
        setLoading(false);
    };

    const handleGoogleLogin = async () => {
        setLoading(true);
        setError("");
        try {
            await signInWithPopup(auth, googleProvider);
            navigate("/home"); // Redirect to home after successful Google login
        } catch (err) {
            setError(err.message);
        }
        setLoading(false);
    };

    return (
        <div className="login-container">
            <img className="signup-logo" src={logoGreen} alt="Farmers Market Hub Logo" />
            <h2>Login</h2>
            <form onSubmit={handleSubmit} className="login-form">
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
                    {loading ? "Logging in..." : "Login"}
                </button>
                <button
                    type="button"
                    className="google-btn"
                    onClick={handleGoogleLogin}
                    disabled={loading}
                    style={{ marginTop: "10px" }}
                >
                    {loading ? "Processing..." : "Login with Google"}
                </button>
                {error && <p className="error">{error}</p>}
            </form>
            <h4>
                No account? Please <Link to="/register">Sign Up</Link>.
            </h4>
        </div>
    );
}

export default Login;