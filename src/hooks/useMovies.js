// src/hooks/useMovies.js
import { useState, useEffect, useCallback } from 'react';
import { movieService } from '../services/movieService';

// Keywords that might indicate adult content
const ADULT_CONTENT_KEYWORDS = [
  'adult',
  'erotic',
  'porn',
  'sex',
  'xxx',
  '18+',
  'nsfw',
  'mature',
];

const isAdultContent = (movie) => {
  const titleLower = movie.title.toLowerCase();
  const overviewLower = (movie.overview || '').toLowerCase();
  
  // Check for adult content flag
  if (movie.adult) return true;
  
  // Check title and overview for adult content keywords
  return ADULT_CONTENT_KEYWORDS.some(keyword => 
    titleLower.includes(keyword) || overviewLower.includes(keyword)
  );
};

export const useMovies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [initialLoad, setInitialLoad] = useState(true);

  const fetchMovies = useCallback(async () => {
    try {
      if (!hasMore && !initialLoad) return;
      
      setLoading(true);
      const data = await movieService.getMovies(page);
      
      // Enhanced filtering
      const filteredMovies = data.results.filter(movie => 
        // Basic requirements
        movie.poster_path &&
        movie.vote_average >= 0 &&
        movie.overview &&
        // Content filtering
        !isAdultContent(movie) &&
        // Ensure reasonable vote count for reliability
        movie.vote_count >= 50
      );
      
      setMovies(prev => {
        if (page === 1) return filteredMovies;
        
        // Remove any duplicates when adding new movies
        const newMovies = [...prev];
        filteredMovies.forEach(movie => {
          if (!newMovies.some(m => m.id === movie.id)) {
            newMovies.push(movie);
          }
        });
        return newMovies;
      });
      
      // Adjust hasMore based on available filtered movies
      const totalFilteredPages = Math.ceil(data.total_results * (filteredMovies.length / data.results.length));
      setHasMore(page < totalFilteredPages);
      setInitialLoad(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [page, hasMore, initialLoad]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      setPage(prev => prev + 1);
    }
  }, [loading, hasMore]);

  return { movies, loading, error, loadMore, hasMore };
};
