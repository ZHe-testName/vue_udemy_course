<template>
    <app-article-form
        :initialValues="initialValues"
        :errors="errors"
        :isSubmitting="isSubmitting"
        @articleSubmit="onSubmit"
    />
</template>

<script>
import AppArticleForm from '@/components/ArticleForm';
import {mapState} from 'vuex';
import {actionTypes} from '@/store/modules/createArticle';

export default {
    name: 'AppCreateArticle',
    data() {
        return {
            initialValues: {
                title: '',
                description: '',
                body: '',
                tagList: [],
            },
        };
    },
    components: {
        AppArticleForm,
    },
    computed: {
        ...mapState({
            errors: state => state.createArticle.validationErrors,
            isSubmitting: state => state.createArticle.isSubmitting,
        }),
    },
    methods: {
        onSubmit(articleInput) {
            this.$store
                .dispatch(actionTypes.createArticle, {articleInput})
                .then(article => {
                    this.$router.push({name: 'article', params: {slug: article.slug}});
                });
        },
    },
}
</script>

<style>

</style>