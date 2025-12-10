import './Navbar.css';

export function Navbar() {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-logo">
                    <img src="/logo.png" alt="Pokedex Logo" />
                </div>
                <ul className="navbar-menu">
                    <li><a href="/" className="navbar-link active">Home</a></li>
                    <li><a href="/pokedex" className="navbar-link">Pokedex</a></li>
                    <li><a href="/about" className="navbar-link">About</a></li>
                </ul>
                <button className="navbar-signin">Sign In</button>
            </div>
        </nav>
    );
}
