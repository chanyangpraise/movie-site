const MovieMetadata = ({ release_date, runtime, vote_average }) => (
  <div className="meta">
    <span className="release-date">{release_date}</span>
    <span className="runtime">{runtime}분</span>
    <span className="rating">평점: {vote_average.toFixed(1)}</span>
  </div>
);

export default MovieMetadata;
