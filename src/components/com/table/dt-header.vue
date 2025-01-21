<template>
  <div>
    <div style="display: flex;">
      <div class="title">
        {{title}}
      </div>
      <slot name="title"></slot>
    </div>
    
    <div class="total flex">
      <div class="info">
        <dt-info :line-number='lineNumber' :label-width="labelWidth" ref='info'></dt-info>
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      labelWidth: Number,
      title: String,
      lineNumber: Number
    },
    methods: {
      init(Opt, info) {
        this.$refs.info.init(Opt, info)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .title {
    margin-bottom: 10px;
    font-size: 18px;
    font-weight: bold;
  }
  
  .total {
    justify-content: space-between;
    margin-bottom: 15px;
    .info {
      width: 70%;
    }
  }
</style>
