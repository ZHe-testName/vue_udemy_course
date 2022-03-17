<template>
    <div>
        <app-loader v-if="isLoading"/>

        <app-article-form
            v-if="initialValues"
            :initialValues="initialValues"
            :errors="errors"
            :isSubmitting="isSubmitting"
            @articleSubmit="onSubmit"
        />
    </div>
</template>

<script>
import AppArticleForm from '@/components/ArticleForm';
import {mapState} from 'vuex';
import {actionTypes} from '@/store/modules/editArticle';
import AppLoader from '@/components/Loader';

export default {
    name: 'AppEditArticle',
    components: {
        AppArticleForm,
        AppLoader,
    },
    computed: {
        ...mapState({
            errors: state => state.editArticle.validationErrors,
            isSubmitting: state => state.editArticle.isSubmitting,
            isLoading: state => state.editArticle.isLoading,
            article: state => state.editArticle.article,
        }),
        initialValues() {
            if (!this.article){
                return null;
            }

            return {
                title: this.article.title,
                description: this.article.description,
                body: this.article.body,
                tagList: this.article.tagList,
            };
        },
    },
    mounted() {
        this.$store.dispatch(actionTypes.getArticle, {
            slug: this.$route.params.slug,
        });
    },
    methods: {
        onSubmit(articleInput) {
            const slug = this.$route.params.slug;
            
            this.$store
                .dispatch(actionTypes.updateArticle, {slug, articleInput})
                .then(article => {
                    this.$router.push({name: 'article', params: {slug: article.slug}});
                });
        },
    },
}
</script>

<style>

</style>