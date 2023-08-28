import React, { useState, useEffect, useRef } from 'react';
import '../Css/dropdown.css'; // You can style the component in this CSS file

const Dropdown = ({ options, onSelect }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        onSelect(option);
        toggleDropdown();
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    const handleKeyDown = (event) => {
        // event.preventDefault();
        if (event.key === 'Escape') {
            setIsOpen(false);
        } else if (event.key === 'ArrowDown') {
            setHighlightedIndex((prevIndex) =>
                prevIndex < options.length - 1 ? prevIndex + 1 : 0
            );
        } else if (event.key === 'ArrowUp') {
            setHighlightedIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : options.length - 1));
        } else if (event.key === 'Enter') {
            if (highlightedIndex !== -1) {
                handleOptionClick(options[highlightedIndex]);
            }
            setIsOpen(false);
        }
        event.stopPropagation();
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return (
        <div className="dropdown" ref={dropdownRef}>
            <div className="dropdown-header" onClick={toggleDropdown}>
                {selectedOption ? selectedOption : 'Select an option'}
            </div>
            {isOpen && (
                <ul className="dropdown-list">
                    {options.map((option, index) => (
                        <li
                            key={option}
                            className={`dropdown-item ${
                                (highlightedIndex === index) ? 'highlighted' : ''
                            }`}
                            onClick={() => handleOptionClick(option)}
                            onMouseEnter={() => setHighlightedIndex(index)} // Highlight on hover
                        >
                            {option}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Dropdown;
