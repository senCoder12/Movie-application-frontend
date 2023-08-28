import { configureStore } from "@reduxjs/toolkit";
import movieSlice from "./Features/movieSlice";

export default configureStore({
    reducer: {
        movie: movieSlice
    }
})