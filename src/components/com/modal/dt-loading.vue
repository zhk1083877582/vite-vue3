<template>
  <div class="loading" v-if="loading">
    <Spin fix>
      <Icon type="ios-loading" size=20 class="dt-loading ivu-anim-loop"></Icon>
      <div>Loading</div>
    </Spin>
  </div>
</template>

<script setup>
  const props = defineProps({
    loading: Boolean,
  })
</script>

<style lang="scss" scoped>
  .loading {
    position: fixed;
    left: 200px;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 9999;
  }

  .ivu-spin.ivu-spin-fix {
    background-color: rgba(255, 255, 255, 0.7);
  }
</style>