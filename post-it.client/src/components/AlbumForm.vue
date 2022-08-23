<template>
  <!-- Button trigger modal -->


  <!-- Modal -->
  <div class="modal fade" id="create-album" tabindex="-1" role="dialog" aria-labelledby="modelTitleId"
    aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">

        <div class="modal-body">
          <form @submit.prevent="handleSubmit" class="row bg-white p-4 elevation-2">
            <div class="col-12">Create album</div>
            <div class="col-6">
              <label for="" class="form-label">Title</label>
              <input type="text" v-model="editable.title" class="form-control" name="title" id="title">
            </div>
            <div class="col-6">
              <label for="" class="form-label">Cover Image</label>
              <input type="url" v-model="editable.coverImg" class="form-control" name="title" id="title"
                aria-describedby="helpId" placeholder="">
            </div>
            <div class="col-6">
              <label for="" class="form-label ">Category</label>
              <select v-model="editable.category" name="" id="" class="form-control">
                <option value="animals">Animals</option>
                <option value="games">Games</option>
                <option value="food">Food</option>
                <option value="nature">Nature</option>
                <option value="misc">Misc</option>
              </select>
            </div>
            <button class="col-6 btn btn-success">Submit</button>
          </form>
        </div>

      </div>
    </div>
  </div>




</template>


<script>
import { ref } from 'vue';
import { albumsService } from '../services/AlbumsService.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';

export default {
  setup() {
    const editable = ref({})
    return {
      editable,
      async handleSubmit() {
        try {
          logger.log('creating album', editable.value)
          await albumsService.createAlbum(editable.value)
          Pop.toast('Album Created!')
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
