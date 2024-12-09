import React, { useEffect, useRef, useCallback } from 'react';
import { useMovies } from '../hooks/useMovies';
import MovieCard from '../components/MovieCard';
import '../styles/pages/Home.css';

const Home = () => {
  const { movies, loading, error, loadMore, hasMore } = useMovies();
  const observer = useRef();
  const scrollPosition = useRef(0);

  // Save scroll position before unmounting
  useEffect(() => {
    scrollPosition.current = sessionStorage.getItem('scrollPosition') 
      ? parseInt(sessionStorage.getItem('scrollPosition')) 
      : 0;

    // Restore scroll position
    if (scrollPosition.current > 0) {
      window.scrollTo(0, scrollPosition.current);
    }

    const handleScroll = () => {
      sessionStorage.setItem('scrollPosition', window.scrollY.toString());
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const lastMovieElementRef = useCallback(node => {
    if (loading) return;
    
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        loadMore();
      }
    }, {
      rootMargin: '100px', // Start loading earlier
      threshold: 0.1 // Trigger when even 10% of the element is visible
    });
    
    if (node) observer.current.observe(node);
  }, [loading, hasMore, loadMore]);

  if (error) {
    return (
      <div className="error-container">
        <div className="error-message">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="home-container">
      <div className="movies-grid">
        {movies.map((movie, index) => {
          const uniqueKey = `${movie.id}-${index}`;
          
          if (movies.length === index + 1) {
            return (
              <div 
                ref={lastMovieElementRef} 
                key={uniqueKey}
                className="movie-enter movie-enter-active"
              >
                <MovieCard movie={movie} />
              </div>
            );
          } else {
            return (
              <div 
                key={uniqueKey}
                className="movie-enter movie-enter-active"
              >
                <MovieCard movie={movie} />
              </div>
            );
          }
        })}
      </div>
      {loading && (
        <div className="loading-container">
          <div className="loading-spinner" />
        </div>
      )}
      {!hasMore && !loading && movies.length > 0 && (
        <div className="loading-container">
          <p>No more movies to load</p>
        </div>
      )}
    </div>
  );
};

export default Home;
