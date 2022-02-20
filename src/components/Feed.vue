<template>
  <div>
      <div v-if="isLoading">
          Loading ...
      </div>

      <div v-if="errors">
          Some bas is happend
      </div>

      <div v-if="feed">
          <div
            v-for="(article, index) of feed.articles" 
            :key="index"
            class="article-preview"
            >
            <div class="article-meta">
                <router-link :to="{name: 'userProfile', params: {slug: article.author.username}}">
                    <img :src="article.author.image"/>
                </router-link>

                <div class="info">
                    <router-link
                        class="author" 
                        :to="{name: 'userProfile', params: {slug: article.author.username}}"
                        >
                        {{article.author.username}}
                    </router-link>

                    <span class="date">
                        {{article.createdAt}}
                    </span>
                </div>

                <div class="pull-xs-right">
                    ADD TO FAVORITES
                </div>
            </div>

            <router-link
                class="preview-link"
                :to="{name: 'article', params: {slug: article.slug}}"
            >
                <h1>
                    {{article.title}}
                </h1>

                <p>
                    {{article.description}}
                </p>

                <span>
                    Read more...
                </span>
            </router-link>
          </div>
          
          <app-pagination
            :total="total"
            :limit="limit"
            :currentPage="currentPage"
            :url="url" />
      </div>
  </div>
</template>

<script>
import {actionTypes} from '@/store/modules/feed';
import {mapState} from 'vuex';
import AppPagination from '@/components/Pagination';

export default {
    name: 'AppFeed',
    data() {
        return {
            total: 503,
            limit: 10,
            currentPage: 5,
            url: '/tags/dragons',
        };
    },
    components: {
        AppPagination
    },
    props: {
        apiUrl: {
            type: String,
            required: true,
        },
    },
    mounted() {
        this.$store.dispatch(actionTypes.getFeed, {apiUrl: this.apiUrl});
    },
    computed: {
        ...mapState({
            isLoading: state => state.feed.isLoading,
            feed: state => state.feed.data,
            errors: state => state.feed.errors,
        }),
    },
}
</script>

<style>

</style>