import axios from 'axios'

const instance = axios.create({
    baseURL:'http://localhost:5000/planup-d79a0/us-central1/api'
})

export default instance