<template>
  <button 
  class="btn btn-smal btn-primary"
  :class="{
      'btn-outline-primary': !isFavoritedOptimistic,
      'btn-primary': isFavoritedOptimistic,
      }"
  @click="handleLike">
      <i class="ion-heart"></i>

      <span>&nbsp;   {{favoriteCountOptimistic}}</span>
  </button>
</template>

<script>
import {actionTypes} from '@/store/modules/addToFavorites';

export default {
    name: 'AppAddToFavorite',
    data() {
        return {
            isFavoritedOptimistic: this.isFavorited,
            favoriteCountOptimistic: this.favoriteCount,
        };
    },
    props: {
       isFavorited: {
           type: Boolean,
           required: true,
           default: false,
       }, 
       favoriteCount: {
           type: Number,
       },
       articleSlug: {
           type: String,
           required: true,
           default: '',
       },
    },
    methods: {
        handleLike() {
            this.$store.dispatch(actionTypes.addTofavorites, {
                slug: this.articleSlug, 
                isFavorited: this.isFavoritedOptimistic
                })
            if(this.isFavoritedOptimistic) {
                this.favoriteCountOptimistic -= 1; 
            }else {
               this.favoriteCountOptimistic += 1;  
            }
        },
    },
}
</script>

<style>

</style>