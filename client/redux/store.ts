'use client'
import {configureStore} from "@reduxjs/toolkit";
import { apiSlice } from "./features/api/apiSlice";
import authSlice from './features/auth/authSlice';
export const store=configureStore({
    reducer:{
        [apiSlice.reducerPath]:apiSlice.reducer,
        auth:authSlice,
    },
    devTools:false, //if we keep devTools true people can go to web browser and use Redux cape tools to debug
    middleware: (getDefaultMiddleware)=>getDefaultMiddleware().concat(apiSlice.middleware)
})