import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:3007';

export const fetchCompanyInfor = createAsyncThunk('FETCH_COMPANY_INFOR', async (user_id) => {
    const response = await axios.get(`${API_URL}/company-infor/company/${user_id}`, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(localStorage.auth).access_token}`,
        }
    });
    return response.data;
});

const initialState = {
    company: null,
    loading: false,
    error: null,
};

const companySlice = createSlice({
    name: 'company',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchCompanyInfor.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchCompanyInfor.fulfilled, (state, action) => {
            state.company = action.payload;
            state.loading = false;
        })
        .addCase(fetchCompanyInfor.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
    },
});

export const companyActions = companySlice.actions;
export const { selectCompany, selectLoading, selectError } = companySlice.selectors;
export default companySlice.reducer;