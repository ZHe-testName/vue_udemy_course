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

                  VALIDATION FIELDS

                  <form @submit.prevent="onSubmit">
                      <fieldset class="form-group">
                        <input 
                            type="text" 
                            class="form-control form-control-lg"
                            placeholder="Username">
                      </fieldset>

                      <fieldset class="form-group">
                        <input 
                            type="text" 
                            class="form-control form-control-lg"
                            placeholder="Email">
                      </fieldset>

                      <fieldset class="form-group">
                        <input 
                            type="password" 
                            class="form-control form-control-lg"
                            placeholder="Password">
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
export default {
    name: 'AppRegister',
    computed: {
        isSubmitting() {
            return this.$store.state.auth.isSubmitting;
        },
    },
    methods: {
        onSubmit() {
            //благодоря тому что экшн возвращает промис
            //теперь мы можем работать тут с помощю .then
            this.$store.dispatch('register', {
                email: 'ffff@ffff.com',
                username: 'fffff999000',
                password: '1234',
            })
            //теперь можно делать с юзером что угодно
            //на пример отправить его на свою страничку
            .then(user => console.log(user));
        },
    },
}
</script>

<style>

</style>