import { createSlice } from "@reduxjs/toolkit";
import { loginUser, logoutUser, registerUser, refreshUserAccessToken, getCurrentUserThunk, updateUserProfileThunk } from "./authThunk"

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
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            state.user = null;
            state.isAuthenticated = false;
            state.loading = false;
            state.initializing = false;
            state.error = null;
            state.tokens = null;
        },
        clearError: (state) => {
            state.error = null;
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
                const payloadData = action.payload?.data;
                const accessToken = payloadData?.accessToken || payloadData?.["access token"];
                const refreshToken = payloadData?.refreshToken || payloadData?.["refresh token"];

                if (accessToken) localStorage.setItem("accessToken", accessToken);
                if (refreshToken) localStorage.setItem("refreshToken", refreshToken);

                state.loading = false;
                state.user = payloadData?.user;
                state.isAuthenticated = true;
                state.error = null;
             })
            .addCase(loginUser.rejected, (state, action) => {
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
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
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
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
                const payloadData = action.payload?.data;
                const accessToken = payloadData?.accessToken || payloadData?.accesstoken;
                const refreshToken = payloadData?.refreshToken || payloadData?.refreshtoken;

                if (accessToken) localStorage.setItem("accessToken", accessToken);
                if (refreshToken) localStorage.setItem("refreshToken", refreshToken);

                state.loading = false;
                state.tokens = payloadData;
             })
            .addCase(refreshUserAccessToken.rejected, (state, action) => {
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                state.loading = false;
                state.isAuthenticated = false;
                state.tokens = null;
                state.error = action.payload
             })
             //----------------------------get current user ----------------------------------
            .addCase(getCurrentUserThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.initializing = true;
            })
            .addCase(getCurrentUserThunk.fulfilled, (state, action) => { 
                state.initializing = false;
                state.user = action.payload?.data;
                state.isAuthenticated=true;
                state.error=null;
            })
            .addCase(getCurrentUserThunk.rejected, (state) => {
                state.initializing = false;
                state.isAuthenticated = false;
                state.user = null;
                state.error = null;
                state.loading = false;
             })
             //----------------------------update user profile ----------------------------------
            .addCase(updateUserProfileThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateUserProfileThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload?.data;
                state.error = null;
            })
            .addCase(updateUserProfileThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
});

export const { clearAuth, clearError } = authSlice.actions;
export default authSlice.reducer;
