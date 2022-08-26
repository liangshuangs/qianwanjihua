import axios from 'axios';
import { getCookie } from '../utils.js';
const host = 'http://123.60.52.23';

export const fetchService = (paramsObject) => {
    let { url, params } = paramsObject;
    url = host + url;
    const hash = window.location.hash;
    if (hash.includes('history')) {
        params.isHistory = 1;
    }
    const token = getCookie('CUID');
    const header = {
        headers: {
            token
        }
    }
    return axios.post(url, params, header);
}