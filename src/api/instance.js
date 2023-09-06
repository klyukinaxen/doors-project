import axios from 'axios'

import { apiUrl } from '../config/api'

const apiInstance = axios.create({ baseURL: apiUrl })
apiInstance.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`
    return config
})

apiInstance.interceptors.response.use(
    (response) => {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response
    },
    (error) => {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        if (axios.isAxiosError(error) && error.response?.status === 401) {
            localStorage.removeItem('accessToken')
            location.reload()
        }
        // Do something with response error
        return Promise.reject(error)
    }
)

export { apiInstance }
