<template>
  <div class="feed-toggle">
      <ul class="nav nav-pills nav-active">
          <li class="nav-item">
              <router-link 
                v-if="isLoggedOn"
                class="nav-link"
                :class="{active: routerName === 'yourFeed'}"
                :to="{name: 'yourFeed'}"
                >
                Your Feed
              </router-link>
          </li>

          <li class="nav-item">
              <router-link 
                class="nav-link"
                :class="{active: routerName === 'globalFeed'}"
                :to="{name: 'globalFeed'}"
                >
                Global Feed
              </router-link>
          </li>

          <li class="nav-item">
              <router-link 
                v-if="tagName"
                class="nav-link"
                :class="{active: routerName === 'tag'}"
                :to="{name: 'tag'}"
                >
                <i class="ion-pound"/>
                {{tagName}}
              </router-link>
          </li>
      </ul>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
import {getterTypes} from '@/store/modules/auth';

export default {
    name: 'AppFeedToggler',
    props: {
        tagName: {
            type: String,
            required: false,
        },
    },
    computed: {
        ...mapGetters({
            isLoggedOn: getterTypes.isLoggedOn,
        }),
        routerName() {
            return this.$route.name;
        },
    },
}
</script>

<style>

</style>