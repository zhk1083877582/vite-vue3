<template>
  <v-node v-for="cell in cells"></v-node>
</template>

<script setup>
  const props = defineProps({ cells: Array, columns: Array, headerIndex: Number })

  console.log(props.cells, props.columns, props.headerIndex)
</script>
