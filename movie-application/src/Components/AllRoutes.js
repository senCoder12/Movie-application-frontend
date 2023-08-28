import React from 'react'

import AllMovies from '../Pages/AllMovies';
import MovieDetails from '../Pages/movieDetail.js';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NotFoundPage from '../Pages/NotFoundPage';
import FavMovies from '../Pages/FavMovies.js';

function AllRoutes() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path ="movie/fav_list" element={<FavMovies/>} exact/>
            <Route path ="movie/:id" element={<MovieDetails/>} exact/>
            <Route path ="/" element={<AllMovies/>}/>
            <Route path= "*" element= {<NotFoundPage/>}/>
        </Routes>
    </BrowserRouter>
  )
}

export default AllRoutes;