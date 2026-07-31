import axios from "axios"
import store from '../app/store.js'
import { clearAuth } from "../features/auth"

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 5000
})

api.interceptors.request.use(
    (config)=>{
        return config
    },
    (error)=> Promise.reject(error)
)

// api.interceptors.response.use(
//     (response) => response,
//     (error) => {
//         return Promise.reject(error);
//     }
// );

api.interceptors.response.use(
    (response)=>{return response},

    async (error)=>{
        const originalRequest = error.config;

        if(error.response?.status === 401 && !originalRequest._retry && !originalRequest.url?.includes("/auth/refresh-token")){
            originalRequest._retry=true;

            try {
                await api.post("/auth/refresh-token")

                return api(originalRequest);
            } catch (refreshError) {
                store.dispatch(clearAuth());

                window.location.href = "/login";
                return Promise.reject(refreshError)
            }
        }

        return Promise.reject(error)
    }
)

export default api

