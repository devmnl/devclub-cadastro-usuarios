import axios from 'axios';


const api = axios.create({
    baseURL: 'https://api-gj24.onrender.com'
})


export default api