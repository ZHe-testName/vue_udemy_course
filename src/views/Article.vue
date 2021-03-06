<template>
  <div class="article-page">
      <div class="banner">
          <div 
            class="container"
            v-if="article"
            >
                <h1>
                    {{article.title}}
                </h1>
                <div class="article-meta">
                    <router-link
                        :to="{name: 'userProfile', params: {slug: article.author.username}}"
                    >
                        <img :src="article.author.image"/>
                    </router-link>

                    <div class="info">
                        <router-link
                            :to="{name: 'userProfile', params: {slug: article.author.username}}"
                        >
                            {{article.author.username}}
                        </router-link>

                         <span class="date">
                            {{article.createdAt}}
                        </span>
                    </div>

                    <span v-if="isAuthor">
                        <router-link 
                            class="btn btn-outline-secondary btn-sm"
                            :to="{name: 'editArticle', params: {slug: article.slug}}"
                        >
                            <i class="ion-edit"></i>
                            Edit article
                        </router-link>
                        <button 
                            class="btn btn-outline-danger btn-sm"
                            @click="deleteArticle"
                        >
                            <i class="ion-trash-a"></i>
                            Delete article
                        </button>
                    </span>
                </div>
            </div>
      </div>

      <div class="container-page">
          <app-loader v-if="isLoading" />

          <app-error-message v-if="error" :message="error" />

          <div class="row article-content" v-if="article">
              <div class="col-xs-12">
                  <div>
                      <p>{{article.body}}</p>
                  </div>

                  <app-tag-list :tags="article.tagList" />
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import {actionTypes as articleActionTypes} from '@/store/modules/article';
import {getterTypes as authGetterTypes} from '@/store/modules/auth';
import {mapState, mapGetters} from 'vuex';
import AppLoader from '@/components/Loader';
import AppErrorMessage from '@/components/ErrorMessage';
import AppTagList from '@/components/TagList';

export default {
    name: 'AppArticle',
    components: {
        AppLoader,
        AppErrorMessage,
        AppTagList,
    },
    computed: {
        ...mapState({
            isLoading: state => state.article.isLoading,
            article: state => state.article.data,
            error: state => state.article.error,
        }),
        ...mapGetters({
            currentUser: authGetterTypes.currentUser,
        }),
        isAuthor (){
            //на случай если какогото из объктов пока нет
            //так как операции асинхронны
            if (!this.currentUser || !this.article){
                return false;
            }

            return this.currentUser.username === this.article.author.username;
        },
    },
    mounted() {
        this.$store.dispatch(articleActionTypes.getAricle, {
            slug: this.$route.params.slug,
        });
    },
    methods: {
        deleteArticle (){
            this.$store
                    .dispatch(articleActionTypes.deleteAricle, {
                        slug: this.$route.params.slug,
                    })
                    .then(() => {
                        this.$router.push({name: 'globalFeed'});
                    });
        },
    },
}
</script>

<style>

</style>