import React, { useState, useEffect } from 'react';
import { movieService } from '../services/movieService';
import useDebounce from '../hooks/useDebounce';
import '../styles/components'

const SearchInput = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (debouncedSearchQuery) {
        try {
          const results = await movieService.searchMovies(debouncedSearchQuery);
          onSearch(results); // Pass results to the parent component
        } catch (error) {
          console.error('Error fetching search results:', error);
        }
      } else {
        onSearch([]); // Clear results if the search query is empty
      }
    };

    fetchSearchResults();
  }, [debouncedSearchQuery, onSearch]);

  return (
    <input
      type="text"
      placeholder="Search for a movie..."
      value={searchQuery}
      onChange={handleSearchChange}
      className="search-input"
    />
  );
};

export default SearchInput;
