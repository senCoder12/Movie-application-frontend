import React, { useEffect } from 'react';
import '../Css/movie.css';
import { useDispatch, useSelector } from 'react-redux';
import { getMovieById, setFavMovies } from '../Redux/Features/movieSlice';
import { useNavigate } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  const { movies, loading } = useSelector((state) => ({ ...state.movie }));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onButtonClick = (id) => {
    dispatch(getMovieById(id));
    navigate(`movie/${movie._id}`);
  };

  const onAddToFavorites = (movie) => {
    dispatch(setFavMovies(movie));
  };

  return (
    <div className="movie-card">
      <div className="movie-image-container">
        <img src={movie.poster_path} alt={movie.title} className="movie-image" />
        <div className="movie-info">
          <h2 className="movie-name">{movie.title}</h2>
          <div className='movie-button-container'>
          <button className="movie-button" onClick={() => onButtonClick(movie._id)}>
            View Details
          </button>
          <button className="movie-button favorite-button" onClick={() => onAddToFavorites(movie)}>
            Add to Favorites
          </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
