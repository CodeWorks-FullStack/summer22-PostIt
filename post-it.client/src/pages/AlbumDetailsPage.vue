<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <h2>{{ album.title }}</h2>
      </div>
      <div class="col-3">
        <img class="img-fluid" :src="album.coverImg" alt="">
      </div>
      <div class="col-2">
        <!-- SECTION collab button hide if you are already a collaborator -->
        <button v-if="!isCollaborator" class="btn btn-info" @click="collab"><i class="mdi mdi-heart"></i>
          Collab</button>
        <button v-else class="btn btn-danger" @click="removeCollab"><i class="mdi mdi-heart-broken"></i>
          Un-Collab</button>
      </div>
      <div class="col-7">
        <div class="row">
          <!-- COLLAB PROFILE -->
          <div v-for="c in collabProfiles" class="col-2">
            <img class="img-fluid rounded elevation-2" :src="c.profile.picture" :title="c.profile.name">
          </div>
          <!--  -->
        </div>
      </div>
    </div>
    <!-- SECTION pictures -->
    <PictureForm />
    <div class="row">
      <PictureCard :picture="p" v-for="(p, i) in pictures" :key="p.id" />
    </div>


  </div>
</template>


<script>
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { AppState } from '../AppState.js';
import PictureCard from '../components/PictureCard.vue';
import PictureForm from '../components/PictureForm.vue';
import { albumsService } from '../services/AlbumsService.js';
import { collabsService } from '../services/CollaboratorsService.js';
import { picturesService } from '../services/PicturesService.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';

export default {
  setup() {
    const route = useRoute();
    async function getAlbumById() {
      try {
        await albumsService.getById(route.params.albumId);
      }
      catch (error) {
        Pop.error(error);
      }
    }
    async function getPicturesByAlbumId() {
      try {
        await picturesService.getPicturesByAlbumId(route.params.albumId);
      }
      catch (error) {
        Pop.error(error);
      }
    }
    async function getCollabProfiles() {
      try {
        await collabsService.getCollabProfilesByAlbum(route.params.albumId)
      } catch (error) {
        Pop.error(error)
      }
    }
    onMounted(() => {
      getAlbumById();
      getPicturesByAlbumId();
      getCollabProfiles()
    });
    return {
      album: computed(() => AppState.activeAlbum),
      pictures: computed(() => AppState.pictures),
      collabProfiles: computed(() => AppState.collaboratorProfiles),
      isCollaborator: computed(() => {
        if (AppState.collaboratorProfiles.find(c => c.accountId == AppState.account.id)) {
          return true
        }
        return false
      }),
      async collab() {
        try {

          let newCollab = {
            albumId: AppState.activeAlbum.id,
            // NOTE don't actually need accountId here cause our server assigns it but it doesn't hurt
            accountId: AppState.account.id
          }
          logger.log('collabing', newCollab)
          await collabsService.create(newCollab)
        } catch (error) {
          Pop.error(error)
        }
      },
      // NOTE first way to delete collab
      async removeCollab() {
        try {
          let collabToRemove = AppState.collaboratorProfiles.find(c => c.accountId == AppState.account.id)
          await collabsService.removeCollab(collabToRemove.id)
        } catch (error) {
          Pop.error(error)
        }
      }
    };
  },
  components: { PictureCard, PictureForm }
};
</script>


<style lang="scss" scoped>
</style>
