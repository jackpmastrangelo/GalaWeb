import axios from 'axios';
axios.defaults.withCredentials = true;

export let galaAxios = axios.create({ baseURL: "http://localhost:8080", withCredentials: true });
