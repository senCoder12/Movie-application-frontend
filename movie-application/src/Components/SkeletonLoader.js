import React from 'react';
import '../Css/skeletonLoader.css'; 
import '../Css/movie.css'; 

const SkeletonLoader = ({ count }) => {
    const skeletonItems = Array.from({ length: count }, (_, index) => (
        <div key={index} className="skeleton-item"></div>
    ));

    return <div className='movie-grid-parent'>
            <div className="skeleton-loader">{skeletonItems}</div>
        </div>;
};

export default SkeletonLoader;
