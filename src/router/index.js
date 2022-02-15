import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home';
import Register from '@/views/Register';

Vue.use(VueRouter)

const routes = [
  //мы будем использовать для обращения к пути
  //не сам путь а имя
  //как алиас
  //это нужно для того чтобы когда вдруг изменится
  //какойто путь нам не нужно будет веносить правки в проект
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
  }
]

const router = new VueRouter({
  routes
})

export default router
