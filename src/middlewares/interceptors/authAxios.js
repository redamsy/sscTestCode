import axios from 'axios';
const authAxios = axios.create({
    baseURL : 'http://192.168.1.109:8080/ssctestLaravel/public/api/'
})

export default authAxios;