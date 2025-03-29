import axios from "axios";
import { useRouter } from "vue-router";

// const BASE_URL = process.env.NODE_ENV === "development" 
//     ? "http://127.0.0.1:8000" 
//     : "https://miempresa.com";

export const BASE_URL = "http://127.0.0.1:8000";
export const BASE_URL_API = `${BASE_URL}/api`;

const token = localStorage.getItem("access_token") || "";

const api = axios.create({
    baseURL: BASE_URL_API,
    headers: {
        'Accept': 'application/json',
        // 'Authorization': `Bearer ${token}`,
        // ...(token && { 'Authorization': `Bearer ${token}` }), // Solo agrega 'Authorization' si hay token
    },
});

// Cargar el token al inicio para que se mantenga tras recargar la página
const storedToken = localStorage.getItem("access_token");
if (storedToken) {
    api.defaults.headers['Authorization'] = `Bearer ${storedToken}`;
}

// Función para actualizar el token en los headers
export const setAuthToken = (token) => {
    if (token) {
        console.log('Token setAuthToken: ', token);
        
        localStorage.setItem('access_token', token);
        api.defaults.headers['Authorization'] = `Bearer ${token}`;
    } else {
        console.log('Token setAuthToken: null', token);
        localStorage.removeItem('access_token');
        delete api.defaults.headers['Authorization'];
    }
};

api.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error.response && error.response?.status === 401) {
            console.log('Error 401', error.response);
            
            // localStorage.removeItem('access_token');
            setAuthToken(null);

            // useRouter() no se usa directamente en api.js 
            // (¡bien hecho! porque no funciona fuera de setup).
            // const router = useRouter()
            // router.push({ name: 'MiLogin' });

            location.href = '/auth/login';
        }
        return Promise.reject(error);
    }
);

export default api;

