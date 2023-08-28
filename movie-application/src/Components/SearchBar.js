import React, { useState, useEffect, useRef } from 'react';
import '../Css/searchbar.css';

const SearchBar = ({ data, movieSearchHandler, onItemClick }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(0); // Default selection is the first result
    const searchRef = useRef(null);
    const debounceTimeout = useRef(null);

    const debounce = (callback, delay) => {
        clearTimeout(debounceTimeout.current);
        debounceTimeout.current = setTimeout(callback, delay);
    };

    const handleSearch = (event) => {
        const searchText = event.target.value;
        setSearchTerm(searchText);

        debounce(() => {
            // Filter data based on the search term
            movieSearchHandler(searchText)
            setSearchResults(data);
            setSelectedIndex(0); 
        }, 300); 
    };

    const handleMouseEnter = (index, result) => {
        setSelectedIndex(index);
        onItemClick(result);
    };

    const handleClickOutside = (event) => {
        if (searchRef.current && !searchRef.current.contains(event.target)) {
            setSearchResults([]);
            setSelectedIndex(-1);
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Escape') {
            setSearchResults([]);
            setSelectedIndex(-1);
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'ArrowDown') {
            event.preventDefault();
            setSelectedIndex(prevIndex =>
                prevIndex < searchResults.length - 1 ? prevIndex + 1 : 0
            );
        } else if (event.key === 'ArrowUp') {
            event.preventDefault();
            setSelectedIndex(prevIndex =>
                prevIndex > 0 ? prevIndex - 1 : searchResults.length - 1
            );
        } else if (event.key === 'Enter' && selectedIndex !== -1) {
            setSearchTerm(searchResults[selectedIndex].title);
            onItemClick(searchResults[selectedIndex]);
            setSearchResults([]);
            setSelectedIndex(-1);
        }
    };


    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleKeyPress);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, []);

    useEffect(() => {
        if (selectedIndex !== -1) {
            const selectedResult = document.querySelector(`.result-item-${selectedIndex}`);
            if (selectedResult) {
                selectedResult.scrollIntoView({
                    block: 'nearest',
                });
            }
        }
    }, [selectedIndex]);

    return (
        <div className="search-bar" ref={searchRef}>
            <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearch}
                onKeyDown={handleKeyDown}
            />
            {searchResults.length > 0 && (
                <div className="search-results">
                    {searchResults.map((result, index) => (
                        <div
                            key={index}
                            className={`result-item result-item-${index} ${index === selectedIndex ? 'selected' : ''}`}
                            onMouseEnter={() => handleMouseEnter(index, result)}
                            onClick={()=> handleMouseEnter(index, result)}
                        >
                            {result.title || result.name}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchBar;
