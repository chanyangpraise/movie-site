import React from 'react';
import { Link } from 'react-router-dom';
import SearchInput from './SearchInput'; // Import the SearchInput component
import '../styles/NavBar.css';

const NavBar = ({ searchQuery, setSearchQuery }) => {
	return (
		<nav className="navbar">
			<div className="navbar-content">
				<Link to="/" className="nav-logo">
					Movie Site
				</Link>
				<div className="nav-search">
					<SearchInput
						searchQuery={searchQuery}
						setSearchQuery={setSearchQuery}
					/>
				</div>
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
