import Axios, { type AxiosInstance } from 'axios';

const axios: AxiosInstance = Axios.create({
    baseURL: 'http://127.0.0.1:8000',
    withCredentials: true, 
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Accept': 'application/json',
    },
});

export default axios;