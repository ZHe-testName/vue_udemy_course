import axios from '@/api/axios';

//метод принимает данные формы и отправляет запрос
const register = credentials => {
    return axios.post('/users', {user: credentials});
};

const login = crudentials => {
    return axios.post('/users/login', {user: crudentials});
};

const getCurrentUser = () => {
    return axios.get('/user');
};

export default {
    register,
    login,
    getCurrentUser,
};