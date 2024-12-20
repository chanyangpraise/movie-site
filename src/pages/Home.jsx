import React, { useEffect, useRef, useCallback, useState } from 'react';
import { useMovies } from '../hooks/useMovies';
import MovieCard from '../components/MovieCard';
import MovieCardSkeleton from '../components/MovieCardSkeleton';
import '../styles/pages/Home.css';
import { movieService } from '../services/movieService';
import useDebounce from '../hooks/useDebounce';

const SKELETON_COUNT = 12; // Number of skeleton cards to show

const Home = ({ searchQuery }) => {
	const { movies, loading, error, loadMore, hasMore } = useMovies();
	const observer = useRef();
	const scrollPosition = useRef(0);
	const [searchResults, setSearchResults] = useState([]);
	const debouncedSearchQuery = useDebounce(searchQuery, 3000);
	const [imageOpacity, setImageOpacity] = useState(1);

	// Fetch top 10 popular movies
	const [featuredMovies, setFeaturedMovies] = useState([]);
	const [currentFeaturedIndex, setCurrentFeaturedIndex] = useState(0);
	const [isCycling, setIsCycling] = useState(true);

	useEffect(() => {
		const fetchFeaturedMovies = async () => {
			try {
				const response = await movieService.getMovies(); // Fetch top 10 popular movies
				setFeaturedMovies(response.results.slice(0, 10)); // Store top 10 movies
			} catch (error) {
				console.error('Error fetching featured movies:', error);
			}
		};
		fetchFeaturedMovies();
	}, []);

	useEffect(() => {
		if (featuredMovies.length > 0 && isCycling) {
			const interval = setInterval(() => {
				setImageOpacity(0); // Start fading out
				setTimeout(() => {
					setCurrentFeaturedIndex(
						(prevIndex) => (prevIndex + 1) % featuredMovies.length
					);
					setImageOpacity(1); // Fade in the new movie
				}, 500); // Match this duration with the CSS transition duration
			}, 10000); // Change featured movie every 10 seconds

			return () => clearInterval(interval); // Cleanup on unmount
		}
	}, [featuredMovies, isCycling]);

	const featuredMovie = featuredMovies[currentFeaturedIndex]; // Get the current featured movie

	useEffect(() => {
		const fetchSearchResults = async () => {
			if (debouncedSearchQuery) {
				try {
					const results = await movieService.searchMovies(debouncedSearchQuery);
					setSearchResults(results);
				} catch (error) {
					console.error('Error fetching search results:', error);
				}
			} else {
				setSearchResults([]); // Clear results if the search query is empty
			}
		};
		fetchSearchResults();
	}, [debouncedSearchQuery]);

	const lastMovieElementRef = useCallback(
		(node) => {
			if (loading) return;

			if (observer.current) observer.current.disconnect();

			observer.current = new IntersectionObserver(
				(entries) => {
					if (entries[0].isIntersecting && hasMore) {
						loadMore();
					}
				},
				{
					rootMargin: '100px',
					threshold: 0.1,
				}
			);

			if (node) observer.current.observe(node);
		},
		[loading, hasMore, loadMore]
	);

	if (error) {
		return (
			<div className="error-container">
				<div className="error-message">Error: {error}</div>
			</div>
		);
	}

	const renderSkeletons = () => {
		return Array(SKELETON_COUNT)
			.fill(null)
			.map((_, index) => (
				<div
					key={`skeleton-${index}`}
					className="movie-enter movie-enter-active"
				>
					<MovieCardSkeleton />
				</div>
			));
	};

	const toggleCycling = () => {
		setIsCycling((prev) => !prev);
	};

	return (
		<div className="home-container">
			{featuredMovie && (
				<div className="featured-movie">
					<img
						src={`https://image.tmdb.org/t/p/original${featuredMovie.backdrop_path}`}
						alt={featuredMovie.title}
						style={{ opacity: imageOpacity }}
					/>
					<div className="featured-info">
						<h2>{featuredMovie.title}</h2>
						<p>{featuredMovie.overview}</p>
					</div>
				</div>
			)}
			<div className="movies-grid">
				{searchResults.length > 0
					? searchResults.map((movie) => (
							<div key={movie.id} className="movie-enter movie-enter-active">
								<MovieCard movie={movie} />
							</div>
					  ))
					: movies.length === 0 && loading
					? renderSkeletons()
					: movies.map((movie, index) => {
							const uniqueKey = `${movie.id}-${index}`;

							if (movies.length === index + 1) {
								return (
									<div
										ref={lastMovieElementRef}
										key={uniqueKey}
										className="movie-enter movie-enter-active"
									>
										<MovieCard movie={movie} />
									</div>
								);
							} else {
								return (
									<div
										key={uniqueKey}
										className="movie-enter movie-enter-active"
									>
										<MovieCard movie={movie} />
									</div>
								);
							}
					  })}
				{loading && <>{renderSkeletons()}</>}
			</div>
			{!hasMore && !loading && movies.length > 0 && (
				<div className="loading-container">
					<p>No more movies to load</p>
				</div>
			)}
		</div>
	);
};

export default Home;
