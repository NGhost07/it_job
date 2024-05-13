import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:3007/user-profile/';

export const fetchProfile = createAsyncThunk('FETCH_PROFILE', async () => {
    const response = await axios.get(`${API_URL}user`, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(localStorage.auth).access_token}`,
        }
    });

    return response.data;
});

export const createProfile = createAsyncThunk('CREATE_PROFILE', async ({fullName, phoneNumber, birthday}) => {
    const gender = 'MALE'
    const data = {
        full_name: fullName,
        phone_number: phoneNumber,
        date_of_birth: birthday,
        profile_photo_url: "",
        cover_photo_url: "",
        gender: gender,
        address: "",
        about_me: "",
        cv_url: "",
        cover_letter_url: "",
    }

    const response = await axios.post(`${API_URL}`, data, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(localStorage.auth).access_token}`,
        }
    });

    return response.data;
})

const initialState = {
    profile: null,
    loading: false,
    error: null,
};

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchProfile.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchProfile.fulfilled, (state, action) => {
            state.profile = action.payload;
            state.loading = false;
        })
        .addCase(fetchProfile.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
        .addCase(createProfile.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(createProfile.fulfilled, (state, action) => {
            state.profile = action.payload;
            state.loading = false;
        })
        .addCase(createProfile.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
    },
});

export const profileActions = profileSlice.actions;
export const { selectProfile, selectLoading, selectError } = profileSlice.selectors;
export default profileSlice.reducer;