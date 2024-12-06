// src/services/movieService.js
import movieListData from "../data/movieListData.json";
import movieDetailData from "../data/movieDetailData.json";

export const movieService = {
  getMovies: () => movieListData.results,
  getMovieDetail: () => movieDetailData,
};
