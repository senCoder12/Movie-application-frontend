import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'


import MovieGrid from '../Components/MovieGrid';
import EmptyMovieState from '../Components/EmptyMovieState';

function FavMovies() {
    const { favMovies} = useSelector((state) => ({ ...state.movie }));

    useEffect(() => {
        console.log('jsdom');
    },[])

    return (
        <div className="app">
            {
                favMovies.length == 0 ? <EmptyMovieState/> : <>
                    <MovieGrid movies={favMovies} />
                </>
            }
        </div>
    )
}

export default FavMovies;