import axios from 'axios';

const api = axios.create({
  baseURL: 'http://10.1.3.100:3333'
})

export { api };