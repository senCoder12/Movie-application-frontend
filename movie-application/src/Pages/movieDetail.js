import React from 'react';
import '../Css/movieDetails.css';
import { useSelector } from 'react-redux';
import { genres } from '../Utils/genre';


const MovieDetails = () => {
    const { movie, loading } = useSelector((state) => ({ ...state.movie }))
    const { backdrop_path, poster_path, title, overview, release_date, vote_average, genre_ids } = movie;
    const getGenreNameById = (id) =>{
        const genre = genres.find(genre => genre.id === id);
        return genre ? genre.name : "Unknown Genre";
    }
    console.log(genre_ids);
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
                    <div>{ !loading && genre_ids &&
                        genre_ids.forEach((element, index) => {
                            if(index == 0) {
                                return <>{getGenreNameById(element)}</>
                            }
                            return <>
                                    , {getGenreNameById(element)}
                            </>
                        })    
                    }</div>
                </div>
                <p className="movie-overview">{overview}</p>
                <p className="release-date">Release Date: {release_date}</p>
                <p className="vote-average">Vote Average: {vote_average}</p>
            </div>
        </div>
    );
};

export default MovieDetails;
