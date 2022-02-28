import axios  from "@/api/axios";

//тут мы используем normalizer
//это такой прием который позволяет
//модифицировть и подготовить данные для фронтенда
const getPopularTags = () => {
    return axios.get('/tags').then(response => response.data.tags);
};

export default {
    getPopularTags,
};