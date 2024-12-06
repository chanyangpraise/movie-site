// src/components/MovieBackdrop.jsx
import React from "react";
import PropTypes from "prop-types";
import { IMAGE_BASE_URL } from "../constants/config";
import "../styles/components/MovieBackdrop.css";

const MovieBackdrop = ({ backdropPath }) => (
  <div
    className="backdrop"
    style={{
      backgroundImage: backdropPath
        ? `url(${IMAGE_BASE_URL.ORIGINAL}${backdropPath})`
        : "none",
      backgroundColor: !backdropPath ? "#141414" : "transparent",
    }}
  >
    <div className="backdrop-overlay"></div>
  </div>
);

MovieBackdrop.propTypes = {
  backdropPath: PropTypes.string.isRequired,
};

export default MovieBackdrop;
