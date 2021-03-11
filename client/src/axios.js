import axios from 'axios'

const instance = axios.create({
    baseURL:'https://us-central1-planup-d79a0.cloudfunctions.net/api'
})

export default instance