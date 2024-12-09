// src/utils/movieUtils.js
export const formatRating = (rating) => rating.toFixed(1);
export const formatRuntime = (minutes) => `${minutes}분`;

export const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
};
