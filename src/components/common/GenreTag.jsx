// src/components/common/GenreTag.jsx
import React from "react";
import PropTypes from "prop-types";

const GenreTag = ({ name }) => <span className="genre-tag">{name}</span>;

GenreTag.propTypes = {
  name: PropTypes.string.isRequired,
};

export default GenreTag;
