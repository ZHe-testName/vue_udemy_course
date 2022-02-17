import axios from 'axios';
import {getItem} from '@/helpers/persistanceStorage';

axios.defaults.baseURL = 'https://conduit.productionready.io/api';

//Interceptors это промежуточный слой который выполняется
//после начала запроса перед отправкой(по середине)
//в нем можно настроить параметры запроса для axios
axios.interceptors.request.use(config => {
    const token = getItem('authToken');

    const authToken = token ? `Token ${token}` : '';

    config.headers.Authorization = authToken;

    return config;
});

export default axios;