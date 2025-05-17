import axios from 'axios';

const baseURL = 'http://127.0.0.1:8000';

const axiosInstance = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    }
});

// Axios Interceptor
axiosInstance.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;
        if (
            error.response.status === 401 &&
            !originalRequest._retry &&
            localStorage.getItem('refreshToken')
        ) {
            originalRequest._retry = true;
            try {
                const res = await axios.post(`${baseURL}/api/token/refresh/`, {
                    refresh: localStorage.getItem('refreshToken'),
                });
                localStorage.setItem('accessToken', res.data.access);
                originalRequest.headers['Authorization'] = `Bearer ${res.data.access}`;
                return axios(originalRequest);
            } catch (err) {
                console.error("Token refresh амжилтгүй:", err);
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.request.use(config => {
    const token = localStorage.getItem('accessToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default axiosInstance;
