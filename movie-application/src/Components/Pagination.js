import React from 'react';
import '../Css/pagination.css'; 

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const visiblePages = 3; 
    const halfVisible = Math.floor(visiblePages / 2);

    const startPage = Math.max(currentPage - halfVisible, 1);
    const endPage = Math.min(startPage + visiblePages - 1, totalPages);

    const pageNumbers = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

    return (
        <div className="pagination">
            {currentPage > 1 && (
                <button className="prev-button" onClick={() => onPageChange(currentPage - 1)}>
                    Prev
                </button>
            )}
            {pageNumbers.map((pageNumber) => (
                <button
                    key={pageNumber}
                    className={`page-number ${currentPage === pageNumber ? 'active' : ''}`}
                    onClick={() => onPageChange(pageNumber)}
                >
                    {pageNumber}
                </button>
            ))}
            {currentPage < totalPages && (
                <button className="next-button" onClick={() => onPageChange(currentPage + 1)}>
                    Next
                </button>
            )}
        </div>
    );
};

export default Pagination;
