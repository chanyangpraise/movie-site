import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import { routes } from './routes';

function App() {
	const [searchQuery, setSearchQuery] = useState(''); // State for search query

	return (
		<Routes>
			<Route
				element={
					<Layout searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
				}
			>
				{routes.map(({ path, element }) => (
					<Route
						key={path}
						path={path}
						element={React.cloneElement(element, {
							searchQuery,
							setSearchQuery,
						})}
					/>
				))}
			</Route>
		</Routes>
	);
}

export default App;
