<template>
  <div class="bg-dark p-2 rounded">
    <img class="img-fluid" :src="collab.album.coverImg" alt="">
    <h4 class="text-center">{{ collab.album.title }}</h4>
    <button class="btn btn-danger" @click="removeCollab"><i class="mdi mdi-delete-forever"></i></button>
  </div>
</template>


<script>
import { collabsService } from '../services/CollaboratorsService.js';
import Pop from '../utils/Pop.js';

export default {
  props: { collab: { type: Object, required: true } },
  setup(props) {
    return {
      async removeCollab() {
        try {
          await collabsService.removeCollab(props.collab.id)
        } catch (error) {
          Pop.error(error)
        }
      }
    }
  }
};
</script>


<style lang="scss" scoped>
</style>
