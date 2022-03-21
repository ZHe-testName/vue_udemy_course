import userProfileApi from '@/api/userProfile';

const state = {
    data: null,
    isLoading: true,
    errors: null,
};

export const userProfileMutationTypes = {
    userProfileStart: '[userProfile] userProfileStart',
    userProfileFailure: '[userProfile] userProfileFailure',
    userProfileSuccess: '[userProfile] userProfileSuccess',
};

export const actionTypes = {
    getUserProfile: '[userProfile] getUserProfile',
};

const mutations = {
    [userProfileMutationTypes.userProfileStart](state) {
        state.isLoading = true;
    },
    [userProfileMutationTypes.userProfileSuccess](state, payload) {
        state.isLoading = false;
        state.data = payload;
    },
    [userProfileMutationTypes.userProfileFailure](state) {
        state.isLoading = false;
    },
};

const actions = {
    [actionTypes.getUserProfile](context, {slug}) {
        return new Promise(resolve => {
            context.commit(userProfileMutationTypes.userProfileStart);
            
            userProfileApi
                .getUserProfile(slug)
                .then(userProfile => {
                    context.commit(userProfileMutationTypes.userProfileSuccess, userProfile);

                    resolve(userProfile);
                })
                .catch(() => {
                    context.commit(userProfileMutationTypes.userProfileFailure);
                });
        });
    },
};

export default {
    state,
    mutations,
    actions,
};