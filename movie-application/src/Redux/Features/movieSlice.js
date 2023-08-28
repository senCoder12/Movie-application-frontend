import * as api from '../api.js';
import {createSlice, createAsyncThunk } from "@reduxjs/toolkit"

export const createMovie = createAsyncThunk("movie/create", async({movieInfo, navigate, toast}, {rejectWithValue})=> {
    try {
        const response = await api.createMovie(movieInfo);
        toast.success("Movie created successfully");
        navigate("/");
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})

export const getMovies = createAsyncThunk("movie/all", async ({page, query}, {rejectWithValue})=> {
    try {
        const response = await api.getAllMovies(page, query);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})

export const getMovieById = createAsyncThunk("movie/singleMovie", async(id, {rejectWithValue})=> {
    try {
        const response = await api.getMovieById(id);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})

export const deleteMovie = createAsyncThunk("movie/deleteMovie", async({id,toast},{rejectWithValue})=>{
    try {
        const response = await api.deleteMovie(id);
        toast.success("Tour deleted successfully");
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})

export const updateMovie = createAsyncThunk("movie/updateMovie", async({id,updatedMovieData,toast,navigate},{rejectWithValue})=>{
    try {
        const response = await api.updateMovie(updatedMovieData,id);
        toast.success("Tour updated successfully");
        navigate("/");
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})

export const getMovieBySearch = createAsyncThunk("movie/getMoviesBySearch", async(searchQuery,{rejectWithValue})=>{
    try {
        const response = await api.getMovieBySearch(searchQuery);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})

const movieSlice = createSlice({
    name: 'movie',
    initialState: {
        movie: {},
        movies: [],
        favMovies: [],
        moviesBySearch: [],
        currentPage: 1,
        noOfPages: 1,
        totalMovies: 0,
        error: "",
        query: {},
        loading: false
    },
    reducers: {
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        },
        setFavMovies: (state, action) => {
            state.favMovies = [...state.favMovies, action.payload];
        },
        deleteMovieFromFav: (state, action) => {
            const {arg: {id}} = action.meta;
            if(id) {
                state.favMovies = state.favMovies.filter((item)=> item._id !== id);
            }
        },
        setQueryParams: (state, action) => {
            state.query = action.payload;
        }
    },
    extraReducers: {
        [createMovie.pending] : (state,action)=> {
            state.loading = true;
        },
        [createMovie.fulfilled] : (state,action)=> {
            state.loading = false;
        },
        [createMovie.rejected] : (state,action)=> {
            state.loading = false;
            state.error = action.payload.error;
        },
        [getMovies.pending] : (state,action)=> {
            state.loading = true;
        },
        [getMovies.fulfilled] : (state,action)=> {
            state.loading = false;
            state.movies = action.payload.data;
            state.noOfPages = action.payload.noOfPages;
            state.totalMovies = action.payload.totalMovies;
            state.currentPage = action.payload.currentPage;
        },
        [getMovies.rejected] : (state,action)=> {
            state.loading = false;
            state.error = action.payload.error;
        },
        [getMovieById.pending] : (state,action)=> {
            state.loading = true;
        },
        [getMovieById.fulfilled] : (state,action)=> {
            state.loading = false;
            state.movie = action.payload;
        },
        [getMovieById.rejected] : (state,action)=> {
            state.loading = false;
            state.error = action.payload.error;
        },
        [updateMovie.fulfilled] : (state,action)=> {
            state.loading = false;
            const {arg: {id}} = action.meta;
            if(id) {
                state.movies = state.movies.filter((item)=> item._id == id ? action.payload : item);
            }
        },
        [updateMovie.rejected] : (state,action)=> {
            state.loading = false;
            state.error = action.payload.error;
        },
        [updateMovie.pending] : (state,action)=> {
            state.loading = true;
        },
        [deleteMovie.pending] : (state,action)=> {
            state.loading = true;
        },
        [deleteMovie.fulfilled] : (state,action)=> {
            state.loading = false;
            const {arg: {id}} = action.meta;
            if(id) {
                state.movies = state.movies.filter((item)=> item._id !== id);
            }
        },
        [deleteMovie.rejected] : (state,action)=> {
            state.loading = false;
            state.error = action.payload.error;
        },
        [getMovieBySearch.fulfilled] : (state,action)=> {
            state.moviesBySearch = action.payload.data;
        },
    }
})

export const {setCurrentPage, setFavMovies, deleteMovieFromFav, setQueryParams} = movieSlice.actions;
export default movieSlice.reducer;