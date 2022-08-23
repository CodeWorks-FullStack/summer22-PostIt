<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        <h2>Collab Albums</h2>
      </div>
      <div v-for="c in collabAlbums" :key="c.id" class="col-3">
        <CollabAlbum :collab="c" />
      </div>
    </div>
    <div class="row bg-dark py-1 px-5 text-light">
      <div class="col-12">
        <h2>Popular Albums</h2>
      </div>
      <div class="col-12">
        filter <i class="mdi mdi-filter"></i>
      </div>
      <div class="col-2 btn btn-outline-light rounded-pill" @click="filterTerm = ''">All</div>
      <div class="col-2 btn btn-outline-light rounded-pill" @click="filterTerm = 'animals'">Animals</div>
      <div class="col-2 btn btn-outline-light rounded-pill" @click="filterTerm = 'food'">Food</div>
      <div class="col-2 btn btn-outline-light rounded-pill" @click="filterTerm = 'games'">Games</div>
      <div class="col-2 btn btn-outline-light rounded-pill" @click="filterTerm = 'nature'">Nature</div>
      <div class="col-2 btn btn-outline-light rounded-pill" @click="filterTerm = 'misc'">Misc</div>
    </div>
    <div class="masonry bg-dark">
      <div class="" v-for="a in albums" :key="a.id">
        <AlbumCard :album="a" />
      </div>
    </div>
  </div>

</template>

<script>
import { computed, onMounted, ref } from 'vue';
import { AppState } from '../AppState.js';
import AlbumCard from '../components/AlbumCard.vue';
import CollabAlbum from '../components/CollabAlbum.vue';
import { albumsService } from '../services/AlbumsService.js';
import { collabsService } from '../services/CollaboratorsService.js';
import Pop from '../utils/Pop.js';

export default {
  name: "Home",
  setup() {
    const filterTerm = ref('')
    async function getAlbums() {
      try {
        await albumsService.getAll();
      }
      catch (error) {
        Pop.error(error);
      }
    }
    async function getCollabAlbums() {
      try {
        await collabsService.getCollabAlbumsByAccount()
      } catch (error) {
        Pop.error(error)
      }
    }
    onMounted(() => {
      getAlbums();
      getCollabAlbums()
    });
    return {
      filterTerm,
      albums: computed(() => AppState.albums.filter(a => filterTerm.value ? a.category == filterTerm.value : true)),
      collabAlbums: computed(() => AppState.collaboratorAlbums)
    };
  },
  components: { AlbumCard, CollabAlbum }
}

</script>

<style scoped lang="scss">
.masonry {
  columns: 200px;
  column-gap: 1em;

  div {
    display: block;
    margin-bottom: 1em;
  }
}
</style>
