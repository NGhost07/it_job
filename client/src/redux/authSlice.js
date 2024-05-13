import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

const API_URL = 'http://localhost:3007/auth/';
const tmp = localStorage.getItem("auth");
const auth = JSON.parse(tmp);

export const signup = createAsyncThunk('SIGNUP', async ({email, password, role}) => {
  const data = {
    email: email,
    password: password,
    role: role,
  }

  const response = await axios.post(`${API_URL}local/signup`, data);
  const auth = response.data;

  localStorage.setItem("auth", JSON.stringify(auth));
  // localStorage.setItem("auth", auth);

  return auth;
})

export const signin = createAsyncThunk('SIGNIN', async ({email, password}) => {
  const data = {
    email: email,
    password: password,
  }

  const response = await axios.post(`${API_URL}local/signin`, data);
  const auth = response.data;
  // localStorage.setItem("auth", auth);
  localStorage.setItem("auth", JSON.stringify(auth));

  return auth;
})

export const signout = createAsyncThunk('SIGNOUT', async (token) => {
  localStorage.removeItem('auth');
  const response = await axios.post(`${API_URL}logout`, null, {
    headers: {
      'Authorization': `Bearer ${token}`,
    }
  });
  const auth = response.data;

  return auth;
})

const initialState = auth
  ? { loading: false, error: null, auth }
  : { loading: false, error: null, auth: null };

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(signup.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(signup.fulfilled, (state, action) => {
      state.loading = false;
      state.auth = action.payload;
    })
    .addCase(signup.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    })
    .addCase(signin.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(signin.fulfilled, (state, action) => {
      state.loading = false;
      state.auth = action.payload;
    })
    .addCase(signin.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    })
    .addCase(signout.fulfilled, (state) => {
      state.auth = null;
      state.succeed = false;
    })
  }
})

export const authActions = authSlice.actions;
export const { selectAuth, selectError } = authSlice.selectors;
export default authSlice.reducer;