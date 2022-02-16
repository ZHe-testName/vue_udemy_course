<template>
  <div class="auth-page">
      <div class="container page">
          <div class="row">
              <div class="col-md-6 offset-md-3 col-xs-12">
                  <h1 class="text-xs-center">Sign Up</h1>

                  <p class="text-xs-center">
                      <!-- обращаясь через объект нам не нужно юзать и потом менять пути -->
                      <router-link to="{name: 'login'}">Need an account?</router-link>
                  </p>

                  <app-validation-errors
                    v-if="validationErrors"
                    :validationErrors="validationErrors"
                    />

                  <form @submit.prevent="onSubmit">
                      <fieldset class="form-group">
                        <input 
                            type="text" 
                            class="form-control form-control-lg"
                            placeholder="Username"
                            v-model="username"
                            >
                      </fieldset>

                      <fieldset class="form-group">
                        <input 
                            type="text" 
                            class="form-control form-control-lg"
                            placeholder="Email"
                            v-model="email"
                            >
                      </fieldset>

                      <fieldset class="form-group">
                        <input 
                            type="password" 
                            class="form-control form-control-lg"
                            placeholder="Password"
                            v-model="password"
                            >
                      </fieldset>

                      <button 
                        class="btn btn-lg btn-primary pull-xs-right"
                        :disabled="isSubmitting"
                        >
                          Sign Up
                      </button>
                  </form>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import AppValidationErrors from '@/components/ValidationErrors';

export default {
    name: 'AppRegister',
    //для удобной работы с формой
    //мы используем обычный data
    //и свяжем его данные с полями формы
    //с помощю двустороннего связывания v-model
    data() {
        return {
            email: '',
            username: '',
            password: '',
        };
    },
    computed: {
        isSubmitting() {
            return this.$store.state.auth.isSubmitting;
        },
        validationErrors() {
            return this.$store.state.auth.validationErrors;
        },
    },
    components: {
        AppValidationErrors,
    },
    methods: {
        onSubmit() {
            //благодоря тому что экшн возвращает промис
            //теперь мы можем работать тут с помощю .then
            this.$store.dispatch('register', {
                email: this.email,
                username: this.username,
                password: this.password,
            })
            //теперь можно делать с юзером что угодно
            //на пример отправить его на свою страничку
            .then(user => {
                console.log(user);
                //таким образом можно сделать редирект на нужную
                //страницу при помощи объекта с именем
                this.$router.push({name: 'home'});
            });
        },
    },
}
</script>

<style>

</style>