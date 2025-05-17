import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
    const token = localStorage.getItem('accessToken');
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        navigate('/login');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light px-4">
            <Link to="/" className="navbar-brand">Коктейль веб</Link>
            <div className="collapse navbar-collapse">
                <ul className="navbar-nav ms-auto">
                    {token ? (
                        <>
                            <li className="nav-item"><Link to="/add" className="nav-link">Нэмэх</Link></li>
                            <li className="nav-item"><Link to="/profile" className="nav-link">Профайл</Link></li>
                            <li className="nav-item"><button onClick={handleLogout} className="btn btn-outline-danger ms-2">Гарах</button></li>
                        </>
                    ) : (
                        <>
                            <li className="nav-item"><Link to="/login" className="nav-link">Нэвтрэх</Link></li>
                            <li className="nav-item"><Link to="/register" className="nav-link">Бүртгүүлэх</Link></li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
