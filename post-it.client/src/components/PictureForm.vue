<template>
  <div class="row bg-dark p-3">
    <form action="" @submit.prevent="handleSubmit">
      <div class="mb-3">
        <label for="" class="form-label"></label>
        <input type="url" v-model="editable.imgUrl" class="form-control" name="" id="" aria-describedby="helpId"
          placeholder="">
        <small id="helpId" class="form-text text-muted">Help text</small>
      </div>
      <button class="btn btn-primary">add picture</button>
    </form>

  </div>
</template>


<script>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { picturesService } from '../services/PicturesService.js';
import Pop from '../utils/Pop.js';
export default {
  setup() {
    const editable = ref({})
    const route = useRoute()
    return {
      editable,
      async handleSubmit() {
        try {
          editable.value.albumId = route.params.albumId
          await picturesService.create(editable.value)
          // NOTE next line clears form
          editable.value = {}
          Pop.success('picture added')
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
