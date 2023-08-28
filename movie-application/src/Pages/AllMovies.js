import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'


import MovieGrid from '../Components/MovieGrid';
import { getMovies } from '../Redux/Features/movieSlice';
import Pagination from '../Components/Pagination';
import SkeletonLoader from '../Components/SkeletonLoader';

function AllMovies() {
    const { movies, loading, currentPage, noOfPages, query } = useSelector((state) => ({ ...state.movie }));
    const dispatch = useDispatch();

    const onPageChange = (page) => {
        dispatch(getMovies({page, query}));
    }

    useEffect(() => {
        dispatch(getMovies({page: currentPage, query}));
    }, [currentPage])

    return (
        <div className="app">
            {
                loading ? <SkeletonLoader count={6} /> : <>
                    <MovieGrid movies={movies} />
                    <div className='pagination-footer'>
                        <Pagination onPageChange={onPageChange} totalPages={noOfPages} currentPage={currentPage} />
                    </div>
                </>
            }
        </div>
    )
}

export default AllMovies;