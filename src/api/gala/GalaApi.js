import axios from 'axios';
import Session from '../../state/Session';

axios.defaults.withCredentials = true;

export let galaAxios = axios.create({ baseURL: "http://localhost:8080" });
