import authApi from '@/api/auth';
import {setItem} from '@/helpers/persistanceStorage';

const state = {
    isSubmitting: false,
    currentUser: null,
    validationErrors: null,
    isLoggedOn: null,
    isLoading: false,
};

//так как мутации и экшены у нас это просто строки
//то при их использовании мы можем наделать ошибок
//можно чтобы этого избежать
//создать объекты с колекциями этих строк
//и при каких либо изменениях 
//вносить их только в одном месте
export const mutationTypes = {
    //префикс в названии просто для удобства
    //чтобы понимать из какой компоненты мутайия при дебаге

    //register mutations
    registerStart: '[auth] registerStart',
    registerSuccess: '[auth] registerSuccess',
    registerFailure: '[auth] registerFailure',

    //login mutations
    loginStart: '[auth] loginStart',
    loginSuccess: '[auth] loginSuccess',
    loginFailure: '[auth] loginFailure',

    //get current user mutations
    getCurrentUserStart: '[auth] getCurrentUserStart',
    getCurrentUserSuccess: '[auth] getCurrentUserSuccess',
    getCurrentUserFailure: '[auth] getCurrentUserFailure',
};

//так как у нас в большинстве случаев
//запрос имеет три состояния
//старт (pending)
//успешный (success)
//с ошибкой (error)

//то и соответсвенных мутаций будет три вида
const mutations = {
    //квадратные скобки нужны для того
    //чтобы js вичислить название метода
    //иначе будет ошибка так как по ссылке просто строка

    //register mutations
    [mutationTypes.registerStart](state) {
        state.isSubmitting = true;
        //для очистки данных ошибок при повторном запросе
        state.validationErrors = null;
    },
    [mutationTypes.registerSuccess](state, payload) {
        state.isSubmitting = false;
        state.currentUser = payload;
        state.isLoggedOn = true;
    },
    [mutationTypes.registerFailure](state, payload) {
        state.isSubmitting = false;
        state.validationErrors = payload;
    },

    //login mutations
    [mutationTypes.loginStart](state) {
        state.isSubmitting = true;
        state.validationErrors = null;
    },
    [mutationTypes.loginSuccess](state, payload) {
        state.isSubmitting = false;
        state.currentUser = payload;
        state.isLoggedOn = true;
    },
    [mutationTypes.loginFailure](state, payload) {
        state.isSubmitting = false;
        state.validationErrors = payload;
    },

    //getCurrent User mutations
    [mutationTypes.getCurrentUserStart](state) {
        state.isLoading = true;
    },
    [mutationTypes.getCurrentUserSuccess](state, payload) {
        state.isLoading = false;
        state.currentUser = payload;
        state.isLoggedOn = true;
    },
    [mutationTypes.getCurrentUserFailure](state) {
        state.isLoading = false;
        state.isLoggedOn = false;
        state.currentUser = null;
    },
};

export const getterTypes = {
    currentUser: '[auth] currentUser',
    isLoggedOn: '[auth] isLoggedOn',
    isAnonymous: '[auth] isAnonymous',
};

//гетткры нужны для того чтобы не дудлировать код
//в разных компонентах для которых нужны определенные одни и те же данные

//так же если данные с стора нужно предварительно обработать
//и отдать

//геттеры глобальны

//в модулях геттеры принимают не глобальный стейт а лиш срез своего модуля
const getters = {
    [getterTypes.currentUser]: state => {
        return state.currentUser;
    },
    [getterTypes.isLoggedOn]: state => {
        return Boolean(state.isLoggedOn);
    },
    [getterTypes.isAnonymous]: state => {
        return state.isLoggedOn === false;
    },
};

export const actionTypes = {
    register: '[auth] register',
    login: '[auth] login',
    getCurrentUser: '[auth] getCurrentUser',
    
};

//экшн может принимать два параметра
//глобальный контекст и
//нагрузку
const actions = {
    [actionTypes.register](context, credentials) {
        //промис возвращаем для того чтобы в 
        //компоненте можно было реагировать на экшн
        //и работать с ним через .then
        //что очень удобно
        return new Promise(resolve => {
            context.commit(mutationTypes.registerStart);

            authApi
                .register(credentials)
                .then(res => {
                    context.commit(mutationTypes.registerSuccess, res.data.user);
                    resolve(res.data.user);
                    //экшены хорошо подходят для сайдеффектов
                    //по этому мы именно от сюда 
                    //делаем запросы к API
                    //или к localStorage
                    setItem('authToken', res.data.user.token);
                })
                .catch(err => {
                    context.commit(mutationTypes.registerFailure, err.response.data.errors);
                });
        })
    },
    [actionTypes.login](context, credentials) {
        return new Promise(resolve => {
            context.commit(mutationTypes.loginStart);

            authApi
                .login(credentials)
                .then(res => {
                    context.commit(mutationTypes.loginSuccess, res.data.user);

                    resolve(res.data.user);
                    setItem('authToken', res.data.user.token);
                })
                .catch(err => {
                    context.commit(mutationTypes.loginFailure, err.response.data.errors);
                });
        })
    },
    [actionTypes.getCurrentUser](context) {
        return new Promise(resolve => {
            context.commit(mutationTypes.getCurrentUserStart);

            authApi
                .getCurrentUser()
                .then(res => {
                    context.commit(mutationTypes.getCurrentUserSuccess, res.data.user);

                    resolve(res.data.user);
                })
                .catch(() => {
                    context.commit(mutationTypes.getCurrentUserFailure);
                });
        })
    },
};
export default {
    state,
    mutations,
    actions,
    getters,
};