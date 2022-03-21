import axios from '@/api/axios';

const addToFavorites = slug => {
    axios
        .post(`/articles/${slug}/favorite`)
        .then(response => response.data.article);
};

const removeFromFavorites = slug => {
    axios
        .delete(`/articles/${slug}/favorite`)
        .then(response => response.data.article);
};

export default {
    addToFavorites,
    removeFromFavorites
};