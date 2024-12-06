// src/routes/index.jsx
import React from "react";
import Home from "../pages/Home";
import MovieDetails from "../pages/MovieDetails";

export const routes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/details",
    element: <MovieDetails />,
  },
];
