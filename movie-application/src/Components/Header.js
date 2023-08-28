import React, { useState } from 'react';
import '../Css/header.css'; // Make sure the correct path is used for the CSS file
import SearchBar from './SearchBar.js';
import { AiOutlineMenu } from 'react-icons/ai';
import { MdFavoriteBorder } from "react-icons/md";
import Sidebar from './Sidebar';
import Dropdown from './Dropdown';
import { useDispatch, useSelector } from 'react-redux';
import { getMovieById, getMovieBySearch } from '../Redux/Features/movieSlice';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [favoriteCount, setFavoriteCount] = useState(3);
    const { moviesBySearch } = useSelector((state) => ({ ...state.movie }));
    const dispatch = useDispatch();
    const navigate = useNavigate();

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

    const options = ['Option 1', 'Option 2', 'Option 3'];
    const handleOptionSelect = (option) => {
        console.log(`Selected option: ${option}`);
    };

    return (
        <>
            <div className='header-component'>
                <header className="header">
                    <div className="header-content">
                        <div className="logo">ActionQ</div>
                        <div className="header-actions">
                            <SearchBar 
                                data={moviesBySearch} 
                                movieSearchHandler={movieSearchHandler} 
                                onItemClick = {itemClickHandler}/>
                            <button className="header-button" onClick={handleSidebarToggle}><AiOutlineMenu /></button>
                            <div className='fav-icon'>
                                <MdFavoriteBorder size="30" />
                                {favoriteCount > 0 && (
                                    <span className='favorite-count'>{favoriteCount}</span>
                                )}
                            </div>
                        </div>
                    </div>
                </header>
            </div>
            <Sidebar isOpen={sidebarOpen} onClose={handleSidebarToggle}>
                <h3 className='sidebar-heading'>SORT AND FILTER SECTION</h3>
                <div className="sidebar-dropdowns-container">
                    <div className="sidebar-dropdowns">
                        <div className="dropdown-label">Dropdown 1</div>
                        <Dropdown options={options} onSelect={handleOptionSelect} />
                    </div>
                    <div className="sidebar-dropdowns">
                        <div className="dropdown-label">Dropdown 2</div>
                        <Dropdown options={options} onSelect={handleOptionSelect} />
                    </div>
                    <div className="sidebar-dropdowns">
                        <div className="dropdown-label">Dropdown 3</div>
                        <Dropdown options={options} onSelect={handleOptionSelect} />
                    </div>
                    <div className="sidebar-dropdowns">
                        <div className="dropdown-label">Dropdown 4</div>
                        <Dropdown options={options} onSelect={handleOptionSelect} />
                    </div>
                    <div className="sidebar-dropdowns">
                        <div className="dropdown-label">Dropdown 5</div>
                        <Dropdown options={options} onSelect={handleOptionSelect} />
                    </div>
                </div>
            </Sidebar>
        </>

    );
};

export default Header;
