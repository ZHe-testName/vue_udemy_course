import axios from '@/api/axios';

const getArticle = slug => {
    return axios
                .get(`/articles/${slug}`)
                .then(responce => responce.data.article);
}; 

const deleteArticle = slug => {
    return axios.delete(`/articles/${slug}`);
}; 

const createArticle = articleInput => {
    return axios
                .post('/articles', {article: articleInput})
                .then(response => response.data.article);
};

const updateAricle = (slug, articleInput) => {
    return axios
                .put(`/articles/${slug}`, {article: articleInput})
                .then(response => response.data.article);
};

export default {
    getArticle,
    deleteArticle,
    createArticle,
    updateAricle,
};