import feedApi from '@/api/feed';

const state = {
    data: null,
    isLoading: true,
    errors: null,
};

export const feedMutationTypes = {
    getFeedStart: '[feed] getFeedStart',
    getFeedFailure: '[feed] getFeedFailure',
    getFeedSuccess: '[feed] getFeedSuccess',
};

export const actionTypes = {
    getFeed: '[feed] getFeed',
};

const mutations = {
    [feedMutationTypes.getFeedStart](state) {
        state.isLoading = true;
    },
    [feedMutationTypes.getFeedSuccess](state, payload) {
        state.isLoading = false;
        state.data = payload;
    },
    [feedMutationTypes.getFeedFailure](state) {
        state.isLoading = false;
    },
};

const actions = {
    [actionTypes.getFeed](context, {apiUrl}) {
        return new Promise(resolve => {
            context.commit(feedMutationTypes.getFeedStart);
            
            feedApi
                .getFeed(apiUrl)
                .then(response => {
                    context.commit(feedMutationTypes.getFeedSuccess, response.data);

                    resolve(response.data);
                })
                .catch(() => {
                    console.log(feedMutationTypes.getFeedFailure);
                    context.commit(feedMutationTypes.getFeedFailure);
                });
        });
    },
};

export default {
    state,
    mutations,
    actions,
};