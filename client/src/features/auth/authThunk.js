import {createAsyncThunk} from "@reduxjs/toolkit"

import authServices from "../../services/auth.services";

const loginUser = createAsyncThunk("auth/login",async(credentials,thunkAPI)=>{
        try {
            return await authServices.login(credentials);
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Login failed"
            )
        }
});
const logoutUser = createAsyncThunk("auth/logout",async(_,thunkAPI)=>{
    try {
        return await authServices.logout();
    } catch (error) {
        return thunkAPI.rejectWithValue(
             error.response?.data?.message || "Logout failed"
        )
    }
});
const registerUser = createAsyncThunk("auth/register",async(userDetails,thunkAPI)=>{
    try {
        return await authServices.register(userDetails);
    } catch (error) {
        return thunkAPI.rejectWithValue(
             error.response?.data?.message || "Registration failed"
        )
    }
});
const refreshUserAccessToken = createAsyncThunk("auth/refresh-token",async(_,thunkAPI)=>{
    try {
        return await authServices.refreshAccessToken()
    } catch (error) {
        return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Refresh token failed"
            );
    }
});
const getCurrentUserThunk = createAsyncThunk("auth/getCurrentUser",async(_,thunkAPI)=>{
    try {
        return await authServices.getCurrentUser();
    } catch (error) {
        return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Failed to fetch user"
            );
    }
});

export {loginUser,logoutUser,registerUser,refreshUserAccessToken,getCurrentUserThunk}
