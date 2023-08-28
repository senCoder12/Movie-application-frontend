import React from 'react';
import '../Css/movieDetails.css';
import { useSelector } from 'react-redux';


const MovieDetails = () => {
    const { movie } = useSelector((state) => ({ ...state.movie }))
    const { backdrop_path, poster_path, title, overview, release_date, vote_average } = movie;

    return (
        <div className="movie-details">
            <div className="backdrop-container">
                <div className="backdrop-image" style={{ backgroundImage: `url(${backdrop_path})` }}></div>
                <div className="poster-overlay">
                    <img src={poster_path} alt={title} className="poster-image" />
                </div>
            </div>
            <div className="single-movie-info">
                <h2 className="movie-title">{title}</h2>
                <div className='movie-genre-details'>
                    <div className='fixed-button'>HD 4K</div>
                    <div>Action</div>
                </div>
                <p className="movie-overview">{overview}</p>
                <p className="release-date">Release Date: {release_date}</p>
                <p className="vote-average">Vote Average: {vote_average}</p>
            </div>
        </div>
    );
};

export default MovieDetails;
