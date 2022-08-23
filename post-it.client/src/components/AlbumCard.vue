<template>
  <router-link :to="{ name: 'AlbumDetails', params: { albumId: album.id } }">
    <div class="bg-light border elevation-2 rounded selectable">
      <div class="p-1">
        <img class="img-fluid" :src="album.coverImg" alt="">
        <h3 class="text-dark">{{ album.title }}</h3>
        <h6>{{ album.creator.name }}</h6>
      </div>
    </div>
  </router-link>
</template>


<script>
import { router } from '../router.js';
export default {
  props: { album: { type: Object, required: true } },
  setup(props) {
    return {
      goTo() {
        router.push({ name: 'AlbumDetails', params: { albumId: props.album.id } })
      }
    }
  }
};
</script>


<style lang="scss" scoped>
</style>
