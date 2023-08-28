import axios from 'axios';

const API = axios.create({baseURL: 'http://localhost:8080'});


export const createMovie = (movieInfo) => API.post('/movie',movieInfo);
export const getAllMovies = (page) => API.get(`/movie/all?page=${page}`);
export const getMovieById = (id) => API.get(`/movie/${id}`);
export const getMovieBySearch = (search) => API.get(`/movie/search?searchQuery=${search}`);
export const updateMovie = (movieInfo, id) => API.put(`/movie/${id}`, movieInfo);
export const deleteMovie = (id) => API.delete(`/movie/${id}`);