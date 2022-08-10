import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchAds = createAsyncThunk(
    'fetch/advertisements',
    async () => {
        const response = await axios.get('/api/advertisements');
        return response.data;
    }
);

export const fetchStudents = createAsyncThunk(
    'fetch/students',
    async () => {
        const response = await axios.get('/api/students');
        return response.data;
    }
);

const initialState = {
    ads: [],
    students: []
};

export const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(fetchAds.fulfilled, (state, action) => {
            state.ads = action.payload;
        });
        builder.addCase(fetchStudents.fulfilled, (state, action) => {
            state.students = action.payload;
        });
        builder.addCase(fetchAds.rejected, (state, action) => {
            console.log('rejected');
            console.log(action.error);
        });
    },
});


export default dashboardSlice.reducer;