import React from 'react'

import AllMovies from '../Pages/AllMovies';
import MovieDetails from '../Pages/movieDetail';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NotFoundPage from '../Pages/NotFoundPage';

function AllRoutes() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path ="/" element={<AllMovies/>}/>
            <Route path ="/movie/:id" element={<MovieDetails/>}/>
            <Route path= "*" element= {<NotFoundPage/>}/>
        </Routes>
    </BrowserRouter>
  )
}

export default AllRoutes