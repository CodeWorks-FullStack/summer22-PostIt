<template>
  <div class="col-2">
    <img class="img-fluid" :src="picture.imgUrl" alt="" :title="picture.creator.name">
  </div>
</template>


<script>
export default {
  props: { picture: { type: Object, required: true } },
  setup() {
    return {}
  }
};
</script>


<style lang="scss" scoped>
</style>
