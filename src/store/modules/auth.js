import authApi from '@/api/auth';
import {setItem} from '@/helpers/persistanceStorage';

const state = {
    isSubmitting: false,
    currentUser: null,
    validationErrors: null,
    isLoggedOn: null,
};

//так как у нас в большинстве случаев
//запрос имеет три состояния
//старт (pending)
//успешный (success)
//с ошибкой (error)

//то и соответсвенных мутаций будет три вида
const mutations = {
    registerStart(state) {
        state.isSubmitting = true;
        state.validationErrors = null;
    },
    registerSuccess(state, payload) {
        state.isSubmitting = false;
        state.currentUser = payload;
        state.isLoggedOn = true;
    },
    registerFailure(state, payload) {
        state.isSubmitting = false;
        state.validationErrors = payload;
    },
};

//экшн может принимать два параметра
//глобальный контекст и
//нагрузку
const actions = {
    register(context, credentials) {
        //промис возвращаем для того чтобы в 
        //компоненте можно было реагировать на экшн
        //и работать с ним через .then
        //что очень удобно
        return new Promise(resolve => {
            context.commit('registerStart');

            authApi
                .register(credentials)
                .then(res => {
                    context.commit('registerSuccess', res.data.user);
                    resolve(res.data.user);
                    //экшены хорошо подходят для сайдеффектов
                    //по этому мы именно от сюда 
                    //делаем запросы к API
                    //или к localStorage
                    setItem('authToken', res.data.user.token);
                })
                .catch(err => {
                    context.commit('registerFailure', err.response.data.errors);
                });
        })
    },
};
export default {
    state,
    mutations,
    actions,
};