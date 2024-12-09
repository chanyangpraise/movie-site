// src/hooks/useMovies.js
import { useState, useEffect } from "react";
import { movieService } from "../services/movieService";

export const useMovies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const data = await movieService.getMovies();
        // adult가 false인 영화만 필터링
        const filteredMovies = data.filter(movie => !movie.adult);
        setMovies(filteredMovies);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []); // 컴포넌트 마운트 시에만 실행

  return {
    movies,
    loading,
    error,
  };
};
