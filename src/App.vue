<template>
  <div>
    <app-header/>

    <router-view />
  </div>
</template>

<script>
import AppHeader from '@/components/Header';
import {actionTypes} from '@/store/modules/auth';

export default {
  name: 'App',
  components: {
    AppHeader,
  },
  mounted() {
    console.log('hello from app');
    this.$store.dispatch(actionTypes.getCurrentUser);
  },
}
</script>