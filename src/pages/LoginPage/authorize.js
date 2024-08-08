import axios from 'axios';

let ACCESS_TOKEN = localStorage.getItem('accessToken');

const auth = axios.create({
    baseURL: 'https://dev.snorose.com',
    credentials:'include',
    headers:{
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
    }
})
const res = await auth.get("/v1/users/mypage")
export default res.data.result;


