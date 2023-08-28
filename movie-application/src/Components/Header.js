import React, { useEffect, useState } from 'react';
import '../Css/header.css'; 
import SearchBar from './SearchBar.js';
import { AiOutlineMenu } from 'react-icons/ai';
import { MdFavoriteBorder } from "react-icons/md";
import Sidebar from './Sidebar';
import Dropdown from './Dropdown';
import { useDispatch, useSelector } from 'react-redux';
import { getMovieById, getMovieBySearch, getMovies, setQueryParams } from '../Redux/Features/movieSlice';
import { Link, useNavigate } from 'react-router-dom';
import { VoteCount, genres, sortByItems, sortTypes } from '../Utils/genre';

const Header = () => {
    const { movies, loading, currentPage, noOfPages, favMovies } = useSelector((state) => ({ ...state.movie }));
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [favoriteCount, setFavoriteCount] = useState(0);
    const { moviesBySearch } = useSelector((state) => ({ ...state.movie }));
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let query = {};

    const handleSidebarToggle = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const itemClickHandler = (movie) => {
        dispatch(getMovieById(movie._id));
        navigate(`movie/${movie._id}`);
    }

    const movieSearchHandler = (searchText) => {
        dispatch(getMovieBySearch(searchText))
    }

    const sidebarDropdownOnClickFuncObj = {
        sortBy: (selectedItem) => {
            query = {...query, sortBy: selectedItem.id};
        },
        orderBy: (selectedItem) => {
            query = {...query, orderBy: selectedItem.id};
        },
        movieSelector: (selectedItem) => {
            query = {...query, filterBy: [...query.filterBy || [], {filter_type: 'genre_ids', value: selectedItem.id}]};
        },
        voteSelector: (selectedItem) => {
            query = {...query, filterBy: [...query.filterBy || [], {filter_type: 'vote_count', value: selectedItem.id}]};
        }
    }

    const sidebarSubmitHandler = () => {
        dispatch(getMovies({page: 1, query}));
        dispatch(setQueryParams(query))
        setSidebarOpen(false);
    }

    const navigateToFavMoviePage = (e) => {
        e.preventDefault();
        navigate("movie/fav_list")
    }

    const navigateToMainPage = () => {
        navigate("/");
    }

    useEffect(()=> {
        setFavoriteCount(favMovies.length);
    },[favMovies])

    return (
        <>
            <div className='header-component'>
                <header className="header">
                    <div className="header-content">
                        <div className="logo" onClick={navigateToMainPage}>ActionQ</div>
                        <div className="header-actions">
                            <SearchBar 
                                data={moviesBySearch} 
                                movieSearchHandler={movieSearchHandler} 
                                onItemClick = {itemClickHandler}/>
                            <button className="header-button" onClick={handleSidebarToggle}><AiOutlineMenu /></button>
                            <div to="movie/fav_list" exact className='fav-icon' onClick={(e) => navigateToFavMoviePage(e)}>
                                <MdFavoriteBorder size="30" />
                                {favoriteCount > 0 && (
                                    <span className='favorite-count'>{favoriteCount}</span>
                                )}
                            </div>
                        </div>
                    </div>
                </header>
            </div>
            <Sidebar isOpen={sidebarOpen} onClose={handleSidebarToggle} onSubmit={sidebarSubmitHandler}>
                <h3 className='sidebar-heading'>SORT AND FILTER SECTION</h3>
                <div className="sidebar-dropdowns-container">
                    <div className="sidebar-dropdowns">
                        <div className="dropdown-label">Sort by </div>
                        <Dropdown options={sortByItems} onSelect={sidebarDropdownOnClickFuncObj.sortBy} />
                    </div>
                    <div className="sidebar-dropdowns">
                        <div className="dropdown-label">Sort Type</div>
                        <Dropdown options={sortTypes} onSelect={sidebarDropdownOnClickFuncObj.orderBy} />
                    </div>
                    <div className="sidebar-dropdowns">
                        <div className="dropdown-label">Select Movie Type</div>
                        <Dropdown options={genres} onSelect={sidebarDropdownOnClickFuncObj.movieSelector} />
                    </div>
                    <div className="sidebar-dropdowns">
                        <div className="dropdown-label">Vote Count</div>
                        <Dropdown options={VoteCount} onSelect={sidebarDropdownOnClickFuncObj.voteSelector} />
                    </div>
                </div>
            </Sidebar>
        </>

    );
};

export default Header;
