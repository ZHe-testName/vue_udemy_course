import Vue from 'vue';
import Vuex from 'vuex';

import auth from '@/store/modules/auth';
import feed from '@/store/modules/feed';
import popularTags from '@/store/modules/popularTags';
import article from '@/store/modules/article';
import createArticle from '@/store/modules/createArticle';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
  },
  //синхронные экшены которые работают на клиенте
  //здесь нельзя делать нкаких сайд зффектов
  //просто нужно писать чистые функции
  mutations: {
  },
  //асинхронные вызовы
  //для запросов на бек
  //тут можно юзать сайд эффекты 
  //сайд эффекты - это все что не связано с основным потоком данных

  //экшены не видны в Vue Devtools
  actions: {
  },
  //используется для организации экшенов мутаций и стейта
  modules: {
    auth,
    feed,
    popularTags,
    article,
    createArticle,
  },
});
