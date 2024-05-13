import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:3007/job';

export const filterJob = createAsyncThunk('FILTER_JOB', async (searchInput) => {
    const response = await axios.get(`${API_URL}/title/${searchInput}`)
    return response.data;
})

export const getAllJobs = createAsyncThunk('GET_ALL_JOB', async () => {
    const response = await axios.get(`${API_URL}`)
    return response.data;
})

export const getJobsByCompanyInforId = createAsyncThunk('GET_JOB_BY_COMPANY_INFOR_ID', async (copanyInforId) => {
    const response = await axios.get(`${API_URL}/copany-infor/${copanyInforId}`)
    return response.data;
})

const initialState = {
    jobs: null,
    loading: false,
    error: null,
};

const jobsSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(filterJob.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(filterJob.fulfilled, (state, action) => {
            state.jobs = action.payload;
            state.loading = false;
        })
        .addCase(filterJob.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
        .addCase(getAllJobs.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getAllJobs.fulfilled, (state, action) => {
            state.jobs = action.payload;
            state.loading = false;
        })
        .addCase(getAllJobs.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
        .addCase(getJobsByCompanyInforId.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getJobsByCompanyInforId.fulfilled, (state, action) => {
            state.jobs = action.payload;
            state.loading = false;
        })
        .addCase(getJobsByCompanyInforId.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
    },
});

export const jobsActions = jobsSlice.actions;
export const { selectJobs, selectLoading, selectError } = jobsSlice.selectors;
export default jobsSlice.reducer;