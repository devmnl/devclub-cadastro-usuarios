import axios from 'axios';


const api = axios.create({
    baseURL: 'api-production-33bf.up.railway.app'
})


export default api