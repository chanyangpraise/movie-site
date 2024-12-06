// src/components/MovieCard.jsx
import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { IMAGE_BASE_URL } from "../constants/config";
import { formatRating } from "../utils/movieUtils";
import "../styles/components/MovieCard.css";

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/details");
  };

  return (
    <div className="movie-card" onClick={handleClick}>
      <img
        src={`${IMAGE_BASE_URL.W500}${
          movie.poster_path || movie.backdrop_path
        }`}
        alt={movie.title}
        className="movie-poster"
      />
      <div className="movie-info">
        <h2 className="movie-title">{movie.title}</h2>
        <span className="movie-rating">
          평점: {formatRating(movie.vote_average)}
        </span>
      </div>
    </div>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    poster_path: PropTypes.string,
    backdrop_path: PropTypes.string,
    vote_average: PropTypes.number.isRequired,
  }).isRequired,
};

export default MovieCard;
