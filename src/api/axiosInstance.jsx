import axios from "axios";
import Swal from "sweetalert2";

const API = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/',
    headers: {
    "Content-Type": "application/json",
    
  }

});


API.interceptors.request.use(
    function (config) {
    // Do something before request is sent
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['Authorization'] = `Token ${token}`;
    }
    return config;
    }, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
API.interceptors.response.use(
    function (response) {
    if (response.data && response.data.token) {
        localStorage.setItem('token', response.data.token);
    }
    return response;
},
 function (error) {

    if (error.response && error.response.status === 401) {
        Swal.fire("Unauthorized access - redirecting to login");
    } else {
        console.error("API Error:", error);
    }

    if (error.response.status === 404) {
        Swal.fire('Page not found')
    }
    return Promise.reject(error);
    

});

export default API;
