import axios from 'axios';
const otherAxios = axios.create({
    baseURL : 'http://192.168.1.109:8080/ssctestLaravel/public/api/'
})
otherAxios.defaults.headers.common['Authorization'] = 'Bearer '+localStorage.getItem('ssctestOauthAccessToken');
otherAxios.defaults.headers.common['Accept'] = 'application/json';

export default otherAxios;