import axios from 'axios';

export const axiosInstances = axios.create({
    baseURL:process.env.BASE_URL
})
