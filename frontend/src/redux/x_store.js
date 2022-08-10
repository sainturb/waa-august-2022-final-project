import {configureStore} from "@reduxjs/toolkit";
import themeReducer from "./themeSlice";
import dashReducer from './dash-reducer'

export const x_store = configureStore({
    reducer: {
        theme: themeReducer,
        dashboard: dashReducer
    }
});