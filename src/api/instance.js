import axios from 'axios'

import { apiUrl } from '../config/api'

const apiInstance = axios.create({ baseURL: apiUrl })
apiInstance.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`
    return config
})

export { apiInstance }
