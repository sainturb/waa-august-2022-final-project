import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    value: 'light'
}

export const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        lightTheme: state => {
            state.value = 'light'
        },
        darkTheme: state => {
            state.value = 'dark'
        },
        systemTheme: state => {
            state.value = 'system'
        }
    }
});

export const { lightTheme, darkTheme, systemTheme} = themeSlice.actions;

export default themeSlice.reducer;