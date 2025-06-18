import React, { useContext } from 'react';
import '../pages/css/LandingPage.css';
import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../context/AuthContext';

const NavBar = () => {
    const navigate = useNavigate();
    const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);

    const handleDashboardClick = () => {
        if (isLoggedIn) {
            navigate('/dashboard'); // Navigate to Dashboard if logged in
        } else {
            navigate('/login'); // Navigate to Login if not logged in
        }
    };

    const handleLogin = () => {
        navigate('/login');
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        navigate('/');
    };

    return (
        <nav className="nav" style={{ marginBottom: "0px", display: "flex", position: "fixed", top: "0", left: "0", justifyContent: "space-between", 
        alignItems: "center", backgroundColor: "#333", padding: "0px 0px", width: "100vw", maxWidth: "100vw", zIndex: 10000 }} >
            <h2 style={{ color: "white", fontSize: "1.5rem", fontWeight: "bold", marginLeft: "80px" }}>PCI</h2>
            <ul style={{ listStyle: "none", display: "flex", gap: "70px", }}>
                <li>
                    <a href="/" style={{ textDecoration: "none", }}> Home </a>
                </li>
                <li>
                    <a href="#"  onClick={handleDashboardClick} style={{ textDecoration: "none", cursor: "pointer" }}> Dashboard </a>
                </li>

                <li>
                    {/* <a href="#" style={{ textDecoration: "none", }}> Contact</a> */}
                </li>
                {isLoggedIn ? (
                    <button onClick={handleLogout} style={{ padding: "10px 50px 10px 50px" }}>Logout</button>
                ) : (
                    <button onClick={handleLogin} style={{ padding: "10px 50px 10px 50px" }}>Login</button>
                )}
                <div style={{ width: "20px", height: "10px" }}></div>
            </ul>
        </nav>
    );
};

export default NavBar;