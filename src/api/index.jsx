import axios from 'axios';

const baseURL = import.meta.env.VITE_BASE_URL;

export const jsonAxios = axios.create({
  baseURL, // tương ứng với http://localhost:8080/api/v1/
  headers: {
    'Content-Type': 'application/json',
  },
});

export const formAxios = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});
