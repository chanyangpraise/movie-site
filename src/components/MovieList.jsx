// src/components/MovieList.jsx
import React from "react";
import PropTypes from "prop-types";
import MovieCard from "./MovieCard";
import "../styles/components/MovieList.css";

const MovieList = ({ movies, loading, error }) => {
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>영화 목록을 불러오는 중...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p>영화 목록을 불러오는데 실패했습니다.</p>
        <p>{error}</p>
      </div>
    );
  }

  if (!movies.length) {
    return (
      <div className="empty-container">
        <p>표시할 영화가 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="movie-container">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

MovieList.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      poster_path: PropTypes.string,
      backdrop_path: PropTypes.string,
      overview: PropTypes.string,
      vote_average: PropTypes.number,
      release_date: PropTypes.string,
    })
  ).isRequired,
  loading: PropTypes.bool,
  error: PropTypes.string,
};

MovieList.defaultProps = {
  loading: false,
  error: null,
};

export default MovieList;
