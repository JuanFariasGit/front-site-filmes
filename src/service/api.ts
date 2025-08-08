import axios, {AxiosInstance} from "axios"

const api: AxiosInstance = axios.create({
    baseURL: __API_URL__,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
})

export default api