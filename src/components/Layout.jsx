import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';
import '../styles/Layout.css';

const Layout = ({ searchQuery, setSearchQuery }) => {
	return (
		<div className="layout">
			<NavBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
			<main className="main-content">
				<Outlet />
			</main>
		</div>
	);
};

export default Layout;
