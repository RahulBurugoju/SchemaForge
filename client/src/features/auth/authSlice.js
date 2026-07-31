import { createSlice } from "@reduxjs/toolkit";
import { loginUser, logoutUser, registerUser, refreshUserAccessToken, getCurrentUserThunk } from "./authThunk"

const initialState = {
    user: null,
    isAuthenticated: false,
    loading: false,
    initializing :true,
    error: null,
    tokens:null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        clearAuth: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.loading = false;
            state.initializing = false;
            state.error = null;
            state.tokens = null;
        },
    },
    extraReducers: (builder) => {
        builder
        //----------------------------Register------------------------------
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload?.data;
                state.error = null;
             })
            .addCase(registerUser.rejected, (state, action) => { 
                state.loading = false;
                state.error = action.payload;
            })
            // ------------------Login-----------------------
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload?.data?.user;
                state.isAuthenticated = true;
             })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.isAuthenticated = false;
             })
             //------logout-------------------
            .addCase(logoutUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(logoutUser.fulfilled, (state) => { 
                state.loading = false;
                state.user = null;
                state.isAuthenticated = false;
                state.error = null;
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
             })
             //------------------------------refresh access token ------------------------------------
            .addCase(refreshUserAccessToken.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(refreshUserAccessToken.fulfilled, (state, action) => {
                state.loading = false;
                state.tokens = action.payload?.data;
             })
            .addCase(refreshUserAccessToken.rejected, (state, action) => {
                state.loading =false;
                state.isAuthenticated = false;
                 state.tokens = null;
                state.error = action.payload
             })
             //----------------------------get current user ----------------------------------
            .addCase(getCurrentUserThunk.pending, (state) => {
                // state.loading = true,
                //     state.error = null
                state.initializing = true;
            })
            .addCase(getCurrentUserThunk.fulfilled, (state, action) => { 
                 state.initializing = false;
                state.user = action.payload?.data;
                state.isAuthenticated=true;
                state.error=null;
            })
            .addCase(getCurrentUserThunk.rejected, (state, action) => {
                 state.initializing = false;
                state.isAuthenticated=false;
                state.user = null;
                // state.error = action.payload;
             })
    }
});

export const {clearAuth} = authSlice.actions;
export default authSlice.reducer;
