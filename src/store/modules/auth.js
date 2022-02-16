import authApi from '@/api/auth';

const state = {
    isSubmitting: false,
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
    },
    registerSuccess(state) {
        state.isSubmitting = false;
    },
    registerFailure(state) {
        state.isSubmitting = false;
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