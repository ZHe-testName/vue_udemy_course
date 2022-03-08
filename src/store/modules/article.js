import articleApi from '@/api/article';

const state = {
    data: null,
    isLoading: true,
    errors: null,
};

export const articleMutationTypes = {
    //get article
    getArticleStart: '[article] getArticleStart',
    getArticleFailure: '[article] getArticleFailure',
    getArticleSuccess: '[article] getArticleSuccess',

    //delete article
    deleteArticleStart: '[article] deleteArticleStart',
    deleteArticleFailure: '[article] deleteArticleFailure',
    deleteArticleSuccess: '[article] deleteArticleSuccess',
};

export const actionTypes = {
    getAricle: '[article] getAricle',
    deleteAricle: '[article] deleteAricle',
};

const mutations = {
    //get mutation types
    [articleMutationTypes.getArticleStart](state) {
        state.isLoading = true;
        state.data = null;
    },
    [articleMutationTypes.getArticleSuccess](state, payload) {
        state.isLoading = false;
        state.data = payload;
    },
    [articleMutationTypes.getArticleFailure](state) {
        state.isLoading = false;
    },

    //delete mutation types
    [articleMutationTypes.deleteArticleStart]() {},
    [articleMutationTypes.deleteArticleFailure]() {},
    [articleMutationTypes.deleteArticleSuccess]() {},
};

const actions = {
    [actionTypes.getAricle](context, {slug}) {
        return new Promise(resolve => {
            context.commit(articleMutationTypes.getArticleStart);
            
            articleApi
                .getArticle(slug)
                .then(article => {
                    context.commit(articleMutationTypes.getArticleSuccess, article);

                    resolve(article);
                })
                .catch(() => {
                    console.log(articleMutationTypes.getArticleFailure);
                    context.commit(articleMutationTypes.getArticleFailure);
                });
        });
    },
    [actionTypes.deleteAricle](context, {slug}) {
        return new Promise(resolve => {
            context.commit(articleMutationTypes.deleteArticleStart);
            
            articleApi
                .deleteArticle(slug)
                .then(() => {
                    context.commit(articleMutationTypes.deleteArticleSuccess);

                    resolve();
                })
                .catch(() => {
                    console.log(articleMutationTypes.deleteArticleFailure);
                    context.commit(articleMutationTypes.deleteArticleFailure);
                });
        });
    },
};

export default {
    state,
    mutations,
    actions,
};