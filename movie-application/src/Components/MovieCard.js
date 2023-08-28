import React, { useEffect } from 'react';
import '../Css/movie.css';
import { useDispatch, useSelector } from 'react-redux';
import { getMovieById } from '../Redux/Features/movieSlice';
import { useNavigate, useSearchParams } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  const {movies,loading} = useSelector((state)=> ({...state.movie}));
  // const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onButtonClick = (id) => {
    dispatch(getMovieById(id));
    navigate(`movie/${movie._id}`);
  }

  // useEffect(()=> {
  //   console.log('onButtonClick', searchParams.get(_id));
  //   if(!movie) {
  //     dispatch(getMovieById(id));
  //   }
  // }, [])
  return (
    <div className="movie-card">
      <div className="movie-image-container">
        <img src={movie.poster_path} alt={movie.title} className="movie-image" />
        <div className="movie-info">
          <h2 className="movie-name">{movie.title}</h2>
          <button className="movie-button" onClick={() => onButtonClick(movie._id)}>View Details</button>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
