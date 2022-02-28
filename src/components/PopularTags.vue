<template>
  <div>
      <app-loader v-if="isLoading"/>

      <app-error-message v-if="error"/>

      <div>
          <p>Popular Tags</p>

          <div
            class="sidebar" 
            v-if="tags"
            >
              <router-link
                class="tag-default tag-pill"
                v-for="popularTag in tags"
                :key="popularTag"
                :to="{name: 'tag', params: {slug: popularTag}}"
              >
                {{popularTag}}
              </router-link>
          </div>
      </div>
  </div>
</template>

<script>
import {mapState} from 'vuex';
import {actionTypes} from '@/store/modules/popularTags';
import AppLoader from '@/components/Loader';
import AppErrorMessage from '@/components/ErrorMessage';

export default {
    name: 'AppPopularTags',
    components: {
      AppLoader,
      AppErrorMessage,
    },
    computed: {
        ...mapState({
            isLoading: state => state.popularTags.isLoading,
            error: state => state.popularTags.error,
            tags: state => state.popularTags.data,
        }),
    },
    mounted(){
        this.$store.dispatch(actionTypes.getPopularTags);
    },
}
</script>

<style>

</style>