// src/hooks/useMovies.js
import { useState, useEffect, useCallback } from 'react';
import { movieService } from '../services/movieService';

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
      
      const filteredMovies = data.results.filter(movie => !movie.adult);
      
      setMovies(prev => {
        if (page === 1) return filteredMovies;
        return [...prev, ...filteredMovies];
      });
      
      setHasMore(page < data.total_pages);
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
