import React from 'react';
import '../styles/components/SearchInput.css';

const SearchInput = ({ searchQuery, setSearchQuery }) => {
	return (
		<div className="search-container">
			<input
				type="text"
				placeholder="Search for a movie..."
				value={searchQuery}
				onChange={(e) => setSearchQuery(e.target.value)}
			/>
		</div>
	);
};

export default SearchInput;
