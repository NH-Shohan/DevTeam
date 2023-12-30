import axios from 'axios';

// Set your base URL here
const baseURL = 'http://localhost:3333';

const axiosInstance = axios.create({
  baseURL,
});

export default axiosInstance;
