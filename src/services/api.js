import axios from 'axios';


const api = axios.create({
    baseURL: 'https://api-produção-33bf.up.railway.app'
})


export default api