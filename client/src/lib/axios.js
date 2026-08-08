import axios from "axios"

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:9000/api/v1",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 30000
})

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
)

api.interceptors.response.use(
    (response) => { return response },

    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry && !originalRequest.url?.includes("/auth/refresh-token")) {
            originalRequest._retry = true;

            try {
                const storedRefreshToken = localStorage.getItem("refreshToken");
                const response = await api.post("/auth/refresh-token", { refreshToken: storedRefreshToken });

                const newAccessToken = response.data?.data?.accessToken || response.data?.data?.accesstoken;
                const newRefreshToken = response.data?.data?.refreshToken || response.data?.data?.refreshtoken;

                if (newAccessToken) {
                    localStorage.setItem("accessToken", newAccessToken);
                    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                }
                if (newRefreshToken) {
                    localStorage.setItem("refreshToken", newRefreshToken);
                }

                return api(originalRequest);
            } catch (refreshError) {
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");

                window.location.href = "/login";
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
)

export default api

