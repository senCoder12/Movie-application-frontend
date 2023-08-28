import axios from 'axios';

const API = axios.create({baseURL: 'https://movie-application-backend.onrender.com'});


export const createMovie = (movieInfo) => API.post('/movie',movieInfo);
export const getAllMovies = (page, query) => {
    let url = `/movie/all?page=${page}`;
    if (query && query.sortBy) {
        url += `&sortBy=${query.sortBy}&orderBy=${query.orderBy || 'asc'}`;
    }
    if (query && query.filterBy) {
        query.filterBy.forEach(element => {
            url += `&${element.filter_type}=${element.value}`;
        });
    }
    return API.get(url);
};
export const getMovieById = (id) => API.get(`/movie/${id}`);
export const getMovieBySearch = (search) => API.get(`/movie/search?searchQuery=${search}`);
export const updateMovie = (movieInfo, id) => API.put(`/movie/${id}`, movieInfo);
export const deleteMovie = (id) => API.delete(`/movie/${id}`);