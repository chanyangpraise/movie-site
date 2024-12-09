// src/services/movieService.js

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

export const movieService = {
  getMovies: async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=ko-KR`
      );
      
      if (!response.ok) {
        throw new Error(`Failed to fetch movies: ${response.status}`);
      }
      
      const data = await response.json();
      return data.results; // 결과를 그대로 반환하고 필터링은 useMovies에서 처리
    } catch (error) {
      console.error('Error fetching movies:', error);
      throw error; // 에러를 상위로 전파하여 useMovies에서 처리
    }
  },

  getMovieDetail: async (movieId) => {
    try {
      const response = await fetch(
        `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=ko-KR`
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch movie details: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching movie details:', error);
      throw error;
    }
  },

  searchMovies: async (query) => {
    try {
      const response = await fetch(
        `${BASE_URL}/search/movie?api_key=${API_KEY}&language=ko-KR&query=${encodeURIComponent(query)}`
      );
      if (!response.ok) {
        throw new Error(`Failed to search movies: ${response.status}`);
      }
      const data = await response.json();
      return data.results;
    } catch (error) {
      console.error('Error searching movies:', error);
      throw error;
    }
  }
};
