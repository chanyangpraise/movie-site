import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IMAGE_BASE_URL } from '../constants/config';
import { formatRating } from '../utils/movieUtils';
import '../styles/components/MovieCard.css';

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/movie/${movie.id}`);
  };

  const imageUrl = movie.poster_path
    ? `${IMAGE_BASE_URL}/w500${movie.poster_path}`
    : '/placeholder.jpg'; // 나중에 플레이스홀더 이미지 추가 가능

  return (
    <div className="movie-card" onClick={handleClick}>
      <div className="movie-poster">
        <img
          src={imageUrl}
          alt={movie.title}
          loading="lazy"
        />
        <div className="movie-overlay">
          <div className="movie-rating">{formatRating(movie.vote_average)}</div>
          <div className="movie-info">
            <h3>{movie.title}</h3>
            <p className="release-date">
              {new Date(movie.release_date).getFullYear()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
