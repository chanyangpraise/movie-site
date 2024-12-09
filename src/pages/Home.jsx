// src/pages/Home.jsx
import React from "react";
import { useMovies } from "../hooks/useMovies";
import MovieList from "../components/MovieList";

const Home = () => {
  const { movies, loading, error } = useMovies();

  return (
    <div className="home-container">
      <MovieList movies={movies} loading={loading} error={error} />
    </div>
  );
};

export default Home;
