import React from "react";
import { Link } from "react-router-dom";
import "../styles/NavBar.css";

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-content">
        <Link to="/" className="nav-logo">
          Movie Site
        </Link>
        <div className="nav-links">
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/login" className="nav-link">
            Login
          </Link>
          <Link to="/profile" className="nav-link">
            Profile
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
