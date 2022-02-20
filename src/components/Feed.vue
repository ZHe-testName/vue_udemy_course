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
            :total="feed.articlesCount"
            :limit="limit"
            :currentPage="currentPage"
            :url="baseUrl" />
      </div>
  </div>
</template>

<script>
import {actionTypes} from '@/store/modules/feed';
import {mapState} from 'vuex';
import AppPagination from '@/components/Pagination';
import {limit} from '@/helpers/vars';
import {stringify, parseUrl} from 'query-string';

export default {
    name: 'AppFeed',
    data() {
        return {
            limit,
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
        this.changeFeed();
    },
    computed: {
        ...mapState({
            isLoading: state => state.feed.isLoading,
            feed: state => state.feed.data,
            errors: state => state.feed.errors,
        }),
        currentPage() {
            return +this.$route.query.page || 1;
        },
        baseUrl() {
            return this.$route.path;
        },
        offset() {
            return this.currentPage * limit - limit;
        },
    },
    //watch отличается от computed тем что в последнем мы не 
    //мутируем ничего, это заприщено
    //мы просто вичисляем переменную или значение
    //а вот watch это все колбеки и импреативный подход
    //его следует избегать
    watch: {
        currentPage() {
            this.changeFeed();
        },
    },
    methods: {
        changeFeed() {
            const parsedUrl = parseUrl(this.apiUrl);

            const stringifiedParams = stringify({
                limit,
                offset: this.offset,
                ...parsedUrl.query,
            });
            
            const apiUrlWithParams = `${parsedUrl.url}?${stringifiedParams}`;

            this.$store.dispatch(actionTypes.getFeed, {apiUrl: apiUrlWithParams});
        },
    },
}
</script>

<style>

</style>