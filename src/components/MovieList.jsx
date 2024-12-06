// src/components/MovieList.jsx
import React from "react";
import PropTypes from "prop-types";
import MovieCard from "./MovieCard";
import "../styles/components/MovieList.css";

const MovieList = ({ movies }) => (
  <div className="movie-container">
    {movies.map((movie) => (
      <MovieCard key={movie.id} movie={movie} />
    ))}
  </div>
);

MovieList.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      poster_path: PropTypes.string,
      backdrop_path: PropTypes.string,
      vote_average: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default MovieList;
