import React from 'react';
import '../Css/emptyMovieState.css';

const EmptyMovieState = () => {
    return (
        <div className="empty-fav-page">
            <div className="empty-fav-content">
                <h2>Your Favorite Movies</h2>
                <p>Your favorite movie list is empty.</p>
            </div>
        </div>
    );
};

export default EmptyMovieState;
