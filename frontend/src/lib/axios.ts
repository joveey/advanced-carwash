import Axios, { type AxiosInstance } from 'axios';

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';

const axios: AxiosInstance = Axios.create({
    baseURL: backendUrl,
    withCredentials: true,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

// Add request interceptor for debugging
axios.interceptors.request.use(
    config => {
        console.log('Making request to:', config.url);
        return config;
    },
    error => {
        console.error('Request error:', error);
        return Promise.reject(error);
    }
);

// Add response interceptor for debugging
axios.interceptors.response.use(
    response => {
        console.log('Response received:', response);
        return response;
    },
    error => {
        console.error('Response error:', error.response || error);
        return Promise.reject(error);
    }
);

export default axios;