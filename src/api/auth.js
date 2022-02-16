import axios from '@/api/axios';

//метод принимает данные формы и отправляет запрос
const register = credentials => {
    return axios.post('/users', {user: credentials});
};

export default {
    register,
};