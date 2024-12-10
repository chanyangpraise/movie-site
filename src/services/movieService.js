// src/services/movieService.js

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

export const movieService = {
	getMovies: async (page = 1) => {
		try {
			const response = await fetch(
				`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=ko-KR&page=${page}&include_adult=false&certification_country=US&certification.lte=PG-13`
			);

			if (!response.ok) {
				throw new Error(`Failed to fetch movies: ${response.status}`);
			}

			const data = await response.json();
			return data; // 전체 응답 반환 (results와 페이지 정보 포함)
		} catch (error) {
			console.error('Error fetching movies:', error);
			throw error;
		}
	},

	getMovieDetail: async (movieId) => {
		try {
			const response = await fetch(
				`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=ko-KR&include_adult=false`
			);
			if (!response.ok) {
				throw new Error(`Failed to fetch movie details: ${response.status}`);
			}
			return await response.json();
		} catch (error) {
			console.error('Error fetching movie details:', error);
			throw error;
		}
	},

	searchMovies: async (query) => {
		const adultKeywords = [
			'adult',
			'sex',
			'porn',
			'erotic',
			'nude',
			'xxx',
			'어바웃 섹스',
			'밝히는 가족의 섹스 스토리',
			'루시아',
			'S테이프',
			'욕망의 법칙',
			'섹스돌',
			'달콤한섹스',
		]; // Define keywords to filter out
		const profanityKeywords = ['fuck', 'shit', 'bitch', 'asshole']; // Define profanity keywords

		try {
			const response = await fetch(
				`${BASE_URL}/search/movie?api_key=${API_KEY}&language=ko-KR&query=${encodeURIComponent(
					query
				)}`
			);
			if (!response.ok) {
				throw new Error(`Failed to search movies: ${response.status}`);
			}
			const data = await response.json();
			// Filter out adult, R-rated, and profanity movies
			const filteredResults = data.results.filter((movie) => {
				const title = movie.title.toLowerCase();
				const overview = movie.overview ? movie.overview.toLowerCase() : '';
				const isAdult = movie.adult; // Check if the movie is marked as adult

				return (
					!adultKeywords.some(
						(keyword) => title.includes(keyword) || overview.includes(keyword)
					) &&
					!profanityKeywords.some(
						(keyword) => title.includes(keyword) || overview.includes(keyword)
					) &&
					!isAdult
				); // Exclude adult movies
			});
			return filteredResults;
		} catch (error) {
			console.error('Error searching movies:', error);
			throw error;
		}
	},
};
