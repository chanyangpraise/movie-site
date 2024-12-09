// src/pages/MovieDetails.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { movieService } from "../services/movieService";
import { IMAGE_BASE_URL } from "../constants/config";
import { formatRating, formatDate } from "../utils/movieUtils";
import "../styles/pages/MovieDetails.css";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        const data = await movieService.getMovieDetail(id);
        setMovie(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>영화 정보를 불러오는 중...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p>영화 정보를 불러오는데 실패했습니다.</p>
        <p>{error}</p>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="error-container">
        <p>영화를 찾을 수 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="movie-details-container">
      <div 
        className="backdrop" 
        style={{
          backgroundImage: `url(${IMAGE_BASE_URL.ORIGINAL}${movie.backdrop_path})`,
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.3)',
          zIndex: 0
        }}
      />

      <div className="content">
        <div className="poster">
          <img
            src={`${IMAGE_BASE_URL.W500}${movie.poster_path}`}
            alt={movie.title}
          />
        </div>

        <div className="info">
          <h1>{movie.title}</h1>

          <div className="meta">
            <span className="release-date">{formatDate(movie.release_date)}</span>
            <span className="runtime">{movie.runtime}분</span>
            <span className="rating">⭐️ {formatRating(movie.vote_average)}</span>
          </div>

          <div className="genres">
            {movie.genres?.map(genre => (
              <span key={genre.id} className="genre-tag">
                {genre.name}
              </span>
            ))}
          </div>

          {movie.tagline && (
            <div className="tagline">{movie.tagline}</div>
          )}

          <div className="overview">
            <h3>개요</h3>
            <p>{movie.overview}</p>
          </div>

          <div className="additional-info">
            {movie.production_companies?.length > 0 && (
              <div className="production-companies">
                <h3>제작사</h3>
                <div className="companies-list">
                  {movie.production_companies.map(company => (
                    <span key={company.id} className="company">
                      {company.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="movie-meta-details">
              <div className="meta-item">
                <span className="label">개봉 상태:</span>
                <span className="value">{movie.status}</span>
              </div>
              <div className="meta-item">
                <span className="label">원제:</span>
                <span className="value">{movie.original_title}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
