import axios from "axios";

export let BASE_URL;
const dev = true;

if (dev) {
    BASE_URL = "http://127.0.0.1:8000";
}
else {
    BASE_URL = "https://miempresa.com";
}

// export const BASE_URL = "http://127.0.0.1:8000";
export const BASE_URL_API = `${BASE_URL}/api`;

const token = "ABCDEFGHIJ";

const api = axios.create({
    baseURL: BASE_URL_API,
    headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
        // 'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
});

api.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error.response?.status === 401) {
            // localStorage.removeItem('token');
            // router.push({ name: 'login' });
            location.href = '/auth/login';
        }
        return Promise.reject(error);
    }
);

export default api;

