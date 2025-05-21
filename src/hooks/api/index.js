import axios from 'axios'

const api = axios.create({
    baseURL: "http://dummyjson.com/",
    Headers:{
        "Content-Type":"application/json"
    }
})

export default api