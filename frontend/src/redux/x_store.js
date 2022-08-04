import {configureStore} from "@reduxjs/toolkit";
import themeReducer from "./themeSlice";

export const x_store = configureStore({
    reducer: {
        theme: themeReducer
    }
});