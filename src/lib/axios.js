import axios from 'axios';

const api = axios.create({
  baseURL: 'http://dummy.json.com',
})

export default api;