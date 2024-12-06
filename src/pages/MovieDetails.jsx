// src/pages/MovieDetails.jsx
import React from "react";
import { movieService } from "../services/movieService";
import MovieBackdrop from "../components/MovieBackdrop";
import MovieInfoItem from "../components/common/MovieInfoItem";
import GenreTag from "../components/common/GenreTag";
import { IMAGE_BASE_URL } from "../constants/config";
import { formatRating, formatRuntime } from "../utils/movieUtils";
import "../styles/pages/MovieDetails.css";

const MovieDetails = () => {
  const movieDetail = movieService.getMovieDetail();

  return (
    <div className="movie-details-container">
      <MovieBackdrop backdropPath={movieDetail.backdrop_path} />

      <div className="content">
        <div className="poster">
          <img
            src={`${IMAGE_BASE_URL.ORIGINAL}${movieDetail.poster_path}`}
            alt={movieDetail.title}
          />
        </div>

        <div className="info">
          <h1>{movieDetail.title}</h1>

          <div className="meta">
            <span className="release-date">{movieDetail.release_date}</span>
            <span className="runtime">
              {formatRuntime(movieDetail.runtime)}
            </span>
            <span className="rating">
              평점: {formatRating(movieDetail.vote_average)}
            </span>
          </div>

          <div className="genres">
            {movieDetail.genres.map((genre) => (
              <GenreTag key={genre.id} name={genre.name} />
            ))}
          </div>

          <div className="tagline">{movieDetail.tagline}</div>

          <div className="overview">
            <h3>개요</h3>
            <p>{movieDetail.overview}</p>
          </div>

          <div className="additional-info">
            <MovieInfoItem title="제작사">
              {movieDetail.production_companies.map((company) => (
                <span key={company.id}>{company.name}</span>
              ))}
            </MovieInfoItem>

            <MovieInfoItem title="개봉 상태">
              <span>{movieDetail.status}</span>
            </MovieInfoItem>

            <MovieInfoItem title="원제">
              <span>{movieDetail.original_title}</span>
            </MovieInfoItem>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
