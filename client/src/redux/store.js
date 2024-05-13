import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import userReducer from './userSlice'
import profileReducer from "./profileSlice";
import jobsReducer from "./jobsSlice";
import companyReducer from "./companySlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        profile: profileReducer,
        jobs: jobsReducer,
        company: companyReducer
    },
    devTools: true,
})
