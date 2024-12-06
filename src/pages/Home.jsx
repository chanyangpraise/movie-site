// src/pages/Home.jsx
import React from "react";
import { useMovies } from "../hooks/useMovies";
import MovieList from "../components/MovieList";

const Home = () => {
  const { movies } = useMovies();

  return (
    <div className="home-container">
      <MovieList movies={movies} />
    </div>
  );
};

export default Home;
