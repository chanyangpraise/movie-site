// src/routes/index.jsx
import React from "react";
import Home from "../pages/Home";
import MovieDetails from "../pages/MovieDetails";
import Login from '../pages/Login';
import Profile from '../pages/Profile';

export const routes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/movie/:id",
    element: <MovieDetails />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
];
