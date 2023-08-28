import React from 'react';
import MovieCard from './MovieCard.js';
import '../Css/movie.css';
import { useSelector } from 'react-redux';

const MovieGrid = ({ movies }) => {
    const { loading } = useSelector((state) => ({ ...state.movie }));
    const handleButtonClick = (movieId) => {
        console.log('Button clicked for movie ID:', movieId);
    };

    return (
        <>
            {
                !loading && <div className='movie-grid-parent'>
                    <div className="movie-grid">
                        {movies.map(movie => (
                            <MovieCard key={movie.id} movie={movie} onButtonClick={handleButtonClick} />
                        ))}
                    </div>
                </div>
            }
        </>

    );
};

export default MovieGrid;
