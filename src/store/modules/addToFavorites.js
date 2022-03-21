import addToFavoritesApi from '@/api/addToFavorites'

export const mutationTypes = {
    addToFavoritesStart: '[addToFavorites] Add to favorites start',
    addToFavoritesSucces: '[addToFavorites] Add to favorites succes',
    addToFavoritesFailure: '[addToFavorites] Add to favorites failure',
};

export const actionTypes = {
    addTofavorites: '[[addToFavorites] Add to favorites]',
};

const mutations = {
    [mutationTypes.addToFavoritesStart]() {},
    [mutationTypes.addToFavoritesSucces]() {},
    [mutationTypes.addToFavoritesFailure]() {},
};

const actions = {
    [actionTypes.addTofavorites](context, {slug, isFavorited}) {
        return new Promise (resolve => {
            context.commit(mutationTypes.addToFavoritesStart);

            const promise = isFavorited

                ? addToFavoritesApi.removeFromFavorites(slug)
                : addToFavoritesApi.addToFavorites(slug);
console.log(promise, 'from');
            promise
                .then(article => {
                    context.commit(mutationTypes.addToFavoritesSucces, article);

                    resolve(article);
                })
                .catch(() => {
                    context.commit(mutationTypes.addToFavoritesFailure);
                });
        });
    },
};

export default {
    actions,
    mutations,
};