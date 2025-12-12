import { useNavigate } from 'react-router-dom';
import './Navbar.css';

export function Navbar({ activePage = 'home' }) {
    const navigate = useNavigate();

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-logo">
                    <img src="/kyogre-logo.png" alt="Pokedex Logo" />
                </div>
                <ul className="navbar-menu">
                    <li><a href="/" className={`navbar-link ${activePage === 'home' ? 'active' : ''}`}>Home</a></li>
                    <li><a href="/pokedex" className={`navbar-link ${activePage === 'pokedex' ? 'active' : ''}`}>Pokedex</a></li>
                    <li><a href="/about" className={`navbar-link ${activePage === 'about' ? 'active' : ''}`}>About</a></li>
                </ul>
                <button className={`navbar-signin ${activePage === 'auth' ? 'active' : ''}`} onClick={() => navigate('/auth')}>Sign In</button>
            </div>
        </nav>
    );
}
