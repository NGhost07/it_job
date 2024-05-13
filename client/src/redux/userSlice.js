import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:3007/auth/';

export const fetchUser = createAsyncThunk('FETCH_USER', async () => {
    const response = await axios.get(`${API_URL}user`, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(localStorage.auth).access_token}`,
        }
    });
    return response.data;
});

const initialState = {
    user: null,
    loading: false,
    error: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchUser.fulfilled, (state, action) => {
            state.user = action.payload;
            state.loading = false;
        })
        .addCase(fetchUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
    },
});

export const userActions = userSlice.actions;
export const { selectUser, selectLoading, selectError } = userSlice.selectors;
export default userSlice.reducer;