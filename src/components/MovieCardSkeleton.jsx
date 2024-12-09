import React from 'react';
import '../styles/components/MovieCardSkeleton.css';

const MovieCardSkeleton = () => {
  return (
    <div className="movie-card-skeleton">
      <div className="skeleton-poster pulse" />
      <div className="skeleton-content">
        <div className="skeleton-title pulse" />
        <div className="skeleton-info">
          <div className="skeleton-rating pulse" />
          <div className="skeleton-year pulse" />
        </div>
      </div>
    </div>
  );
};

export default MovieCardSkeleton;
