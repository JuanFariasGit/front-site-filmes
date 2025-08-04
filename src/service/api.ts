import axios, {AxiosInstance} from "axios"

const api: AxiosInstance = axios.create({
    baseURL: 'http://localhost:8080/api',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
})

export default api