import axios from 'axios';


const api = axios.create({
    baseURL: 'https://api-yvfj.onrender.com'
})


export default api