<template>
  <nav class="navbar navbar-light">
      <div class="container">
          <router-link 
            class="navbar-brand" 
            :to="{name: 'home'}"
            >
            Medium Clone</router-link>

          <ul class="nav navbar-nav pull-xs-right">
              <!-- exact нужен для того чтобы роутер подсвечивал ссылку 
              только при полном совпадении пути
              а не при частичном вхождении -->
              <li class="nav-item">
                  <router-link 
                    class="nav-link" 
                    :to="{name: 'home'}"
                    active-class="active"
                    exact
                    >
                    Home</router-link>
              </li>
                <!-- template нужен для обеденения логики для нескольки эллементов
                он не рендерится в DOM а просто обединяет элементы -->
              <template v-if="isLoggedOn"> 
                    <li class="nav-item">
                        <router-link 
                            class="nav-link" 
                            :to="{name: 'createArticle'}"
                            active-class="active"
                            >
                            <i class="ion-compose"></i> &nbsp; New Article
                        </router-link>
                    </li>

                    <li class="nav-item">
                        <router-link 
                            class="nav-link" 
                            :to="{name: 'settings'}"
                            active-class="active"
                            >
                            <i class="ion-gear-a"></i> &nbsp; Settings
                        </router-link>
                    </li>

                     <li class="nav-item">
                         <!-- в :to можно передавать не только путь но и другие настройки
                         на пример на нужен профиль конкретного юзера userProfile/user
                         то мы можем передать туда объект params с настройками -->
                        <router-link 
                            class="nav-link" 
                            :to="{name: 'userProfile', params: {slug: currentUser.username}}"
                            active-class="active"
                            >
                            <img 
                                class="user-pic"
                                :src="currentUser.image" 
                                alt="user" 
                            >
                            &nbsp;
                            {{currentUser.username}}
                        </router-link>
                    </li>
              </template>

               <template v-if="isAnonymous">
                    <li class="nav-item">
                        <router-link 
                            class="nav-link" 
                            :to="{name: 'register'}"
                            active-class="active"
                            >
                            Sign Up
                        </router-link>
                    </li>

                    <li class="nav-item">
                        <router-link 
                            class="nav-link" 
                            :to="{name: 'login'}"
                            active-class="active"
                            >
                            Sign In
                        </router-link>
                    </li>
              </template>
          </ul>
      </div>
  </nav>
</template>

<script>
// import getterTypes from '@/store/modules/auth';
import {mapGetters} from 'vuex';

export default {
    name: 'AppHeader',
    computed: {
        ...mapGetters([
            'currentUser',
            'isLoggedOn',
            'isAnonymous',
        ]),
        // currentUser() {
        //     console.log(this.$store.getters[getterTypes.currentUser]);
        //     return this.$store.getters[getterTypes.currentUser];
        // },
        // isLoggedOn() {
        //     console.log(this.$store.getters[getterTypes.isLoggedOn]);
        //     return this.$store.getters[getterTypes.isLoggedOn];
        // },
        // isAnonymous() {
        //     return this.$store.getters[getterTypes.isAnonymous];
        // },
    },
}
</script>

<style>

</style>