<script setup>
import router from '@/router'
import { extractPath } from '@/router/utils'
const props = defineProps({
  item: Object
})

const handelclick = (name) => {
  if (name) router.push(name)
}
</script>

<template>
  <el-sub-menu v-if="item.child?.length" :index="item.cOpCnm" popper-class="my-menu-popper">
    <template #title>
      <el-icon v-show="item.cOpImg" :class="[item.cOpImg, 'iconfont', 'menu-icon']"></el-icon>
      <span>{{ item.cOpCnm }}</span>
    </template>
    <el-menu-sub v-for="i in item.child" :key="i.name" :item="i" />
  </el-sub-menu>
  <el-menu-item v-else :index="extractPath(item.cOpAct)" @click="handelclick(extractPath(item.cOpAct))">
    <span :class="[item.cOpImg, 'iconfont', 'menu-icon']"></span>
    <span>{{ item.cOpCnm }}</span>
  </el-menu-item>
</template>

<style scoped lang="scss">
@import url('@/assets/css/sider.scss');
</style>
<style lang="scss">
.my-menu-popper {
  // overflow-y: auto;
  // max-height: 80vh;
}
</style>
