// src/hooks/useMovies.js
import { useState } from "react";
import movieListData from "../data/movieListData.json";

export const useMovies = () => {
  const [movies, setMovies] = useState(movieListData.results);

  return {
    movies,
    setMovies,
  };
};
