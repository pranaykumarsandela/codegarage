import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          <div className="navbar-logo-icon">
            <img src="/image.png" alt="IEEE CS Logo" className="logo-image" />
          </div>
          <span className="navbar-logo-text">Code Garage</span>
        </Link>
        
        <div className={`navbar-nav ${isOpen ? 'active' : ''}`}>
          <Link to="/" className="navbar-link" onClick={closeMenu}>
            Home
          </Link>
          <Link to="/register" className="navbar-link" onClick={closeMenu}>
            Register
          </Link>
          <Link to="/register" className="btn btn-yellow btn-small" onClick={closeMenu}>
            Get Started
          </Link>
        </div>

        <button
          className={`navbar-toggle ${isOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span className="navbar-toggle-bar"></span>
          <span className="navbar-toggle-bar"></span>
          <span className="navbar-toggle-bar"></span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;