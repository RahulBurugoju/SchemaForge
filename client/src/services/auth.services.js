import api from '../lib/axios.js'

const register = async (userDetails)=>{
    const response = await api.post("/auth/register",userDetails);

    return response.data
}

const login = async (credentials)=>{
    // credentials={email,password}
   const response= await api.post("/auth/login",credentials)
   return response.data
}

const logout = async ()=>{
    const response = await api.post('/auth/logout');

    return response.data;
}

const refreshAccessToken = async()=>{
    const storedRefreshToken = localStorage.getItem("refreshToken");
    const response = await api.post("/auth/refresh-token", { refreshToken: storedRefreshToken });
    return response.data;
}
const getCurrentUser = async()=>{
    const response = await api.get("/auth/me");
    return response.data;
}

const updateUserProfile = async (profileData) => {
    const response = await api.patch("/auth/profile", profileData);
    return response.data;
}

const authServices = {
    register,
    login,
    logout,
    refreshAccessToken,
    getCurrentUser,
    updateUserProfile
}

export default authServices