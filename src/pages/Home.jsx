import React, { useEffect, useRef, useCallback } from 'react';
import { useMovies } from '../hooks/useMovies';
import MovieCard from '../components/MovieCard';
import MovieCardSkeleton from '../components/MovieCardSkeleton';
import '../styles/pages/Home.css';

const SKELETON_COUNT = 12; // Number of skeleton cards to show

const Home = () => {
	const { movies, loading, error, loadMore, hasMore } = useMovies();
	const observer = useRef();
	const scrollPosition = useRef(0);

	// Save scroll position before unmounting
	useEffect(() => {
		scrollPosition.current = sessionStorage.getItem('scrollPosition')
			? parseInt(sessionStorage.getItem('scrollPosition'))
			: 0;

		// Restore scroll position
		if (scrollPosition.current > 0) {
			window.scrollTo(0, scrollPosition.current);
		}

		const handleScroll = () => {
			sessionStorage.setItem('scrollPosition', window.scrollY.toString());
		};

		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

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

	return (
		<div className="home-container">
			<div className="movies-grid">
				{movies.length === 0 && loading ? (
					renderSkeletons()
				) : (
					<>
						{movies.map((movie, index) => {
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
					</>
				)}
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
