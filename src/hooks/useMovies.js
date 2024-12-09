// src/hooks/useMovies.js
import { useState, useEffect, useCallback, useRef } from 'react';
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
  const [movies, setMovies] = useState(() => {
    const savedMovies = sessionStorage.getItem('movies');
    return savedMovies ? JSON.parse(savedMovies) : [];
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(() => {
    return parseInt(sessionStorage.getItem('currentPage')) || 1;
  });
  const [hasMore, setHasMore] = useState(true);
  const isLoading = useRef(false);

  // Debounced save to sessionStorage to prevent performance impact
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      sessionStorage.setItem('movies', JSON.stringify(movies));
      sessionStorage.setItem('currentPage', page.toString());
    }, 1000);
    
    return () => clearTimeout(timeoutId);
  }, [movies, page]);

  const fetchMovies = useCallback(async () => {
    if (isLoading.current) return;
    
    try {
      isLoading.current = true;
      setLoading(true);
      
      // Start fetching next page early
      const nextPage = page + 1;
      const [currentData, nextData] = await Promise.all([
        movieService.getMovies(page),
        hasMore ? movieService.getMovies(nextPage) : Promise.resolve(null)
      ]);
      
      // Process current page
      const filteredMovies = currentData.results.filter(movie => 
        movie.poster_path &&
        movie.vote_average >= 0 &&
        movie.overview &&
        !isAdultContent(movie) &&
        movie.vote_count >= 50
      );
      
      // Process next page if available
      let nextFilteredMovies = [];
      if (nextData) {
        nextFilteredMovies = nextData.results.filter(movie => 
          movie.poster_path &&
          movie.vote_average >= 0 &&
          movie.overview &&
          !isAdultContent(movie) &&
          movie.vote_count >= 50
        );
      }
      
      setMovies(prev => {
        const newMovies = [...prev];
        const addMovies = (moviesToAdd) => {
          moviesToAdd.forEach(movie => {
            if (!newMovies.some(m => m.id === movie.id)) {
              newMovies.push(movie);
            }
          });
        };
        
        addMovies(filteredMovies);
        if (nextFilteredMovies.length > 0) {
          addMovies(nextFilteredMovies);
          setPage(nextPage);
        }
        
        return newMovies;
      });

      // Update hasMore based on both current and next page results
      const totalResults = currentData.total_results;
      const totalPages = Math.ceil(totalResults * (filteredMovies.length / currentData.results.length));
      setHasMore(page < totalPages && nextFilteredMovies.length > 0);
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      isLoading.current = false;
    }
  }, [page, hasMore]);

  useEffect(() => {
    if (movies.length === 0) {
      fetchMovies();
    }
  }, [fetchMovies, movies.length]);

  const loadMore = useCallback(() => {
    if (!loading && hasMore && !isLoading.current) {
      fetchMovies();
    }
  }, [loading, hasMore, fetchMovies]);

  return { movies, loading, error, loadMore, hasMore };
};
