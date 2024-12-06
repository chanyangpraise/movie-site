const MovieInfoItem = ({ title, children }) => (
  <div className="info-item">
    <h4>{title}</h4>
    {children}
  </div>
);

export default MovieInfoItem;
