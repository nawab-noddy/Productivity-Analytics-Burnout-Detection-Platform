import axios from 'axios';

//1. set up the base url for the java backend
const API = axios.create({
    baseURL : 'http://localhost:8080/api'
});

// 2. Automatixally attach the JWT tokens to every request if it exist
API.interceptors.request.use((config) => {
    const token  = localStorage.getItem('token');
    if(config){
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});
export default API;