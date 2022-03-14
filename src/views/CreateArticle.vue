<template>
  <div>
      Create Article
      <app-article-form
        :initialValues="initialValues"
        :errors="errors"
        :isSubmitting="isSubmitting"
        @articleSubmit="onSubmit"
      />
  </div>
</template>

<script>
import AppArticleForm from '@/components/ArticleForm';

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
            errors: null,
            isSubmitting: false,
        };
    },
    components: {
        AppArticleForm,
    },
    methods: {
        onSubmit(data) {
            console.log('form submit data', data);
        },
    },
}
</script>

<style>

</style>