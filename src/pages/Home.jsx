// src/pages/Home.jsx
import React, { useEffect, useRef, useCallback } from 'react';
import { useMovies } from '../hooks/useMovies';
import MovieCard from '../components/MovieCard';
import '../styles/pages/Home.css';

const Home = () => {
  const { movies, loading, error, loadMore, hasMore } = useMovies();
  const observer = useRef();
  const lastMovieElementRef = useCallback(node => {
    if (loading) return;
    
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        loadMore();
      }
    });
    
    if (node) observer.current.observe(node);
  }, [loading, hasMore, loadMore]);

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  return (
    <div className="home-container">
      <div className="movies-grid">
        {movies.map((movie, index) => {
          // 영화 ID와 페이지 인덱스를 조합하여 고유한 키 생성
          const uniqueKey = `${movie.id}-${index}`;
          
          if (movies.length === index + 1) {
            return (
              <div ref={lastMovieElementRef} key={uniqueKey}>
                <MovieCard movie={movie} />
              </div>
            );
          } else {
            return (
              <div key={uniqueKey}>
                <MovieCard movie={movie} />
              </div>
            );
          }
        })}
      </div>
      {loading && <div className="loading">Loading...</div>}
    </div>
  );
};

export default Home;
