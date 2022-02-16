//тут врапер для работы с localStorage
//он нужен для удобства и чтобы не писать 
//один и тот же код когда нужно достатоь или положить
//в сторедж строку, массив, объект
export const getItem = key => {
    //trycatch для отлова возможных ошибок парсинга
    try {
        return JSON.parse(localStorage.getItem(key));
    } catch (error) {
        console.log('Error getting data from localStorage', error);
        return null;
    }
};

export const setItem =(key, data) => {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
        console.log('Error setting data to localStorage', error);
        return null;
    }
};