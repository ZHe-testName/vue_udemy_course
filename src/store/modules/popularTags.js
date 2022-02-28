import getPopularTagsApi from '@/api/popularTags';

const state = {
    data: null,
    isLoading: true,
    errors: null,
};

export const popularTagsMutationTypes = {
    getPopularTagsStart: '[popularTags] getPopularTagsStart',
    getPopularTagsFailure: '[popularTags] getPopularTagsFailure',
    getPopularTagsSuccess: '[popularTags] getPopularTagsSuccess',
};

export const actionTypes = {
    getPopularTags: '[popularTags] getPopularTags',
};

const mutations = {
    [popularTagsMutationTypes.getPopularTagsStart](state) {
        state.isLoading = true;
    },
    [popularTagsMutationTypes.getPopularTagsSuccess](state, payload) {
        state.isLoading = false;
        state.data = payload;
    },
    [popularTagsMutationTypes.getPopularTagsFailure](state) {
        state.isLoading = false;
    },
};

const actions = {
    [actionTypes.getPopularTags](context) {
        return new Promise(resolve => {
            context.commit(popularTagsMutationTypes.getPopularTagsStart);
            
            getPopularTagsApi
                .getPopularTags()
                .then(tags => {
                    context.commit(popularTagsMutationTypes.getPopularTagsSuccess, tags);

                    resolve(tags);
                })
                .catch(() => {
                    console.log(popularTagsMutationTypes.getPopularTagsFailure);
                    context.commit(popularTagsMutationTypes.getPopularTagsFailure);
                });
        });
    },
};

export default {
    state,
    mutations,
    actions,
};